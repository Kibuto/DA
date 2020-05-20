import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, Left, Body, Right } from "native-base";
import { HOST, ColorBg, ColorHeader } from '../key';
export default class OrderScreen extends Component {
    render() {
        return (
            <Container style={{ backgroundColor: ColorBg }}>
                <Header style={{ backgroundColor: ColorHeader }} androidStatusBarColor='#000' transparent>
                    <Body>
                        <Title style={{ fontSize: 26, color: '#D90368', fontWeight: '700', alignSelf: 'center' }}>Orders</Title>
                    </Body>
                </Header>
                {/* <Content contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#888', fontSize: 20}}>Orders</Text>
                </Content> */}
                <ImageBackground source={{ uri: 'https://cdn.dribbble.com/users/357929/screenshots/2276751/orderup-emptystate-sadbag.png' }} style={{ flex: 1 }} />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})