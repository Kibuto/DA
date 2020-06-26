import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Container, Header, Content, Item, Input, Label } from "native-base";
import { fetchGetOrderRequest } from '../actions';
import { connect } from 'react-redux';
import { validatePhone } from '../utils/Validation';
import { _handleGetFromStorage } from '../utils/Storage';
import { ColorBg, ColorHeader, HOST } from '../key';

function getCurrentDate() {
    let d = new Date();
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDay()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}

class ConfirmInfo extends PureComponent {

    state = {
        name: '',
        address: '',
        phone: '',
        errorName: false,
        errorAddress: false,
        errorPhone: false,
        errorDate: false,
        errorMessage: '',
        date: new Date('2020-06-26T12:12:12'),
        mode: 'datetime',
        show: false
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
        const { name, phone, address, date } = this.state;
        const { cartItems, sum, amount, fnc } = this.props.route.params;
        const token = await _handleGetFromStorage('token');
        const bearer = `Bearer ${token}`;
        console.log('run')
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
                amount,
                date
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

    _handleCheckConfirm = () => {
        const { name, address, phone, date, errorAddress, errorName, errorPhone, errorMessage } = this.state;
        let dateConvert = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        let curDate = getCurrentDate();
        console.log(dateConvert, curDate);
        if (!name && !address && !phone) {
            this.setState({
                errorName: true,
                errorAddress: true,
                errorPhone: true,
                errorDate: true,
                errorMessage: 'These fields can not be blank'
            })
        }
        else if (!name) {
            this.setState({
                errorName: true,
                errorAddress: false,
                errorPhone: false,
                errorDate: false,
                errorMessage: 'Field name can not be blank'
            })
        }
        else if (!address) {
            this.setState({
                errorName: false,
                errorAddress: true,
                errorPhone: false,
                errorDate: false,
                errorMessage: 'Field address can not be blank'
            })
        }
        else if (!validatePhone(phone)) {
            this.setState({
                errorName: false,
                errorAddress: false,
                errorPhone: true,
                errorDate: false,
                errorMessage: 'Field phone can not be blank or invalid'
            })
        }
        else if (this.compareDate(new Date(curDate), new Date(dateConvert))) {
            this.setState({
                errorName: false,
                errorAddress: false,
                errorPhone: false,
                errorDate: true,
                errorMessage: 'Wrong delivery date'
            })
        }
        else {
            this.showAlert();
        }
    }

    setDate = (event, date) => {
        date = date || this.state.date
        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            date,
        });
    }

    show = mode => {
        this.setState({
            show: true,
            mode
        })
    }

    datePicker = () => {
        this.show('datetime');
    }

    compareDate = (date1, date2) => {
        if (date1 > date2) {
            return true;
        }
        else {
            return false;
        }
    }

    render() {
        const { name, address, phone, errorAddress, errorName, errorPhone, errorDate, errorMessage, date, show, mode } = this.state;
        return (
            <Container style={{ backgroundColor: ColorBg }}>
                <Header
                    style={{ backgroundColor: ColorHeader }}
                    androidStatusBarColor='#000'
                    transparent
                />
                <Content>
                    <Text style={styles.title}>Confirm Information</Text>
                    {
                        errorMessage ? <Text style={styles.text_err}>{errorMessage}</Text> : null
                    }
                    <Label style={styles.label}>Name:</Label>
                    <Item
                        stackedLabel
                        rounded
                        bordered
                        style={styles.wrapper_input}
                        error={errorName ? true : false}
                    >
                        <Input
                            placeholder='Fill name in this field'
                            style={styles.input}
                            onChangeText={name => this.setState({ name })}
                            value={name}
                        />
                    </Item>
                    <Label style={[styles.label, { marginTop: 15 }]} error={errorAddress ? true : false}>Address:</Label>
                    <Item
                        stackedLabel
                        rounded
                        bordered
                        style={styles.wrapper_input}
                        error={errorAddress ? true : false}
                    >
                        <Input
                            autoCapitalize='none'
                            placeholder='Fill address in this field'
                            style={styles.input}
                            onChangeText={address => this.setState({ address })}
                        />
                    </Item>
                    <Label style={[styles.label, { marginTop: 15 }]} error={errorPhone ? true : false}>Phone:</Label>
                    <Item
                        stackedLabel
                        rounded
                        bordered
                        style={styles.wrapper_input}
                        error={errorPhone ? true : false}
                    >
                        <Input
                            placeholder='Fill phone in this field'
                            style={styles.input}
                            onChangeText={phone => this.setState({ phone })}
                            value={phone}
                        />
                    </Item>
                    <View>
                        <Label style={[styles.label, { marginTop: 15 }]} error={errorDate ? true : false}>Delivery date:</Label>
                        <TouchableOpacity
                            activeOpacity={.6}
                            onPress={this.datePicker}
                            style={[styles.deliveryDate, errorDate && styles.err_date]}
                        >
                            <Text style={[styles.input, { marginLeft: 20 }]}>{`${date}`}</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        show && <DateTimePicker
                            value={date.getDay()}
                            mode={mode}
                            is24Hour={true}
                            display='spinner'
                            timeZoneOffsetInSeconds={3600}
                            onChange={this.setDate}
                        />
                    }
                    <TouchableOpacity
                        onPress={this._handleCheckConfirm}
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
    wrapper_input: {
        backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: .9,
        shadowRadius: 10,
        elevation: 3
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
        marginVertical: 30,
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
    },
    text_err: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 10,
        color: 'red',
        fontStyle: 'italic'
    },
    deliveryDate: {
        marginTop: 5,
        backgroundColor: '#fff',
        borderRadius: 999,
        paddingVertical: 24,
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: .7,
        shadowRadius: 10,
        elevation: 5
    },
    err_date: {
        borderStyle: `solid`,
        borderColor: 'red',
        borderWidth: 1
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