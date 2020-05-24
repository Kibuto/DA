import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Container, Header, Content } from "native-base";
import { ColorBg, ColorHeader, HOST } from '../key';
import { _changeFormatToVND } from '../utils/Number';
import { CartContext } from '../contexts/Cart';
import HomeListItem from '../Components/HomeListItem';
export default class OrderConfirmation extends PureComponent {
    render() {
        return (
            <Container style={{ backgroundColor: ColorBg }}>
                <Header style={{ backgroundColor: ColorHeader }} androidStatusBarColor='#000' transparent />
                <Content style={{ marginVertical: 10, fontSize: 18, fontStyle: 'italic', fontWeight: '700', letterSpacing: 1 }}>
                    <Text style={styles.title}>Order Confirmation</Text>
                    <Text style={styles.thank}>Thank you for shopping with us</Text>
                    <CartContext.Consumer>
                        {
                            ({ cartItems, sum, amount, deleteFromCart, clearCart }) => (
                                <View>
                                    <View style={styles.container}>
                                        <Text style={styles.details}>Price Details</Text>
                                        <FlatList
                                            data={cartItems}
                                            renderItem={({ item, index }) =>
                                                <HomeListItem
                                                    onPress={() => navigation.navigate('Detail', { product: item })}
                                                    index={index}
                                                    length={cartItems.length - 1}
                                                    category={false}
                                                    order={true}
                                                    product={item}
                                                    deleteFromCart={deleteFromCart}
                                                />
                                            }
                                            horizontal={true}
                                            keyExtractor={(item) => `${item._id}`}
                                            contentContainerStyle={{ paddingTop: 20 }}
                                            showsHorizontalScrollIndicator={false}
                                        />
                                        {/* <View style={[styles.Wrapper_tax, { marginTop: 10 }]}>
                                            <Text style={styles.key}>Order No.</Text>
                                            <Text style={styles.key}>#1234</Text>
                                        </View> */}
                                        <View style={styles.Wrapper_tax}>
                                            <Text style={styles.key}>Product:</Text>
                                            <Text style={styles.key}>{_changeFormatToVND(sum)}</Text>
                                        </View>
                                        <View style={styles.Wrapper_tax}>
                                            <Text style={styles.key}>Estimated Tax:</Text>
                                            <Text style={styles.key}>{`0 VND`}</Text>
                                        </View>
                                        <View style={[styles.Wrapper_tax, { borderStyle: 'solid', borderBottomWidth: 1, paddingBottom: 20 }]}>
                                            <Text style={styles.key}>Shipping Charges:</Text>
                                            <Text style={styles.key}>{`0 VND`}</Text>
                                        </View>
                                        <View style={styles.Wrapper_tax}>
                                            <Text style={styles.key}>Order Total:</Text>
                                            <Text style={styles.key}>{_changeFormatToVND(sum)}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('ConfirmInfo', { cartItems, amount, sum, fnc: clearCart })}
                                        activeOpacity={.6}
                                        style={styles.btn}
                                    >
                                        <Text style={styles.btn_text}>Confirm info</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    </CartContext.Consumer>

                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        width: '90%',
        alignSelf: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: .9,
        shadowRadius: 10,
        elevation: 3,
        marginVertical: 10,
        borderRadius: 10
    },
    title: {
        marginVertical: 5,
        marginLeft: '5%',
        fontSize: 26,
        fontStyle: 'italic',
        fontWeight: '700',
        letterSpacing: 1,
        color: '#D90368',
        textTransform: 'capitalize'
    },
    thank: {
        marginBottom: 5,
        marginLeft: '15%',
        fontSize: 18,
        fontStyle: 'italic',
        letterSpacing: 1,
        textTransform: 'capitalize'
    },
    details: {
        fontSize: 20,
        fontWeight: '700',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    key: {
        fontSize: 18,
        fontStyle: 'italic'
    },
    Wrapper_tax: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 7
    },
    btn: {
        width: '80%',
        backgroundColor: '#D90368',
        alignSelf: 'center',
        paddingVertical: 15,
        borderRadius: 999,
        marginVertical: 10
    },
    btn_text: {
        textAlign: 'center',
        color: 'white',
        textTransform: 'capitalize',
        fontSize: 20,
        fontWeight: 'bold'
    }
})