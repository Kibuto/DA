import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Input, Item, Container, Header } from 'native-base';
import { validateEmail } from '../utils/Validation';
import { connect } from 'react-redux';
import { fetchLoginRequest } from '../actions';
import { _handleSaveInStorage, _handleGetFromStorage } from '../utils/Storage';
import { ColorBg } from '../key';
import Logo from '../images/logo.jpg';
class LoginItem extends Component {

    state = {
        email: '',
        password: '',
        errorMessage: '',
        errorEmail: false,
        errorPassword: false
    }

    _handleOnLogin = () => {
        const { email, password } = this.state;
        const obj = {
            email,
            password
        }
        if (email === "" && password === "") {
            this.setState({
                errorEmail: true,
                errorPassword: true,
                errorMessage: 'These fields can not be blank'
            })
        }
        else if (!validateEmail(email)) {
            this.setState({
                errorEmail: true,
                errorPassword: false,
                errorMessage: 'Email is invalid'
            })
        }
        else {
            this.setState({
                errorEmail: false,
                errorPassword: false,
                errorMessage: ''
            })
            this.props.fetchLogin(obj, this._handleSwitchScreen);
        }
    }

    _handleSwitchScreen = (name, token) => {
        this.props.navigation.navigate('Settings', { name, token, isLogin: true })
    }

    render() {
        const { email, password, errorEmail, errorPassword, errorMessage } = this.state;
        const { navigation, errorMessageServer, errorEmailServer, errorPasswordServer } = this.props;
        return (
            <Container style={{ backgroundColor: ColorBg }}>
                <Header
                    style={{ backgroundColor: ColorBg }}
                    androidStatusBarColor='#000'
                    transparent
                />
                <KeyboardAvoidingView behavior='height' >
                    <Image resizeMode='contain' source={Logo} style={styles.logo} />
                    {errorMessage ? <Text style={styles.text_err}>{errorMessage}</Text> : errorMessageServer ? <Text style={styles.text_err}>{errorMessageServer}</Text> : null}
                    <Item
                        stackedLabel
                        rounded
                        bordered
                        style={styles.wrapper_input}
                        error={errorEmail ? true : errorEmailServer ? true : false}
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
                        error={errorPassword ? true : errorPasswordServer ? true : false}
                    >
                        <Input
                            placeholder='Password'
                            secureTextEntry
                            style={styles.input}
                            onChangeText={password => this.setState({ password })}
                        />
                    </Item>
                    <TouchableOpacity
                        style={[styles.link, { marginTop: 20 }]}
                        activeOpacity={.6}
                    >
                        <Text style={styles.link_text}>Forget Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this._handleOnLogin}
                        style={styles.btn}
                        activeOpacity={.6}
                    >
                        <Text style={styles.btn_text}>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Register')}
                        style={styles.link}
                        activeOpacity={.6}
                    >
                        <Text style={styles.link_text}>
                            Not a member ?
                            <Text style={styles.register}>Join Now</Text>
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
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
        width: `100%`,
        height: `30%`
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

const mapStateToProps = (state) => {
    return {
        errorEmailServer: state.errorEmailServer,
        errorPasswordServer: state.errorPasswordServer,
        errorMessageServer: state.errorMessageServer
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchLogin: (obj, fnc) => {
            dispatch(fetchLoginRequest(obj, fnc));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginItem);