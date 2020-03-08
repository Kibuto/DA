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
                    
                    {/* <View style={{ position: 'absolute', height: `20%`, width: `24%`, backgroundColor: '#000', left: `40%`, top: `9%`, zIndex: 2, opacity: .2, borderRadius: 10 }} /> */}
                    {/* <View style={styles.component} > */}
                        <Image resizeMode='contain' source={{ uri: item.images[0].url }} style={styles.img}/>
                        <View style={styles.content}>
                            <Text style={styles.author}>{item.author}</Text>
                            <Text numberOfLines={3} ellipsizeMode='tail' style={styles.name}>{item.name}</Text>
                            <Text numberOfLines={6} ellipsizeMode='tail' style={styles.description}>{item.description}</Text>
                            <Text style={styles.price}>{_changeFormatToVND(item.price)}</Text>
                            <TouchableOpacity onPress={() => addToCart(item)} style={styles.btn}>
                                <Text style={styles.text_btn}>Add to cart</Text>
                            </TouchableOpacity>
                        </View>
                    {/* </View> */}
                </ScrollView>
            </WallPaper>
            // <ImageBackground resizeMode="cover" blurRadius={.9} source={{ uri: item.images[0].url }} style={styles.container}>
                // <Image resizeMode='contain' source={{ uri: item.images[0].url }} style={styles.img}/>
                // {/* <View style={{ position: 'absolute', height: `20%`, width: `24%`, backgroundColor: '#000', left: `40%`, top: `9%`, zIndex: 2, opacity: .2, borderRadius: 10 }} /> */}
                // <View style={styles.component} >
                //     <View style={styles.content}>
                //         <Text style={styles.author}>{item.author}</Text>
                //         <Text numberOfLines={3} ellipsizeMode='tail' style={styles.name}>{item.name}</Text>
                //         <Text numberOfLines={6} ellipsizeMode='tail' style={styles.description}>{item.description}</Text>
                //         <Text style={styles.price}>{_changeFormatToVND(item.price)}</Text>
                //         <TouchableOpacity onPress={() => addToCart(item)} style={styles.btn}>
                //             <Text style={styles.text_btn}>Add to cart</Text>
                //         </TouchableOpacity>
                //     </View>
                // </View>
            // </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10
    },
    img: {
        height: 150,
        zIndex: 3,
        transform: [{ translateY: 50 }],
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