import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { CartContext } from '../contexts/Cart';
import { _changeFormatToVND } from '../utils/Number';
import { Container, Header, Title, Body } from "native-base";
import CartListItem from '../Components/CartListItem';
import { ColorHeader } from '../key';
export default class CartScreen extends Component {

    static navigationOptions = {
        headerTitleAlign: {
            textAlign: 'center'
        }
    };

    render() {
        return (
            <CartContext.Consumer>
                {   
                    ({ cartItems, countIncrease, removeFromCart, sum }) => (
                        cartItems.length < 1 ? 
                        <View style={[styles.container_indicator, styles.horizontal]}>
                            <ActivityIndicator size='large' color="#0000ff"/>
                            <Text style={styles.text}>Thêm đồ vào giỏ hàng đi nào</Text>
                        </View> : 
                        <>
                            <Header style={{backgroundColor: ColorHeader}} androidStatusBarColor='#000' transparent>
                                <Body>
                                    <Title style={{fontSize: 26, color: '#D90368', fontWeight:'700', alignSelf: 'center'}}>Cart</Title>
                                </Body>
                            </Header>
                            <FlatList 
                                data={cartItems}
                                renderItem={({ item }) =>
                                    <CartListItem item={item} countIncrease={countIncrease} removeFromCart={removeFromCart}/>
                                }
                                keyExtractor={(item) => `${item.id}`}
                                contentContainerStyle={styles.container}
                            />
                            <View style={styles.footer}>
                                <Text style={styles.total}>{_changeFormatToVND(sum)}</Text>
                                <TouchableOpacity style={styles.btn}>
                                    <Text style={styles.text_btn}>Order</Text>
                                </TouchableOpacity> 
                            </View>
                            {/* <TouchableOpacity style={styles.btn}>
                                <Text style={styles.text_btn}>Order - <Text style={styles.total}>{_changeFormatToVND(sum)}</Text></Text>
                            </TouchableOpacity> */}
                        </>
                    )
                }
            </CartContext.Consumer>
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
        paddingHorizontal: 8
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
        paddingVertical: 5,
        backgroundColor: '#FFF'
    },
    total: {
        letterSpacing: 2,
        fontWeight: '700',
        color: '#999',
        fontSize: 18
    }
})