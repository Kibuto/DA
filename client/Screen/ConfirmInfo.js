import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Title, Body, Content, Item, Input, Label } from "native-base";
import { fetchGetOrderRequest } from '../actions';
import { connect } from 'react-redux';
import { _handleGetFromStorage } from '../utils/Storage';
import { ColorBg, ColorHeader, HOST } from '../key';

class ConfirmInfo extends PureComponent {

    state = {
        name: '',
        address: '',
        phone: '',
        errorName: false,
        errorAddress: false,
        errorPhone: false
    }

    componentDidMount() {
        this._handleGetInfo();
    }

    _handleGetInfo = async () => {
        const token = await _handleGetFromStorage('token');
        const bearer = `Bearer ${token}`;
        await fetch(`${HOST}/api/account/getInfo`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': bearer,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    console.log(json);
                    this.setState({
                        name: json.name,
                        phone: json.phone
                    })
                } else {
                    console.log("Lỗi ở _handleGetInfo sign item: ", json);
                }

            })
    }

    _handleOnConfirm = async () => {
        const { name, phone, address } = this.state;
        const { cartItems, sum, amount, fnc } = this.props.route.params;
        const token = await _handleGetFromStorage('token');
        const bearer = `Bearer ${token}`;
        await fetch(`${HOST}/api/order/create`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': bearer,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                name,
                phone,
                address,
                cartItems,
                sum,
                amount
            })
        })
            .then(res => res.json())
            .then(async json => {
                if (json.success) {
                    fnc();
                    this.props.fetchGetOrder(bearer);
                    this.props.navigation.navigate('Home');
                } else {
                    console.log("Lỗi ở _handleOnConFirm sign item: ", json);
                }

            })
    }

    showAlert = () => {
        Alert.alert(
            `TiTi Store says:`,
            'Do you want to order?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                { text: 'OK', onPress: () => this._handleOnConfirm() },
            ]
        )
    }

    render() {
        const { name, address, phone, errorAddress, errorName, errorPhone } = this.state;
        return (
            <Container style={{ backgroundColor: ColorBg }}>
                <Header style={{ backgroundColor: ColorHeader }} androidStatusBarColor='#000' transparent />
                <Content>
                    <Text style={styles.title}>Confirm Information</Text>
                    <Label style={styles.label}>Name:</Label>
                    <Item stackedLabel rounded bordered style={{ backgroundColor: 'white', shadowOffset: { width: 0, height: 0 }, shadowOpacity: .9, shadowRadius: 10, elevation: 3 }} error={errorName ? true : false}>
                        <Input
                            placeholder='Fill name in this field'
                            style={styles.input}
                            onChangeText={name => this.setState({ name })}
                            value={name}
                        />
                    </Item>
                    <Label style={[styles.label, { marginTop: 15 }]} error={errorAddress ? true : false}>Address:</Label>
                    <Item stackedLabel rounded bordered style={{ backgroundColor: 'white', shadowOffset: { width: 0, height: 0 }, shadowOpacity: .9, shadowRadius: 10, elevation: 3 }}>
                        <Input
                            autoCapitalize='none'
                            placeholder='Fill address in this field'
                            style={styles.input}
                            onChangeText={address => this.setState({ address })}
                        />
                    </Item>
                    <Label style={[styles.label, { marginTop: 15 }]} error={errorPhone ? true : false}>Phone:</Label>
                    <Item stackedLabel rounded bordered style={{ backgroundColor: 'white', shadowOffset: { width: 0, height: 0 }, shadowOpacity: .9, shadowRadius: 10, elevation: 3 }}>
                        <Input
                            placeholder='Fill phone in this field'
                            style={styles.input}
                            onChangeText={phone => this.setState({ phone })}
                            value={phone}
                        />
                    </Item>
                    <TouchableOpacity
                        onPress={this.showAlert}
                        activeOpacity={.6}
                        style={styles.btn}
                    >
                        <Text style={styles.btn_text}>Confirm info</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    label: {
        marginLeft: '5%',
        marginBottom: 5,
        fontStyle: 'italic',
        letterSpacing: 1
    },
    input: {
        fontStyle: 'italic',
        letterSpacing: 1,
        marginLeft: 10
    },
    title: {
        marginTop: 10,
        marginLeft: '5%',
        fontSize: 26,
        fontStyle: 'italic',
        fontWeight: '700',
        letterSpacing: 1,
        color: '#D90368',
        textTransform: 'capitalize',
        marginBottom: 20,
        textAlign: 'center'
    },
    btn: {
        width: '80%',
        backgroundColor: '#D90368',
        alignSelf: 'center',
        paddingVertical: 15,
        borderRadius: 999,
        marginVertical: 20,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: .9,
        shadowRadius: 10,
        elevation: 3
    },
    btn_text: {
        textAlign: 'center',
        color: 'white',
        textTransform: 'capitalize',
        fontSize: 20,
        fontWeight: 'bold'
    }
})

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchGetOrder: (bearer) => {
            dispatch(fetchGetOrderRequest(bearer));
        }
    }
}

export default connect(null, mapDispatchToProps)(ConfirmInfo);