import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { CartContext } from '../contexts/Cart';
import { _changeFormatToVND } from '../utils/Number';
import { Container, Header, Title, Body } from "native-base";
import CartListItem from '../Components/CartListItem';
import { ColorHeader, ColorBg } from '../key';
import { _handleGetFromStorage } from '../utils/Storage';
import EmptyCart from '../images/emptyCart.png';
export default class CartScreen extends Component {

    _handleOrder = async () => {
        const token = await _handleGetFromStorage('token');
        if (token) {
            this.props.navigation.navigate('OrderConfirmation');
        } else {
            this.showAlert();
        }
    }

    showAlert = () => {
        const { navigation } = this.props;
        Alert.alert(
            `TiTi Store says:`,
            'You must login to order products',
            [
                { text: 'OK', onPress: () => navigation.navigate('Login') },
            ]
        )
    }

    render() {
        return (
            <Container style={{ backgroundColor: ColorBg }}>
                <CartContext.Consumer>
                    {
                        ({ cartItems, countIncrease, removeFromCart, deleteFromCart, sum }) => (

                            <>
                                <Header style={{ backgroundColor: ColorHeader }} androidStatusBarColor='#000' transparent>
                                    <Body>
                                        <Title style={{ fontSize: 26, color: '#D90368', fontWeight: '700', alignSelf: 'center' }}>Cart</Title>
                                    </Body>
                                </Header>
                                {
                                    cartItems.length < 1 ?
                                        <ImageBackground resizeMode='contain' style={{ flex: 1 }} source={EmptyCart} /> :
                                        <>
                                            <FlatList
                                                data={cartItems}
                                                renderItem={({ item }) =>
                                                    <CartListItem
                                                        item={item}
                                                        countIncrease={countIncrease}
                                                        removeFromCart={removeFromCart}
                                                        deleteFromCart={deleteFromCart}
                                                    />
                                                }
                                                keyExtractor={(item) => `${item._id}`}
                                                contentContainerStyle={styles.container}
                                            />
                                            <View style={styles.footer}>
                                                <Text style={styles.total}>{_changeFormatToVND(sum)}</Text>
                                                <TouchableOpacity onPress={this._handleOrder} style={styles.btn}>
                                                    <Text style={styles.text_btn}>Order</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </>
                                }
                            </>
                        )
                    }
                </CartContext.Consumer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container_indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    horizontal: {
        padding: 10
    },
    container: {
        paddingTop: 16,
        paddingHorizontal: 12
    },
    btn: {
        width: `40%`,
        alignSelf: 'center',
        //marginTop: 15,
        borderRadius: 50,
        backgroundColor: '#DB3362',
        paddingVertical: 10
    },
    text_btn: {
        color: '#000',
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF',
        textAlign: 'center',
        letterSpacing: 2
    },
    footer: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#FFF'
    },
    total: {
        letterSpacing: 2,
        fontWeight: '700',
        color: '#999',
        fontSize: 18
    }
})