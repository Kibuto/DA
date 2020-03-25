import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ProductListItem from '../Components/ProductListItem';
export default class Notifications extends Component {

    render() {
        const { products, fnc } = this.props.route.params;
        return (
            <FlatList
                data={products}
                renderItem={({ item }) => 
                    <View style={styles.wrapper}>
                        <ProductListItem fnc={fnc} notification={true} product={item} />
                    </View>
                }
                keyExtractor={(item) => `${item._id}`}
                contentContainerStyle={styles.container}
            />
        )
    }
}

const styles = StyleSheet.create({
    container_indicator: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    container: {
        paddingHorizontal: 10,
        paddingTop: 30,
    },
    wrapper: {
    }
})