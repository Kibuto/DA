import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView, Dimensions, Image, ImageBackground } from 'react-native';
import { Header, Title, Button, Icon, Left, Body, Right } from "native-base";
import ProductListItem from '../Components/ProductListItem';
import CartFooter from '../Components/CartFooter';
import { CartContext } from '../contexts/Cart';
import { HOST, ColorBg, ColorHeader } from '../key';
const  { width, height } = Dimensions.get('window');

export default class ProductScreen extends Component {

    state = {
        products: []
    }

    componentDidMount() {
        this._handleCallApi();
    }

    _handleCallApi = () => {
        const { categoryProduct }= this.props.route.params;
        const id = categoryProduct.name;
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
        const { navigation, route } = this.props;
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
                <CartContext.Consumer>
                    {
                        ({ amount, sum }) => (
                            sum ? <CartFooter navigation={navigation} amount={amount} sum={sum} /> : null
                        )
                    }
                </CartContext.Consumer>
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
    },
    wrapper: {
    }
})

// export default class ProductScreen extends Component {

//     state = {
//         products: []
//     }

//     componentDidMount() {
//         this._handleCallApi();
//     }

//     _handleCallApi = () => {
//         const { categoryProduct }= this.props.route.params;
//         const id = categoryProduct.id;
//         fetch(`${HOST}/api/products?category=${id}`)
//             .then(res => res.json())
//             .then(json => {
//                 if(json.success) {
//                     this.setState({
//                         products: json.message
//                     })
//                 }
//                 else {
//                     console.log('Ko lay duoc products');
//                 }
//         });
//     }

//     render() {
//         const { products } = this.state;
//         const { navigation } = this.props;
//         return (
//             <>{
//                 products.length < 1 ? 
//                 <View style={[styles.container_indicator, styles.horizontal]}>
//                     <ActivityIndicator size="large" color="#0000ff" />
//                 </View> :
//                 <>
//                     <Header style={{backgroundColor: ColorBg}} androidStatusBarColor='#000' transparent>
//                         <Left>
//                             <Button transparent >
//                                 <Icon name='arrow-back' />
//                             </Button>
//                         </Left>
//                         <Right>
//                             <Button rounded style={{ backgroundColor: ColorBg}}>
//                                 <Icon name='search' />
//                             </Button>
//                         </Right>
//                     </Header>
//                     <FlatList
//                         data={products}
//                         renderItem={({ item }) => 
//                             <View style={styles.wrapper}>
//                                 <ProductListItem product={item} onPress={() => navigation.navigate('Detail', { product: item })} />
//                             </View>
//                         }
//                         keyExtractor={(item) => `${item.id}`}
//                         contentContainerStyle={styles.container}
//                         horizontal={true}
//                     />
                    // <CartContext.Consumer>
                    //     {
                    //         ({ amount, sum }) => (
                    //             <CartFooter amount={amount} sum={sum} />
                    //         )
                    //     }
                    // </CartContext.Consumer>
//                 </>
//             }</>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container_indicator: {
//         flex: 1,
//         justifyContent: 'center'
//     },
//     horizontal: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         padding: 10
//     },
//     container: {
//         paddingHorizontal: 8,
//         paddingTop: 20,
//         backgroundColor: ColorBg
//     },
//     wrapper: {
//         flex: 1,
//         paddingHorizontal: 8
//     }
// })