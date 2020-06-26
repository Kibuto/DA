import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { Container, Header, Title, Body, Content } from "native-base";
import { _handleGetFromStorage } from '../utils/Storage';
import { ColorBg, ColorHeader, HOST } from '../key';
import CheckProductItem from '../Components/CheckProductItem';
export default class CheckProduct extends Component {

    state = {
        products: [],
        msg: '',
        isAdmin: false
    }

    componentDidMount() {
        this._handleCallApi();
    }

    _handleCallApi = async () => {
        // const { token } = this.props.route.params;
        const token = await _handleGetFromStorage('token');
        const bearer = `Bearer ${token}`;
        fetch(`${HOST}/api/getProduct`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': bearer,
                'Content-Type': 'application/json'
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.setState({ products: json.product, isAdmin: json.isAdmin });
                } else {
                    this.setState({ msg: json.message });
                }
            })
    }

    _handleCheckProduct = async (id, index) => {
        // const { token } = this.props.route.params;
        const token = await _handleGetFromStorage('token');
        const bearer = `Bearer ${token}`;
        fetch(`${HOST}/api/checkProduct`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': bearer,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                id
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.state.products.splice(index, 1);
                    this.setState({ products: this.state.products });
                    this.props.navigation.navigate('CheckProduct');
                } else {
                    console.log('Error')
                }
            })
    }

    _handleRefuseProduct = async (id, index) => {
        // const { token } = this.props.route.params;
        const token = await _handleGetFromStorage('token');
        const bearer = `Bearer ${token}`;
        fetch(`${HOST}/api/refuseProduct`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': bearer,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                id
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.state.products.splice(index, 1);
                    this.setState({ products: this.state.products })
                    this.props.navigation.navigate('CheckProduct');
                } else {
                    console.log('Error')
                }
            })
    }

    _handleDeleteProduct = async (id, index) => {
        const token = await _handleGetFromStorage('token');
        const bearer = `Bearer ${token}`;
        console.log(bearer);
        fetch(`${HOST}/api/deleteProduct`, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': bearer,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                id
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.state.products.splice(index, 1);
                    this.setState({ products: this.state.products })
                    this.props.navigation.navigate('CheckProduct');
                } else {
                    console.log('Error')
                }
            })
    }

    showAlertAdmin = (id, index, type) => {
        Alert.alert(
            'Hello',
            `Do you want to ${type ? 'check' : 'refuse'} this product?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => type ? this._handleCheckProduct(id, index) : this._handleRefuseProduct(id, index)
                },
            ],
            { cancelable: false },
        )
    }

    showAlertUser = (id, index) => {
        console.log("run alert");
        Alert.alert(
            'Hello',
            `Do you want to delete this product?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => this._handleDeleteProduct(id, index)
                },
            ],
            { cancelable: false },
        )
    }



    render() {
        const { products, msg, isAdmin } = this.state;
        return (
            <Container style={{ backgroundColor: ColorBg }}>
                <Header
                    style={{ backgroundColor: ColorHeader }}
                    androidStatusBarColor='#000'
                    transparent
                >
                    <Body>
                        <Title style={{ fontSize: 26, color: '#D90368', fontWeight: '700', alignSelf: 'center' }}>Follow Product</Title>
                    </Body>
                </Header>
                {
                    msg.length === 0 ?
                        <FlatList
                            data={products}
                            renderItem={({ item, index }) =>
                                <View style={styles.wrapper}>
                                    <CheckProductItem
                                        index={index}
                                        onPress={this.showAlertAdmin}
                                        delProduct={this.showAlertUser}
                                        isAdmin={isAdmin}
                                        product={item}
                                        navigation={this.props.navigation}
                                    />
                                </View>
                            }
                            keyExtractor={(item) => `${item._id}`}
                            contentContainerStyle={styles.container}
                        /> :
                        <View style={styles.err}>
                            <Text style={styles.text}>{msg}</Text>
                        </View>
                }
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingTop: 30,
        backgroundColor: ColorBg
    },
    err: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 22,
        fontStyle: 'italic',
        fontWeight: '700'
    }
})