import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { HOST } from '../key';
export default class CheckProduct extends Component {
    render() {
        const { product, isAdmin, onPress, index, navigation, delProduct } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.wrapper_left}>
                    <Image
                        resizeMode='contain'
                        source={{ uri: `${HOST}${product.images[0].url}` }}
                        style={{ height: 150, width: 120 }}
                    />
                </View>
                <View style={styles.wrapper_right}>
                    <View style={styles.Wrapper_tax}>
                        <Text style={styles.key}>Order No.</Text>
                        <Text style={[styles.key, { marginRight: 10 }]}>#{product._id.slice(0, 7).toUpperCase()}</Text>
                    </View>
                    <View style={styles.Wrapper_tax}>
                        <Text style={styles.key}>Seller:</Text>
                        <Text style={[styles.key, { marginRight: 10 }]}>{product.seller}</Text>
                    </View>
                    <View style={styles.Wrapper_tax}>
                        <Text style={styles.key}>Order Date:</Text>
                        <Text style={[styles.key, { marginRight: 10 }]}>{product.date.split('T')[0]}</Text>
                    </View>
                    <View style={styles.Wrapper_tax}>
                        <Text style={styles.key}>Status:</Text>
                        <Text style={[styles.key, { marginRight: 10 }]}>{product.isCheck ? product.isDeleted ? 'Refused' : 'Checked' : 'Pending'}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('CreateDetails', { product, isAdmin, index, fncCheckProduct: onPress, fncDelProduct: delProduct })}
                        activeOpacity={.6}
                        style={styles.btn}
                    >
                        <Text style={styles.btn_text}>Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: .9,
        shadowRadius: 10,
        paddingTop: 20,
        paddingBottom: 10,
        marginBottom: 15,
        elevation: 3,
        borderRadius: 10,
        flexDirection: "row"
    },
    wrapper_left: {
        flex: 1 / 3,
        padding: 10,
        borderRadius: 10,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: .9,
        shadowRadius: 10,
        elevation: 3,
        height: 170,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Wrapper_tax: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    wrapper_right: {
        flex: 2 / 3,
        marginLeft: 10
    },
    key: {
        fontSize: 18,
        fontStyle: 'italic'
    },
    btn: {
        width: '80%',
        backgroundColor: '#D90368',
        alignSelf: 'center',
        paddingVertical: 10,
        borderRadius: 999,
        marginVertical: 10,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: .9,
        shadowRadius: 10,
        elevation: 3,
    },
    btn_text: {
        textAlign: 'center',
        color: 'white',
        textTransform: 'capitalize',
        fontSize: 18,
        fontWeight: 'bold'
    }
})