import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Icon } from 'native-base';
import { Input, Label, Button, Item } from 'native-base';
import { validateEmail, validatePassword } from '../utils/Validation';
import { _handleSaveInStorage } from '../utils/Storage';
import { HOST } from '../key';
import Logo from '../images/Brand-white.png';
class LoginItem extends Component {

    state = {
        email: '',
        password: '',
        errorMessage: '',
        errorEmail: '',
        errorPassword: ''
    }

    _handleOnLogin = async () => {
        const { email, password } = this.state;
        if(validateEmail(email)) {
            this.setState({
                errorEmail: true,
                errorMessage: 'Email invalid'
            })
        }

        if(validatePassword(password)) {
            this.setState({
                errorPassword: true,
                errorPassword: 'Password invalid'
            })
        }
        else {
            fetch(`${HOST}/api/account/signin`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            .then(res => res.json())
            .then( async (json) => {
                if(json.success) {
                    this.setState({
                        errorMessage: '',
                        errorEmail: '',
                        errorPassword: ''
                    })
                    await _handleSaveInStorage('token', json.token);
                    console.log("about to run call api");
                    this.callApi(json.token);
                }
                else {
                    this.setState({
                        errorMessage: json.message,
                        errorEmail: json.errorEmail,
                        errorPassword: json.errorPassword
                    })
                }
            })
        }
    }

    callApi = async (token) => {
        console.log('running');
        const bearer = `Bearer ${token}`;
        const { navigation } = this.props;
        await fetch(`${HOST}/api/verify`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': bearer,
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .then(json => {
            if(json.success) {
                navigation.navigate('Settings', {name: json.name, token});
            } else {
                console.log("Lỗi ở call api sign item: ", json.message);
            }
            
        })
    }

    // checkEmail = (email) => {
    //     if(validateEmail(email)) {
    //         this.setState({
    //             email,
    //             errorEmail: false,
    //             errorMessage: ''
    //         })
    //     } else {
    //         this.setState({
    //             errorEmail: true,
    //             errorMessage: 'Email invalid'
    //         })
    //     }
    // }

    render() {
        const { email, password, errorEmail, errorPassword, errorMessage } = this.state;
        const { navigation } = this.props;
        return (
            <KeyboardAvoidingView behavior='height'>
                <View style={styles.container}>
                    <Image resizeMode='contain' source={Logo} style={styles.logo}/>
                    <Text style={{color: '#BEDCFE', fontSize: 18, fontWeight: '700'}}>Login</Text>
                    { errorMessage ? <Text style={{color: '#E9446A', fontSize: 16, fontWeight: '700', marginVertical: 10}}>{errorMessage}</Text> : null }
                    <Item floatingLabel style={{marginBottom: 20}} error={ errorEmail ? true : false }>
                        <Label>Email</Label>
                        <Input 
                            autoCapitalize='none' 
                            autoCorrect={false}
                            onChangeText={email => this.setState({email})}
                        />
                        { errorEmail ? <Icon name='close-circle' /> : null }
                    </Item>
                    <Item floatingLabel style={{marginBottom: 20}} error={errorPassword ? true : false}>
                        <Label>Password</Label>
                        <Input 
                        secureTextEntry={true} 
                        autoCapitalize='none' 
                        autoCorrect={false} 
                        onChangeText={password => this.setState({password})}    
                    />
                    { errorPassword ? <Icon name='close-circle' /> : null}
                    </Item>
                    <Button block info onPress={this._handleOnLogin}>
                        <Text>Login</Text>
                    </Button>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('Register')} style={{marginTop: 20}}>
                        <Text>New to TiTiStore ? <Text style={{color: '#E9446A'}}>Register</Text></Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} style={{marginTop: 20}}>
                        <Text style={{color: '#E9446A'}}>Forgot the password</Text>
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

export default LoginItem;