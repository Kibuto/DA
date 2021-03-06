import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { CartContext } from '../contexts/Cart';
import DetailItem from '../Components/DetailItem';
export default class DetailScreen extends Component {

    static navigationOptions = {
        headerTitleAlign: {
            textAlign: 'center'
        }
    };

    state = {
        product: {},
        err: 'Error'
    }

    render() {
        const { product } = this.props.route.params;
        return (
            <View style={styles.container}>
                <CartContext.Consumer>
                    {
                        ({ addToCart }) => (
                            <DetailItem addToCart={addToCart} item={product} />
                        )
                    }
                </CartContext.Consumer>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    container_indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
})