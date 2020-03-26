import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Avatar } from "react-native-elements";
import SettingListItem from '../Components/SettingListItem';
import { Container, Header, Title, Body } from "native-base";
import { _handleGetFromStorage, _handleRemoveStorage } from '../utils/Storage';
import { ColorBg, ColorHeader, HOST } from '../key';

export default class SettingScreen extends Component {

    state = {
        isLogin: false,
        tokenSettings: '',
        nameSettings: '',
        isLoginSettings: false,
        listSettings: [],
        amountSettings: 0
    }

    _handleGetStatus = async () => {
        const { tokenSettings, nameSettings, isLoginSettings } = this.state;
        const { params } = this.props.route;
        if(params) {
            const { token, name, isLogin } = params;
            if(token) {
                const bearer = `Bearer ${token}`;
                await fetch(`${HOST}/api/notifications`, {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': bearer,
                        'Content-Type': 'application/json'
                    })
                })
                .then(res => res.json())
                .then(json => {
                    if(json.success) {
                        this.setState({
                            tokenSettings: token,
                            nameSettings: name,
                            isLoginSettings: isLogin,
                            amountSettings: json.amount,
                            listSettings: json.data
                        })
                    } else {
                        console.log("Lỗi ở _handleNotification: ", json.message);
                    }
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
        const nextToken = token;
        console.log('cur state: ', this.state.amountSettings);
        console.log("next State: ", nextState.amountSettings);
        if(this.state.tokenSettings === nextToken) {
            if(nextState.amountSettings === this.state.amountSettings) {
                return false
            }
            return true;
        }
        return true;
    }

    componentDidUpdate() {
        console.log('run did update');
        this._handleGetStatus();
    }

    _handleCheckNotification = (id) => {
        console.log("product notification: ", id);
        const { token } = this.props.route.params;
        const bearer = `Bearer ${token}`;
        fetch(`${HOST}/api/checkNotification`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': bearer,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                id
            })
        })
        .then(res => res.json())
        .then(json => {
            if(json.success) {
                this.setState({
                    amountSettings: this.state.amountSettings - 1
                })
            } else {
                console.log('Error');
            }
        })
    }

    _handleLogOut = async() => {
        await AsyncStorage.removeItem('token').then(() => {
            this.props.route.params.token = '';
            this.setState({tokenSettings: '', nameSettings: '', isLoginSettings: false})
        })
    }

    render() {
        const { tokenSettings, nameSettings, isLoginSettings, listSettings, amountSettings } = this.state;
        const { navigation } = this.props;
        return (
            <Container style={{backgroundColor: ColorBg}}>
                <Header style={{backgroundColor: ColorHeader}} androidStatusBarColor='#000' transparent>
                    <Body>
                        <Title style={{fontSize: 26, color: '#D90368', fontWeight:'700', alignSelf: 'center'}}>Settings</Title>
                    </Body>
                </Header>
                <SettingListItem handleCheckNotification={this._handleCheckNotification} amount={amountSettings} list={listSettings} tokenSettings={tokenSettings} navigation={navigation} nameSettings={nameSettings} isLoginSettings={isLoginSettings} handleLogOut={this._handleLogOut}/>
            </Container>
        )
    }
}