import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Avatar } from "react-native-elements";
import SettingListItem from '../Components/SettingListItem';
import { Container, Header, Title, Body } from "native-base";
import { _handleGetFromStorage, _handleRemoveStorage } from '../utils/Storage';
import { ColorBg, ColorHeader } from '../key';

export default class SettingScreen extends Component {

    state = {
        isLogin: false,
        tokenSettings: '',
        nameSettings: '',
        isLoginSettings: false
    }

    _handleGetStatus = () => {
        const { tokenSettings, nameSettings, isLoginSettings } = this.state;
        const { params } = this.props.route;
        if(params) {
            const { token, name, isLogin } = params;
            if(token) {
                this.setState({
                    tokenSettings: token,
                    nameSettings: name,
                    isLoginSettings: isLogin
                })
            } else {
                console.log('do not have token');
            }
        }
        else {
            console.log("Params is: ", params);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { token } = nextProps.route.params;
        console.log("nextProps: ", token);
        console.log("curState: ", this.state.tokenSettings);
        const nextToken = token;
        if(this.state.tokenSettings === nextToken) {
            return false;
        }
        return true;
    }

    componentDidUpdate() {
        this._handleGetStatus();
    }

    _handleLogOut = async() => {
        await AsyncStorage.removeItem('token').then(() => {
            this.props.route.params.token = '';
            this.setState({tokenSettings: '', nameSettings: '', isLoginSettings: false})
        })
    }

    render() {
        const { tokenSettings, nameSettings, isLoginSettings } = this.state;
        const { navigation } = this.props;
        return (
            <Container style={{backgroundColor: ColorBg}}>
                <Header style={{backgroundColor: ColorHeader}} androidStatusBarColor='#000' transparent>
                    <Body>
                        <Title style={{fontSize: 26, color: '#D90368', fontWeight:'700', alignSelf: 'center'}}>Settings</Title>
                    </Body>
                </Header>
                <SettingListItem tokenSettings={tokenSettings} navigation={navigation} nameSettings={nameSettings} isLoginSettings={isLoginSettings} onPress={this._handleLogOut}/>
            </Container>
        )
    }
}