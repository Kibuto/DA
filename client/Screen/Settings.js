import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Avatar } from "react-native-elements";
import SettingListItem from '../Components/SettingListItem';
import { connect } from 'react-redux';
import { fetchNotificationsRequest } from '../actions';
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

    _handleGetStatus = async () => {
        const { tokenSettings, nameSettings, isLoginSettings } = this.state;
        const { params } = this.props.route;
        if(params) {
            const { token, name, isLogin } = params;
            if(token) {
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
        let { token } = nextProps.route.params;
        const nextToken = token;
        console.log('Cur props: ', this.props.amount);
        console.log("next props: ", nextProps.amount);
        if(this.state.tokenSettings === nextToken) {
            if(this.props.amount !== nextProps.amount) {
                return true;
            }
            return false;
        }
        return true;
    }

    componentDidUpdate() {
        this._handleGetStatus();
    }

    // _handleCheckNotification = (id) => {
    //     const { token } = this.props.route.params;
    //     const bearer = `Bearer ${token}`;
    //     fetch(`${HOST}/api/checkNotification`, {
    //         method: 'PUT',
    //         headers: new Headers({
    //             'Authorization': bearer,
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         }),
    //         body: JSON.stringify({
    //             id
    //         })
    //     })
    //     .then(res => res.json())
    //     .then(json => {
    //         if(json.success) {
    //             this.setState({
    //                 amountSettings: this.state.amountSettings - 1
    //             })
    //         } else {
    //             console.log('Error');
    //         }
    //     })
    // }

    _handleLogOut = async() => {
        await AsyncStorage.removeItem('token').then(() => {
            this.props.route.params.token = '';
            this.setState({tokenSettings: '', nameSettings: '', isLoginSettings: false})
        })
    }

    render() {
        const { tokenSettings, nameSettings, isLoginSettings } = this.state;
        const { navigation, amount, list } = this.props;
        console.log(amount);
        return (
            <Container style={{backgroundColor: ColorBg}}>
                <Header style={{backgroundColor: ColorHeader}} androidStatusBarColor='#000' transparent>
                    <Body>
                        <Title style={{fontSize: 26, color: '#D90368', fontWeight:'700', alignSelf: 'center'}}>Settings</Title>
                    </Body>
                </Header>
                <SettingListItem amount={amount} tokenSettings={tokenSettings} navigation={navigation} nameSettings={nameSettings} isLoginSettings={isLoginSettings} handleLogOut={this._handleLogOut}/>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        amount: state.amountNotifications,
        list: state.listNotifications
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchNotification: (bearer) => {
            dispatch(fetchNotificationsRequest(bearer));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);

// import React, { Component } from 'react';
// import { AsyncStorage } from 'react-native';
// import { Avatar } from "react-native-elements";
// import SettingListItem from '../Components/SettingListItem';
// import { Container, Header, Title, Body } from "native-base";
// import { _handleGetFromStorage, _handleRemoveStorage } from '../utils/Storage';
// import { ColorBg, ColorHeader, HOST } from '../key';

// export default class SettingScreen extends Component {

//     state = {
//         isLogin: false,
//         tokenSettings: '',
//         nameSettings: '',
//         isLoginSettings: false,
//         listSettings: [],
//         amountSettings: 0
//     }

//     _handleGetStatus = async () => {
//         const { tokenSettings, nameSettings, isLoginSettings } = this.state;
//         const { params } = this.props.route;
//         if(params) {
//             const { token, name, isLogin } = params;
//             if(token) {
//                 const bearer = `Bearer ${token}`;
//                 await fetch(`${HOST}/api/notifications`, {
//                     method: 'GET',
//                     headers: new Headers({
//                         'Authorization': bearer,
//                         'Content-Type': 'application/json'
//                     })
//                 })
//                 .then(res => res.json())
//                 .then(json => {
//                     if(json.success) {
//                         this.setState({
//                             tokenSettings: token,
//                             nameSettings: name,
//                             isLoginSettings: isLogin,
//                             amountSettings: json.amount,
//                             listSettings: json.data
//                         })
//                     } else {
//                         console.log("Lỗi ở _handleNotification: ", json.message);
//                     }
//                 })
//             } else {
//                 console.log('do not have token');
//             }
//         }
//         else {
//             console.log("Params is: ", params);
//         }
//     }

//     shouldComponentUpdate(nextProps, nextState) {
//         let { token } = nextProps.route.params;
//         const nextToken = token;
//         if(this.state.tokenSettings === nextToken) {
//             if(nextState.amountSettings === this.state.amountSettings) {
//                 return false
//             }
//             return true;
//         }
//         return true;
//     }

//     componentDidUpdate() {
//         this._handleGetStatus();
//     }

//     _handleCheckNotification = (id) => {
//         const { token } = this.props.route.params;
//         const bearer = `Bearer ${token}`;
//         fetch(`${HOST}/api/checkNotification`, {
//             method: 'PUT',
//             headers: new Headers({
//                 'Authorization': bearer,
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             }),
//             body: JSON.stringify({
//                 id
//             })
//         })
//         .then(res => res.json())
//         .then(json => {
//             if(json.success) {
//                 this.setState({
//                     amountSettings: this.state.amountSettings - 1
//                 })
//             } else {
//                 console.log('Error');
//             }
//         })
//     }

//     _handleLogOut = async() => {
//         await AsyncStorage.removeItem('token').then(() => {
//             this.props.route.params.token = '';
//             this.setState({tokenSettings: '', nameSettings: '', isLoginSettings: false})
//         })
//     }

//     render() {
//         const { tokenSettings, nameSettings, isLoginSettings, listSettings, amountSettings } = this.state;
//         const { navigation } = this.props;
//         return (
//             <Container style={{backgroundColor: ColorBg}}>
//                 <Header style={{backgroundColor: ColorHeader}} androidStatusBarColor='#000' transparent>
//                     <Body>
//                         <Title style={{fontSize: 26, color: '#D90368', fontWeight:'700', alignSelf: 'center'}}>Settings</Title>
//                     </Body>
//                 </Header>
//                 <SettingListItem handleCheckNotification={this._handleCheckNotification} amount={amountSettings} list={listSettings} tokenSettings={tokenSettings} navigation={navigation} nameSettings={nameSettings} isLoginSettings={isLoginSettings} handleLogOut={this._handleLogOut}/>
//             </Container>
//         )
//     }
// }