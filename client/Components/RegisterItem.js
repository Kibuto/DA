import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Input, Item, Container, Header, Content } from 'native-base';
import { HOST, ColorBg } from '../key';
import { validateEmail, validatePassword, validatePhone } from '../utils/Validation';
import Logo from '../images/logo.jpg';
class RegisterItem extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        password: '',
        errorMessage: '',
        errorEmail: '',
        errorPassword: '',
        errorPhone: '',
        errorName: ''
    }

    _handleOnSignUp = async () => {
        const { email, password, name, phone } = this.state;
        const { navigation } = this.props;
        fetch(`${HOST}/api/account/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                name,
                phone
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.setState({
                        errorEmail: '',
                        errorPassword: '',
                        errorName: '',
                        errorPhone: '',
                        errorMessage: ''
                    })
                    this.showAlert();
                }
                else {
                    this.setState({
                        errorEmail: json.errorEmail,
                        errorPassword: json.errorPassword,
                        errorName: json.errorName,
                        errorPhone: json.errorPhone,
                        errorMessage: json.errorMessage
                    })
                }
            })
    }

    showAlert = () => {
        const { navigation } = this.props;
        Alert.alert(
            `TiTi Store says:`,
            'You have just registered successfully. You will be redirected Login',
            [
                { text: 'OK', onPress: () => navigation.navigate('Login') },
            ]
        )
    }

    _handleCheckRegister = () => {
        const { name, phone, password, email, errorEmail, errorName, errorMessage, errorPassword, errorPhone } = this.state;
        if (name === '' && phone === '' && password === '' && email === '') {
            this.setState({
                errorEmail: true,
                errorPassword: true,
                errorPhone: true,
                errorName: true,
                errorMessage: 'These fields can not be blank'
            })
        }
        else if (!validateEmail(email)) {
            this.setState({
                errorEmail: true,
                errorPassword: false,
                errorPhone: false,
                errorName: false,
                errorMessage: 'Email is invalid'
            })
        }
        else if (!validatePhone(phone)) {
            this.setState({
                errorEmail: false,
                errorPassword: false,
                errorPhone: true,
                errorName: false,
                errorMessage: 'Phone is invalid'
            })
        }
        else if (!validatePassword(password)) {
            this.setState({
                errorEmail: false,
                errorPassword: true,
                errorPhone: false,
                errorName: false,
                errorMessage: 'Password is invalid'
            })
        }
        else if (name === '') {
            this.setState({
                errorEmail: false,
                errorPassword: false,
                errorPhone: false,
                errorName: true,
                errorMessage: 'Field name can not be blank'
            })
        }
        else {
            this._handleOnSignUp();
        }
    }

    render() {
        const { name, email, phone, password, errorEmail, errorMessage, errorPassword, errorPhone, errorName } = this.state;
        const { navigation } = this.props;
        return (
            <Container style={{ backgroundColor: ColorBg }}>
                <Header
                    style={{ backgroundColor: ColorBg }}
                    androidStatusBarColor='#000'
                    transparent
                />
                <Content>
                    <KeyboardAvoidingView behavior='padding' >
                        <Image resizeMode='contain' source={Logo} style={styles.logo} />
                        {errorMessage ? <Text style={styles.text_err}>{errorMessage}</Text> : null}
                        <Item
                            stackedLabel
                            rounded
                            bordered
                            style={styles.wrapper_input}
                            error={errorName ? true : false}
                        >
                            <Input
                                placeholder='Full name'
                                style={styles.input}
                                onChangeText={name => this.setState({ name })}
                            />
                        </Item>
                        <Item
                            stackedLabel
                            rounded
                            bordered
                            style={styles.wrapper_input}
                            error={errorEmail ? true : false}
                        >
                            <Input
                                autoCapitalize='none'
                                placeholder='Email'
                                style={styles.input}
                                onChangeText={email => this.setState({ email })}
                            />
                        </Item>
                        <Item
                            stackedLabel
                            rounded
                            bordered
                            style={styles.wrapper_input}
                            error={errorPhone ? true : false}
                        >
                            <Input
                                autoCapitalize='none'
                                placeholder='Phone'
                                style={styles.input}
                                onChangeText={phone => this.setState({ phone })}
                            />
                        </Item>
                        <Item
                            stackedLabel
                            rounded
                            bordered
                            style={styles.wrapper_input}
                            error={errorPassword ? true : false}
                        >
                            <Input
                                placeholder='Password'
                                secureTextEntry
                                style={styles.input}
                                onChangeText={password => this.setState({ password })}
                            />
                        </Item>
                        <TouchableOpacity
                            onPress={this._handleCheckRegister}
                            style={styles.btn}
                            activeOpacity={.6}
                        >
                            <Text style={styles.btn_text}>REGISTER</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                            style={styles.link}
                            activeOpacity={.6}
                        >
                            <Text style={styles.link_text}>
                                Have you already account ?
                                <Text style={styles.register}> Sign In</Text>
                            </Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        borderRadius: 4,
        backgroundColor: '#FFF',
        height: `100%`
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
    wrapper_input: {
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: .9,
        shadowRadius: 10,
        elevation: 3,
        marginTop: 20,
        width: '90%',
        alignSelf: 'center'
    },
    input: {
        fontStyle: 'italic',
        letterSpacing: 1,
        marginLeft: 10,
        width: '90%'
    },
    btn: {
        alignSelf: 'center',
        marginTop: 20,
        width: '60%',
        backgroundColor: '#8DCDE3',
        paddingVertical: 15,
        borderRadius: 999
    },
    btn_text: {
        fontSize: 18,
        letterSpacing: 1,
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold'
    },
    link: {
        alignSelf: 'center', marginTop: 10
    },
    link_text: {
        fontSize: 14, letterSpacing: 1
    },
    text_err: {
        color: '#E9446A',
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
        fontStyle: 'italic'
    },
    register: {
        color: '#ff8811',
        fontWeight: 'bold'
    }
});

export default RegisterItem;