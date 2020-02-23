import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { _changeFormatToVND } from '../utils/Number';
export default class DetailItem extends Component {

    static navigationOptions = {
        headerTitleAlign: {
            textAlign: 'center'
        }
    };

    render() {
        const { item, addToCart } = this.props;
        return (
            <ImageBackground resizeMode="cover" blurRadius={.9} source={{ uri: item.images[0].url }} style={styles.container}>
                <Image resizeMode='contain' source={{ uri: item.images[0].url }} style={styles.img}/>
                {/* <View style={{ position: 'absolute', height: `20%`, width: `24%`, backgroundColor: '#000', left: `40%`, top: `9%`, zIndex: 2, opacity: .2, borderRadius: 10 }} /> */}
                <View style={styles.component} >
                    <View style={styles.content}>
                        <Text style={styles.author}>{item.author}</Text>
                        <Text numberOfLines={3} ellipsizeMode='tail' style={styles.name}>{item.name}</Text>
                        <Text numberOfLines={5} ellipsizeMode='tail' style={styles.description}>{item.description}</Text>
                        <Text style={styles.price}>{_changeFormatToVND(item.price)}</Text>
                        <TouchableOpacity onPress={() => addToCart(item)} style={styles.btn}>
                            <Text style={styles.text_btn}>Add to cart</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        position: 'relative',
        paddingHorizontal: 10
    },
    img: {
        height: '25%',
        width: `100%`,
        zIndex: 3,
        transform: [{ translateY: 60 }],
        borderRadius: 5
    },
    component: {
        backgroundColor:'#FFF',
        height: '100%',
        borderRadius: 30
    },
    content: {
        textAlign: 'center',
        marginVertical: 15,
        paddingHorizontal: 12,
        transform: [{ translateY: 60 }]
    },
    author: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 17,
        fontWeight: '700',
        color: '#999'
    },
    name: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 26,
        fontWeight: '700'
    },
    description: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 16,
        letterSpacing: 2
    },
    price: {
        fontSize: 18,
        color: '#AAA',
        fontWeight: '700',
        letterSpacing: 2,
        textAlign: 'center',
        marginTop: 15
    },
    btn: {
        width: `90%`,
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 10,
        backgroundColor: '#DB3362',
        paddingVertical: 12
    },
    text_btn: {
        color: '#000',
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF',
        textAlign: 'center',
        letterSpacing: 2
    }
})