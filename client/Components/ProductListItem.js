import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AirbnbRating } from 'react-native-elements';

export default class OrderScreen extends Component {
    render() {
        const { product, onSwitchScreen, notification, } = this.props;
        return (
            <TouchableOpacity onPress={onSwitchScreen} style={styles.container} activeOpacity={0.9}>
                <View style={styles.content_left}>
                    <Image resizeMode='stretch' style={styles.productImg} source={{ uri: product.images[0].url }} />
                    {/* <View style={styles.boxShadow} /> */}
                </View>
                <View style={styles.content_right}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.name}>{product.name}</Text>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={{ marginBottom: 3 }}>by <Text style={styles.author}>{product.author}</Text></Text>
                    <Text style={styles.description} numberOfLines={3} ellipsizeMode='tail'>{product.description}</Text>
                    <Text style={{ alignSelf: 'flex-end', color: '#666', marginBottom: 3 }}>Seller <Text style={styles.seller}>{product.seller}</Text></Text>
                    <View style={styles.star}>
                        <AirbnbRating
                            count={5}
                            defaultRating={4}
                            size={20}
                            showRating={false}
                        />
                        <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: '700' }}>4</Text>
                    </View>
                    {
                        notification ? product.isDeleted ?
                            <Text style={{ color: 'red', textAlign: 'right', fontStyle: 'italic' }}>Refused</Text> :
                            <Text style={{ color: 'red', textAlign: 'right', fontStyle: 'italic' }}>Checked</Text> : null
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
        zIndex: 999,
        transform: [{ scaleY: 1.2 }],
        borderWidth: 1,
        borderColor: '#DDD'
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
        marginBottom: 30,
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