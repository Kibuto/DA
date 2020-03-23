import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import WallPaper from '../Components/WallPaper';
import { _changeFormatToVND } from '../utils/Number';
import { ScrollView } from 'react-native-gesture-handler';
export default class DetailItem extends Component {

    static navigationOptions = {
        headerTitleAlign: {
            textAlign: 'center'
        }
    };

    render() {
        const { item, addToCart } = this.props;
        return (
            <WallPaper img={item.images[0].url}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={{height: 200}}/>
                    <View style={styles.content}>
                        <Image resizeMode='contain' source={{ uri: item.images[0].url }} style={styles.img}/>
                        <Text style={styles.author}>{item.author}</Text>
                        <Text numberOfLines={3} ellipsizeMode='tail' style={styles.name}>{item.name}</Text>
                        <Text numberOfLines={6} ellipsizeMode='tail' style={styles.description}>{item.description}</Text>
                        <Text style={styles.price}>{_changeFormatToVND(item.price)}</Text>
                        <TouchableOpacity onPress={() => addToCart(item)} style={styles.btn}>
                            <Text style={styles.text_btn}>Add to cart</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </WallPaper>
        )
    }
}

const styles = StyleSheet.create({
    img: {
        height: 150,
        borderRadius: 5
    },
    content: {
        backgroundColor:'#FBF4FC',
        textAlign: 'center',
        paddingVertical: 50,
        paddingHorizontal: 20,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
    },
    author: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 18,
        fontWeight: '700',
        color: '#999'
    },
    name: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 28,
        fontWeight: '700'
    },
    description: {
        textAlign: 'justify',
        marginTop: 15,
        fontSize: 17,
        letterSpacing: 1
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
        backgroundColor: '#D90368',
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