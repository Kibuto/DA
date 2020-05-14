import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AirbnbRating } from 'react-native-elements';
export default class Home extends Component {
    render() {
        const { product, category, index, length, onPress } = this.props;
        return (
            <>
                {
                    category ?
                        <TouchableOpacity style={styles.container} activeOpacity={0.9} onPress={onPress}>
                            <View style={styles.content_left}>
                                <Image resizeMode='stretch' style={styles.productImg_true} source={{ uri: product.images[0].url }} />
                                {/* <View style={styles.boxShadow} /> */}
                            </View>
                            <View style={styles.content_right}>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.name}>{product.name}</Text>
                                {/* <Text numberOfLines={1} ellipsizeMode='tail' style={{ marginBottom: 3}}>by <Text style={styles.author_true}>{product.author}</Text></Text> */}
                                <Text style={styles.description} numberOfLines={3} ellipsizeMode='tail'>{product.description}</Text>
                                {/* <Text style={{alignSelf: 'flex-end', color: '#666', marginBottom: 3}}>Seller <Text style={styles.seller}>{product.seller}</Text></Text> */}
                                <View style={styles.star}>
                                    <AirbnbRating
                                        count={5}
                                        defaultRating={4}
                                        size={20}
                                        showRating={false}
                                    />
                                    <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: '700' }}>4</Text>
                                </View>
                            </View>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={onPress} style={length === index && { marginRight: 10 }} activeOpacity={0.9}>
                            <Image resizeMode='contain' style={styles.productImg_false} source={{ uri: product.images[0].url }} />
                            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.author_false}>{product.author}</Text>
                        </TouchableOpacity>
                }
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingHorizontal: 10,
        //marginRight: 5,
        //borderWidth: 3,
        borderColor: '#EEE',
        width: 320,
        paddingVertical: 10,
        shadowOpacity: 0.9,
        shadowRadius: 10,
        shadowOffset: {
            height: 0,
            width: 0
        },
        elevation: 5,
        margin: 5
    },
    productImg_true: {
        height: 160,
        borderWidth: 1,
        borderColor: '#DDD'
        //borderRadius: 10,
    },
    productImg_false: {
        height: 160,
        width: 120,
        borderRadius: 10
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 3
    },
    content_left: {
        flex: 2 / 5,
        position: 'relative',
        justifyContent: 'center',
        borderRadius: 10
    },
    boxShadow: {
        backgroundColor: '#000',
        opacity: .5,
        position: 'absolute',
        height: `88%`,
        width: `100%`,
        bottom: 8,
        left: 5,
        borderRadius: 8
    },
    content_right: {
        flex: 3 / 5,
        paddingVertical: 15,
        marginLeft: 15
    },
    name: {
        fontWeight: '700',
        fontSize: 24,
        marginBottom: 3,
        color: '#D90368'
    },
    author_true: {
        color: '#888',
        fontSize: 15
    },
    author_false: {
        marginVertical: 5,
        textAlign: 'center',
        width: 120,
        color: '#888'
    },
    description: {
        letterSpacing: 1,
        fontSize: 16,
        marginBottom: 3
    },
    star: {
        flexDirection: 'row',
        marginBottom: 3,
        alignItems: 'center'
    },
    seller: {
        fontWeight: '700',
        fontSize: 18,
        fontStyle: 'italic',
        color: '#666',
        textTransform: 'capitalize'
    }
})