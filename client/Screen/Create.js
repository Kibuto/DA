import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Container, Header, Title, Body, Content } from "native-base";
import CreateItem from '../Components/CreateItem';
import { ColorBg, ColorHeader } from '../key';
const { width, height } = Dimensions.get('window');
class ScreenCreate extends Component {

    render() {
        const { token } = this.props.route.params;
        return (
            <Container style={{ backgroundColor: ColorBg }}>
                <Header style={{ backgroundColor: ColorHeader }} androidStatusBarColor='#000' transparent>
                    <Body>
                        <Title style={styles.title_header}>Create</Title>
                    </Body>
                </Header>
                <Content style={styles.container}>
                    <CreateItem navigation={this.props.navigation} token={token} />
                </Content>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        //backgroundColor: '#FFF',
        marginTop: 20,
        height: height
    },
    title_header: {
        fontSize: 26,
        color: '#D90368',
        fontWeight: '700',
        alignSelf: 'center'
    }
});

export default ScreenCreate;