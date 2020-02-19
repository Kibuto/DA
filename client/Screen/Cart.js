import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class CartScreen extends Component {

    static navigationOptions = {
        headerTitleAlign: {
            textAlign: 'center'
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Cart</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})