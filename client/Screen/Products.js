import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import ProductListItem from '../Components/ProductListItem';
import { HOST } from '../key';
export default class ProductScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('categoryProduct').name,
            headerTitleAlign: {
                textAlign: 'center'
            }
        }
    };

    state = {
        products: []
    }

    componentDidMount() {
        this._handleCallApi();
    }

    _handleCallApi = () => {
        const { navigation } = this.props;
        const id = navigation.getParam('categoryProduct').id;
        console.log(id);
        fetch(`${HOST}/api/products?category=${id}`)
            .then(res => res.json())
            .then(json => {
                if(json.success) {
                    this.setState({
                        products: json.message
                    })
                }
                else {
                    console.log('Ko lay duoc products');
                }
        });
    }

    render() {
        const { products } = this.state;
        const { navigation } = this.props;
        return (
            <>{
                products.length < 1 ? 
                <View style={[styles.container_indicator, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View> :
                <FlatList
                    data={products}
                    renderItem={({ item }) => 
                        <View style={styles.wrapper}>
                            <ProductListItem product={item} onPress={() => navigation.navigate('Detail', { product: item })} />
                        </View>
                    }
                    keyExtractor={(item) => `${item.id}`}
                    contentContainerStyle={styles.container}
                />
            }</>
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
        paddingHorizontal: 8,
        paddingTop: 35
    },
    wrapper: {
        flex: 1,
        paddingHorizontal: 8
    }
})