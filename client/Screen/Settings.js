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

    _handleGetStatus = () => {
        const { tokenSettings, nameSettings, isLoginSettings } = this.state;
        const { params } = this.props.route;
        if(params) {
            const { token, name, isLogin, list, amount } = params;
            if(token) {
                this.setState({
                    tokenSettings: token,
                    nameSettings: name,
                    isLoginSettings: isLogin,
                    listSettings: list,
                    amountSettings: amount
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
            console.log(nextState);
            if(this.state.amountSettings !== nextState.amountSettings){
                return true;
            }
            else {
                console.log('break');
                return false;
            }
        }
        return true;
    }

    componentDidUpdate() {
        console.log('run did update');
        this._handleGetStatus();
        this._handleNotification();
    }

    _handleCheckNotification = (product) => {
        console.log(product);
        fetch(`${HOST}/api/checkNotification`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: product._id
            })
        })
        .then(res => res.json())
        .then(json => {
            if(json.success) {
                this._handleCheckNotification();
            } else {
                console.log('Error')
            }
        })
    }

    _handleNotification = () => {
        const { token } = this.props.route.params;
        const bearer = `Bearer ${token}`;
        fetch(`${HOST}/api/notifications`, {
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
                    amountSettings: json.amount,
                    listSettings: json.data
                })
            } else {
                console.log("Lỗi ở _handleNotification: ", json.message);
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