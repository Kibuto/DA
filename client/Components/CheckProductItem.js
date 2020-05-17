import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Button } from "native-base";
export default class CheckProduct extends Component {
    render() {
        const { product, isAdmin, onPress, index } = this.props;
        return (
            <TouchableOpacity style={styles.container} activeOpacity={0.9}>
                <View style={styles.content_left}>
                    <Image resizeMode='stretch' style={styles.productImg} source={{ uri: product.images[0].url }} />
                </View>
                <View style={styles.content_right}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.name}>{product.name}</Text>
                    <Text style={{ marginBottom: 3 }}>by <Text style={styles.author}>{product.author}</Text></Text>
                    <Text style={styles.description} numberOfLines={1} ellipsizeMode='tail'>{product.description}</Text>
                    <Text style={{ alignSelf: 'flex-end', color: '#666', marginBottom: 7 }}>Seller <Text style={{ fontWeight: '700', fontSize: 18, fontStyle: 'italic', color: '#666', textTransform: 'capitalize' }}>{product.seller}</Text></Text>
                    {
                        isAdmin ?
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                <TouchableOpacity onPress={() => onPress(product._id, index, true)} style={[styles.btn_admin, { backgroundColor: '#42b72a' }]}>
                                    <Text style={styles.text_btn}>Accept</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => onPress(product._id, index, false)} style={[styles.btn_admin, { backgroundColor: '#e82b2b' }]}>
                                    <Text style={styles.text_btn}>Refuse</Text>
                                </TouchableOpacity>
                            </View> :
                            <Button block rounded disabled danger={product.isDeleted ? true : false} success={product.isCheck ? product.isDeleted ? false : true : false}>
                                <Text style={styles.text_btn}>{product.isCheck ? product.isDeleted ? "Refused" : "Checked" : "Pending..."}</Text>
                            </Button>
                    }
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 30,
        backgroundColor: '#FFF',
        paddingVertical: 0,
        borderRadius: 10,
        paddingHorizontal: 10,
        borderWidth: 3,
        borderColor: '#EEE'
    },
    productImg: {
        height: 180,
        transform: [{ scaleY: 1.2 }],
        borderWidth: 1,
        borderColor: '#DDD'
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 7
    },
    content_left: {
        flex: 2 / 5,
        position: 'relative',
        justifyContent: 'center',
        marginBottom: 30,
        borderRadius: 10
    },
    boxShadow: {
        backgroundColor: '#000',
        opacity: .5,
        position: 'absolute',
        height: `100%`,
        width: `100%`,
        bottom: -4,
        left: 6,
        borderRadius: 5
    },
    content_right: {
        flex: 3 / 5,
        paddingVertical: 15,
        marginLeft: 15
    },
    name: {
        fontWeight: '700',
        fontSize: 24,
        marginBottom: 7,
        color: '#D90368'
    },
    author: {
        color: '#888',
        fontSize: 15
    },
    description: {
        letterSpacing: 1,
        fontSize: 16,
        marginBottom: 7
    },
    btn_admin: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5
    },
    text_btn: {
        color: '#FFF',
        fontSize: 16
    }
})