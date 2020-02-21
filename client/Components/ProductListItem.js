import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';

export default class OrderScreen extends Component {
    render() {
        const { product, onPress } = this.props;
        return (
            <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.6}>
                <View style={styles.component}>
                    <Image resizeMode='contain' style={styles.productImg} source={{ uri: product.images[0].url }} />
                    <View style={styles.content}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.header}>{product.name}</Text>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={{marginBottom: 10}}>{product.description}</Text>
                        <AirbnbRating
                            count={5}
                            defaultRating={4}
                            size={20}
                            showRating={false}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        // borderRadius: 15,
        borderColor: '#FCE6D6',
        borderWidth: 2,
        backgroundColor: '#FCE6D6', // BEDCFE
        marginBottom: 25,
    },
    component: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    content: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'flex-start'
    },
    header: {
        fontSize: 16, 
        fontWeight: '700', 
        marginBottom: 10
    },
    productImg: {
        width: 150,
        height: 150,
        transform: [{ translateY: -20}],
        borderBottomLeftRadius: 15,
        borderTopRightRadius: 15,
        // borderRadius: 15
    }
})