import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import { Header, Title, Button, Icon, Left, Body, Right } from "native-base";
import ProductListItem from '../Components/ProductListItem';
import CartFooter from '../Components/CartFooter';
import { CartContext } from '../contexts/Cart';
import { connect } from 'react-redux';
import { fetchProductsRequest } from '../actions';
import { ColorBg, ColorHeader } from '../key';

class ProductScreen extends Component {

    componentDidMount() {
        this.props.fetchAllProducts();
    }

    render() {
        const { navigation, route, products } = this.props;
        const { categoryProduct } = route.params;
        return (
            <SafeAreaView style={{flex: 1}}>
                <Header style={{backgroundColor: ColorHeader}} androidStatusBarColor='#000' transparent>
                    <Left>
                        <Button transparent >
                            <Icon style={{color: '#D90368'}} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{fontSize: 26, fontWeight: '700', color: '#D90368'}}>{categoryProduct.name}</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon style={{color: '#D90368'}} name='search' />
                        </Button>
                    </Right>
                </Header>
                <FlatList
                    data={products}
                    renderItem={({ item }) => 
                        <View style={styles.wrapper}>
                            <ProductListItem notification={false} product={item} onSwitchScreen={() => navigation.navigate('Detail', { product: item })} />
                        </View>
                    }
                    keyExtractor={(item) => `${item._id}`}
                    contentContainerStyle={styles.container}
                />
                {/* <CartContext.Consumer>
                    {
                        ({ amount, sum }) => (
                            sum ? <CartFooter navigation={navigation} amount={amount} sum={sum} /> : null
                        )
                    }
                </CartContext.Consumer> */}
            </SafeAreaView>
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
        backgroundColor: ColorBg
    }
});

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

const mapDispatchToProps = (dispatch, props) => {
    const { categoryProduct } = props.route.params;
    const id = categoryProduct.name;
    return {
        fetchAllProducts: () => {
            dispatch(fetchProductsRequest(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);