import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Icon } from 'native-base';
import { Input, Label, Button, Item } from 'native-base';
import { validateEmail, validatePassword } from '../utils/Validation';
import { connect } from 'react-redux';
import { fetchLoginRequest } from '../actions';
import { _handleSaveInStorage, _handleGetFromStorage } from '../utils/Storage';
import { HOST } from '../key';
import Logo from '../images/Brand-white.png';
class LoginItem extends Component {

    state = {
        email: '',
        password: '',
        errorMessage: '',
        errorEmail: false,
        errorPassword: false
    }

    // _handleOnLogin = async () => {
    //     const { email, password } = this.state;
    //     fetch(`${HOST}/api/account/signin`, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             email,
    //             password
    //         })
    //     })
    //         .then(res => res.json())
    //         .then(async (json) => {
    //             if (json.success) {
    //                 console.log(json);
    //                 this.setState({
    //                     errorMessage: '',
    //                     errorEmail: '',
    //                     errorPassword: ''
    //                 })
    //                 await _handleSaveInStorage('token', json.token);
    //                 this._handleVerify(json.token);
    //             }
    //             else {
    //                 this.setState({
    //                     errorMessage: json.message,
    //                     errorEmail: json.errorEmail,
    //                     errorPassword: json.errorPassword
    //                 })
    //             }
    //         })
    // }

    // _handleVerify = async (token) => {
    //     const bearer = `Bearer ${token}`;
    //     const { navigation } = this.props;
    //     await fetch(`${HOST}/api/verify`, {
    //         method: 'GET',
    //         headers: new Headers({
    //             'Authorization': bearer,
    //             'Content-Type': 'application/json'
    //         })
    //     })
    //         .then(res => res.json())
    //         .then(json => {
    //             if (json.success) {
    //                 navigation.navigate('Settings', { name: json.name, token, isLogin: true });
    //             } else {
    //                 console.log("Lỗi ở _handleVerify sign item: ", json.message);
    //             }

    //         })
    // }

    _handleOnLogin = () => {
        const { email, password } = this.state;
        const obj = {
            email,
            password
        }
        this.props.fetchLogin(obj, this._handleSwitchScreen);
    }

    _handleSwitchScreen = (name, token) => {
        this.props.navigation.navigate('Settings', { name, token, isLogin: true })
    }

    checkEmail = (email) => {
        if (validateEmail(email)) {
            this.setState({
                email,
                errorEmail: false,
                errorMessage: ''
            })
        } else {
            this.setState({
                errorEmail: true,
                errorMessage: 'Email invalid'
            })
        }
    }

    render() {
        const { email, password, errorEmail, errorPassword, errorMessage } = this.state;
        const { navigation } = this.props;
        //console.log(this.props);
        return (
            <KeyboardAvoidingView behavior='height'>
                <View style={styles.container}>
                    <Image resizeMode='contain' source={Logo} style={styles.logo} />
                    <Text style={{ color: '#BEDCFE', fontSize: 18, fontWeight: '700' }}>Login</Text>
                    {errorMessage ? <Text style={{ color: '#E9446A', fontSize: 16, fontWeight: '700', marginVertical: 10 }}>{errorMessage}</Text> : null}
                    <Item floatingLabel style={{ marginBottom: 20 }} error={errorEmail ? true : false}>
                        <Label>Email</Label>
                        <Input
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={email => this.checkEmail(email)}
                        />
                        {errorEmail ? <Icon name='close-circle' /> : null}
                    </Item>
                    <Item floatingLabel style={{ marginBottom: 20 }} error={errorPassword ? true : false}>
                        <Label>Password</Label>
                        <Input
                            secureTextEntry={true}
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={password => this.setState({ password })}
                        />
                        {errorPassword ? <Icon name='close-circle' /> : null}
                    </Item>
                    <Button disabled={!validateEmail(email)} block info onPress={this._handleOnLogin}>
                        <Text>Login</Text>
                    </Button>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('Register')} style={{ marginTop: 20 }}>
                        <Text>New to TiTiStore ? <Text style={{ color: '#E9446A' }}>Register</Text></Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} style={{ marginTop: 20 }}>
                        <Text style={{ color: '#E9446A' }}>Forgot the password</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
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
        height: `15%`
    }
});

// const mapStateToProps = (state) => {
//     return {
//         token: state.token
//     }
// }

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchLogin: (obj, fnc) => {
            dispatch(fetchLoginRequest(obj, fnc));
        }
    }
}

export default connect(null, mapDispatchToProps)(LoginItem);