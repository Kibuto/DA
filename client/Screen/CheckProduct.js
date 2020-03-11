import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { Container, Header, Title, Body, Content } from "native-base";
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

    _handleCheckProduct = (id) => {
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
                this.showAlert(json.message);
            } else {
                console.log('Error')
            }
        })
    }

    showAlert = (str) => {
        const { navigation } = this.props;
        Alert.alert(
            `${str}`,
            'You are going to be redirected to the Products Screen',
            [
                {text: 'OK', onPress: () => navigation.navigate('Categories')},
            ]
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
                        renderItem={({ item }) => 
                            <View style={styles.wrapper}>
                                <CheckProductItem onPress={this._handleCheckProduct} isAdmin={isAdmin} product={item} />
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