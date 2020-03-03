import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, Left, Body, Right } from "native-base";
import { HOST, ColorBg, ColorHeader } from '../key';
export default class OrderScreen extends Component {
    render() {
        return (
            <Container style={{backgroundColor: ColorBg}}>
                <Header style={{backgroundColor: ColorHeader}} androidStatusBarColor='#000' transparent>
                    <Body>
                        <Title style={{fontSize: 26, color: '#D90368', fontWeight:'700', alignSelf: 'center'}}>Orders</Title>
                    </Body>
                </Header>
                <Content>
                    <Text style={{color: '#888'}}>Orders</Text>
                </Content>
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