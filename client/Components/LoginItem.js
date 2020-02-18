import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Container, Input, Label, Button, Item, Form } from 'native-base';
import Logo from '../images/Brand-white.png';
class LoginItem extends Component {

    state = {
        phone: '',
        password: '',
    }

    render() {
        const { phone, password } = this.state;
        return (
            <KeyboardAvoidingView behavior='height'>
                <View style={styles.container}>
                    <Image resizeMode='contain' source={Logo} style={styles.logo}/>
                    {/* <Text style={{color: '#E9446A', fontSize: 18, fontWeight: '700'}}>Login</Text> */}
                    <Item floatingLabel style={{marginBottom: 20}}>
                        <Label>Phone</Label>
                        <Input 
                            autoCapitalize='none' 
                            autoCorrect={false}
                            onChangeText={phone => this.setState({phone})}
                        />
                    </Item>
                    <Item floatingLabel style={{marginBottom: 20}}>
                        <Label>Password</Label>
                        <Input 
                        secureTextEntry={true} 
                        autoCapitalize='none' 
                        autoCorrect={false} 
                        onChangeText={password => this.setState({password})}    
                    />
                    </Item>
                    <Button block info>
                        <Text>Login</Text>
                    </Button>
                    <TouchableOpacity activeOpacity={0.6} style={{marginTop: 20}}>
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