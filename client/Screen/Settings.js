import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Avatar } from "react-native-elements";
import SettingListItem from '../Components/SettingListItem';
import { connect } from 'react-redux';
import { fetchNotificationsRequest, fetchCheckNotificationsRequest, fetchLogout } from '../actions';
import { Container, Header, Title, Body } from "native-base";
import { _handleGetFromStorage, _handleRemoveStorage } from '../utils/Storage';
import { ColorBg, ColorHeader, HOST } from '../key';

class SettingScreen extends Component {

    state = {
        isLogin: false,
        tokenSettings: '',
        nameSettings: '',
        isLoginSettings: false,
    }

    async componentDidMount() {
        const token = await _handleGetFromStorage('token');
        if (token) {
            const bearer = `Bearer ${token}`;
            fetch(`${HOST}/api/verify`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': bearer,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                })
            })
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.props.fetchNotification(bearer);
                        this.setState({
                            tokenSettings: json.token,
                            nameSettings: json.name,
                            isLoginSettings: true
                        })
                    }
                    else {
                        console.log('error did mount')
                    }
                })
        } else {
            console.log('no token');
        }

    }

    _handleGetStatus = async () => {
        const { tokenSettings, nameSettings, isLoginSettings } = this.state;
        const { params } = this.props.route;
        if (params) {
            const { token, name, isLogin } = params;
            if (token) {
                this.props.fetchNotification(`Bearer ${token}`);
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
        const { params } = nextProps.route;
        if (!params) {
            return true;
        }
        const { token } = params;
        const nextToken = token;
        if (this.state.tokenSettings === nextToken) {
            if (this.props.amount !== nextProps.amount) {
                return true;
            }
            return false;
        }
        return true;
    }

    componentDidUpdate() {
        this._handleGetStatus();
    }

    _handleCheckNotification = async () => {
        // const { token } = this.props;
        // console.log('token: ', token);
        const token = await _handleGetFromStorage('token');
        const bearer = `Bearer ${token}`;
        this.props.fetchCheckNotification(bearer);
        this.props.navigation.navigate('Notification');
    }

    _handleLogOut = async () => {
        const { route, fetchLogOut } = this.props;
        await AsyncStorage.removeItem('token').then(() => {
            if (route.params) {
                route.params.token = '';
            }
            fetchLogOut();
            this.setState({ tokenSettings: '', nameSettings: '', isLoginSettings: false })
        })
    }

    render() {
        const { tokenSettings, nameSettings, isLoginSettings } = this.state;
        const { navigation, amount } = this.props;
        return (
            <Container style={{ backgroundColor: ColorBg }}>
                <Header style={{ backgroundColor: ColorHeader }} androidStatusBarColor='#000' transparent>
                    <Body>
                        <Title style={{ fontSize: 26, color: '#D90368', fontWeight: '700', alignSelf: 'center' }}>Settings</Title>
                    </Body>
                </Header>
                <SettingListItem onCheckNotification={this._handleCheckNotification} amount={amount} tokenSettings={tokenSettings} navigation={navigation} nameSettings={nameSettings} isLoginSettings={isLoginSettings} handleLogOut={this._handleLogOut} />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        amount: state.amountNotifications,
        token: state.token
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchNotification: (bearer) => {
            dispatch(fetchNotificationsRequest(bearer));
        },
        fetchCheckNotification: (bearer) => {
            dispatch(fetchCheckNotificationsRequest(bearer))
        },
        fetchLogOut: () => {
            dispatch(fetchLogout());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);