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
                    {/* <View style={styles.boxShadow} /> */}
                </View>
                <View style={styles.content_right}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.name}>{product.name}</Text>
                    <Text style={{ marginBottom: 3 }}>by <Text style={styles.author}>{product.author}</Text></Text>
                    <Text style={styles.description} numberOfLines={1} ellipsizeMode='tail'>{product.description}</Text>
                    <Text style={{alignSelf: 'flex-end', color: '#666', marginBottom: 3}}>Seller <Text style={{ fontWeight: '700', fontSize: 18, fontStyle: 'italic', color: '#666', textTransform: 'capitalize'}}>{product.seller}</Text></Text>
                    {
                        isAdmin ? 
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                            <TouchableOpacity onPress={() => onPress(product._id, index)} style={[styles.btn_admin, { backgroundColor: '#42b72a' }]}>
                                <Text style={styles.text_btn}>Censor</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btn_admin, { backgroundColor: '#e82b2b' }]}>
                                <Text style={styles.text_btn}>Delete</Text>
                            </TouchableOpacity>
                        </View> :
                        <Button block rounded disabled success={product.isCheck}>
                            <Text style={styles.text_btn}>{ product.isCheck ? 'Checked' : 'Pending Censorship' }</Text>
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
        backgroundColor: '#D9DFE3', 
        paddingVertical: 15, 
        borderRadius: 10, 
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#DDD'
    },
    productImg: {
        height: 180,
        borderRadius: 10,
        zIndex: 999
    },
    header: {
        fontSize: 24, 
        fontWeight: '700', 
        marginBottom: 5
    },
    content_left: {
        flex: 2/5, 
        position: 'relative', 
        justifyContent:'center'
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
        flex: 3/5, 
        paddingVertical: 15, 
        marginLeft: 15
    },
    name: {
        fontWeight:'700', 
        fontSize: 24,
        marginBottom: 3,
        color: '#D90368'
    },
    author: {
        color: '#888', 
        fontSize: 15
    },
    description: {
        letterSpacing: 1, 
        fontSize: 16, 
        marginBottom: 3
    },
    star: {
        flexDirection: 'row', 
        marginBottom: 5, 
        alignItems: 'center'
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