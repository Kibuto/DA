import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Input, Label, Button, Item, Icon } from 'native-base';
import { HOST } from '../key';
import { validateEmail, validatePassword, validatePhone } from '../utils/Validation';
import Logo from '../images/Brand-white.png';
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
            if(json.success) {
                this.setState({
                    errorEmail: '',
                    errorPassword: '',
                    errorName: '',
                    errorPhone: '',
                    errorMessage: ''
                })
                navigation.navigate('Login');
            }
            else {
                this.setState({
                    errorEmail: json.errorEmail,
                    errorPassword: json.errorPassword,
                    errorName: json.errorName,
                    errorPhone: json.errorPhone,
                    errorMessage: json.message
                })
            }
        })
    }

    checkEmail = (email) => {
        if(validateEmail(email)) {
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

    checkPass = (password) => {
        if(validatePassword(password)) {
            this.setState({
                password,
                errorPassword: false,
                errorMessage: ''
            })
        } else {
            this.setState({
                errorPassword: true,
                errorMessage: 'Password invalid (must be at least 6 character)'
            })
        }
    }

    checkPhone = (phone) => {
        if(validatePhone(phone)) {
            this.setState({
                phone,
                errorPhone: false,
                errorMessage: ''
            })
        } else {
            this.setState({
                errorPhone: true,
                errorMessage: 'Phone invalid (must be 10 number)'
            })
        }
    }

    render() {
        const { name, email, phone, password, errorEmail, errorMessage, errorPassword, errorPhone, errorName } = this.state;
        const { navigation } = this.props;
        console.log(!validatePhone(phone), !validateEmail(email), validatePhone(phone)&&validateEmail(email))
        return (
            <KeyboardAvoidingView behavior='height'>
                <View style={styles.container}>
                    <Image resizeMode='contain' source={Logo} style={styles.logo}/>
                    <Text style={{color: '#BEDCFE', fontSize: 18, fontWeight: '700'}}>Register</Text>
                    { errorMessage ? <Text style={{color: '#E9446A', fontSize: 16, fontWeight: '700', marginVertical: 10}}>{errorMessage}</Text> : null }
                    <Item floatingLabel style={{marginBottom: 20}} error={ errorName ? true : false }>
                        <Label>Name</Label>
                        <Input 
                            autoCapitalize='none' 
                            autoCorrect={false}
                            onChangeText={name => this.setState({name})}
                        />
                        { errorName ? <Icon name='close-circle' /> : null }
                    </Item>
                    <Item floatingLabel style={{marginBottom: 20}} error={ errorEmail ? true : false }>
                        <Label>Email</Label>
                        <Input 
                            autoCapitalize='none' 
                            autoCorrect={false}
                            onChangeText={email => this.checkEmail(email)}
                        />
                        { errorEmail ? <Icon name='close-circle' /> : null }
                    </Item>
                    <Item floatingLabel style={{marginBottom: 20}} error={ errorPassword ? true : false }>
                        <Label>Password</Label>
                        <Input 
                            secureTextEntry={true} 
                            autoCapitalize='none' 
                            autoCorrect={false} 
                            onChangeText={password => this.checkPass(password)}    
                        />
                        { errorPassword ? <Icon name='close-circle' /> : null }
                    </Item>
                    <Item floatingLabel style={{marginBottom: 20}} error={ errorPhone ? true : false }>
                        <Label>Phone</Label>
                        <Input 
                            autoCapitalize='none' 
                            autoCorrect={false}
                            onChangeText={phone => this.checkPhone(phone)}
                        />
                        { errorPhone ? <Icon name='close-circle' /> : null }
                    </Item>
                    <Button block disabled={!validatePhone(phone) && !validateEmail(email)} info onPress={this._handleOnSignUp}>
                        <Text>Sign Up</Text>
                    </Button>
                    <TouchableOpacity activeOpacity={0.6} style={{marginTop: 20}} onPress={() => navigation.navigate('LogIn')}>
                        <Text>Old to TiTiStore ? <Text style={{color: '#E9446A'}}>Sign In</Text></Text>
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

export default RegisterItem;