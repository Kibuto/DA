import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { Container, Header, Title, Body, Content } from "native-base";
import { ColorBg, ColorHeader, HOST } from '../key';
import CheckProductItem from '../Components/CheckProductItem';
export default class CheckProduct extends Component {

    state = {
        products: [],
        msg: '',
        isAdmin: false,
        // message: ''
    }

    componentDidMount() {
        this._handleCallApi();
    }

    _handleCallApi = () => {
        const { token } = this.props.route.params;
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
            if(json.success) {
                this.setState({products: json.product, isAdmin: json.isAdmin});
            } else {
                this.setState({msg: json.message});
            }
        })
    }

    _handleCheckProduct = (id, index) => {
        const { token } = this.props.route.params;
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
            if(json.success) {
                this.state.products.splice(index, 1);
                this.setState({products: this.state.products})
            } else {
                console.log('Error')
            }
        })
    }

    showAlert = (id, index) => {
        Alert.alert(
            'Hello',
            'Do you want to check this product?',
            [
                {text: 'OK', onPress: () => this._handleCheckProduct(id, index)},
            ],
            {cancelable: false},
        )
    }

    render() {
        const { products, msg, isAdmin } = this.state;
        console.log(isAdmin);
        return (
            <Container style={{backgroundColor: ColorBg}}>
                <Header style={{backgroundColor: ColorHeader}} androidStatusBarColor='#000' transparent>
                    <Body>
                        <Title style={{fontSize: 26, color: '#D90368', fontWeight:'700', alignSelf: 'center'}}>Info Product</Title>
                    </Body>
                </Header>
                {
                    msg.length === 0 ? 
                    <FlatList
                        data={products}
                        renderItem={({ item, index }) => 
                            <View style={styles.wrapper}>
                                <CheckProductItem index={index} onPress={this.showAlert} isAdmin={isAdmin} product={item} />
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
        paddingTop: 20,
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