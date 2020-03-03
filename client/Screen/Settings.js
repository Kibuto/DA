import React, { Component } from 'react';
import { FlatList, View, Text, AsyncStorage, SafeAreaView } from 'react-native';
import { Avatar } from "react-native-elements";
import SettingListItem from '../Components/SettingListItem';
import { Container, Header, Title, Content, Button, Icon, Left, Body, Right, Switch, ListItem, List } from "native-base";
import { _handleGetFromStorage, _handleRemoveStorage } from '../utils/Storage';
import Ionicons from "react-native-vector-icons/Ionicons";
import { HOST, ColorBg, ColorHeader } from '../key';

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
                <Content>
                    {
                        isLoginSettings ? 
                        <>
                            <Text>Hello {nameSettings}</Text>
                            <List>
                                <ListItem icon>
                                    <Left>
                                        <Button transparent>
                                            <Icon active name="create" />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text>Create Product</Text>
                                    </Body>
                                </ListItem>
                                <ListItem icon onPress={this._handleLogOut}>
                                    <Left>
                                        <Button transparent>
                                        <Icon active name="exit" />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text>Log Out</Text>
                                    </Body>
                                </ListItem>
                            </List>
                        </> : 
                        <List>
                            <ListItem style={{marginVertical: 5}} icon onPress={() => navigation.navigate('Login')}>
                                <Left>
                                    <Button transparent>
                                        <Icon style={{fontSize: 30}} active name="contact" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text style={{fontSize: 18}}>Log In</Text>
                                </Body>
                            </ListItem>
                            <ListItem icon style={{marginVertical: 5}}>
                                <Left>
                                    <Button transparent>
                                        <Icon style={{fontSize: 30}} active name="help" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text style={{fontSize: 18}}>Create Product</Text>
                                </Body>
                            </ListItem>
                        </List>
                    }
                        {/* <ListItem icon>
                            <Left>
                                <Button transparent>
                                    <Icon active name="create" />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Create Product</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button transparent>
                                <Icon active name="exit" />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Log Out</Text>
                            </Body>
                        </ListItem> */}
                    
                </Content>
            </Container>
        )
    }

}
// import React, { Component } from 'react';
// import { FlatList, View, Text, AsyncStorage, SafeAreaView } from 'react-native';
// import { Avatar } from "react-native-elements";
// import SettingListItem from '../Components/SettingListItem';
// import { Container, Header, Title, Content, Button, Icon, Left, Body, Right } from "native-base";
// import { _handleGetFromStorage, _handleRemoveStorage } from '../utils/Storage';
// import { HOST, ColorBg, ColorHeader } from '../key';

// export default class SettingScreen extends Component {

//     state = {
//         list: [
//             {
//                 id: 1,
//                 title: 'Sign in',
//                 icon: 'ios-contact',
//                 hidden: true
//             },
//             {
//                 id: 2,
//                 title: 'Create product',
//                 icon: 'ios-create',
//                 hidden: true
//             },
//             {
//                 id: 3,
//                 title: 'Mail',
//                 icon: 'ios-mail',
//                 hidden: true
//             },
//             {
//                 id: 4,
//                 title: 'Notification',
//                 icon: 'ios-notifications',
//                 hidden: true
//             },
//             {
//                 id: 5,
//                 title: 'Log out',
//                 icon: 'ios-exit',
//                 hidden: false
//             }
//         ],
//         token: '',
//         name: ''
//     }

//     componentDidMount() {
//         this._handleChangeState();
//     }

//     _handleChangeState = async () => {
//         const { list } = this.state;
//         let { params } = this.props.route;
//         console.log("Params: ", params);
//         if(params) {
//             const { token, name } = params;
//             if(token) {
//                 list.map(item => {
//                     if(item.id === 1 || item.id === 5)
//                         item.hidden = !item.hidden
//                     else 
//                         item.hidden = true;
//                 })
//                 this.setState({
//                     list,
//                     token,
//                     name
//                 });
//             } else {
//                 list.map(item => {
//                     if(item.id === 1 || item.id === 5)
//                         item.hidden = !item.hidden
//                     else 
//                         item.hidden = false;
//                 })
//                 this.setState({
//                     list,
//                     token,
//                     name
//                 });
//             }
            
//         } else {
//             console.log("route.params dont be passed");
//         }
//     }

    // shouldComponentUpdate(nextProps, nextState) {
    //     // console.log(`Next state: ${nextState.token}`, `current state: ${this.state.token}`);
    //     // console.log(`Props: ${nextProps.navigation.getParam('token')}`);
    //     let { token } = nextProps.route.params;
    //     const nextToken = token;
    //     if(this.state.token === nextToken) {
    //         return false;
    //     }
    //     return true;
    // }

    // componentDidUpdate() {
    //     this._handleChangeState();
    // }

//     switchScreen = async (index) => {
//         const { token } = this.state;
//         const { navigation } = this.props;
//         switch (index) {
//             case 1: 
//                 navigation.navigate('Login');
//                 break;
//             case 2: 
//                 navigation.navigate('Loading', {token, index});
//                 break;
//             case 3:
//                 console.log('Mail');
//                 break;
//             case 4: 
//                 console.log('Notification');
//                 break;
//             case 5:
//                 await _handleRemoveStorage('token').then( () => {
//                     this.props.route.params = {token: '', name: ''};
//                     this.setState({token: ''})
//                     navigation.navigate('Orders');
//                 })
//                 break;
//             default:
//             break;
//         }
//     }

//     render() {
//         const { list, token, name } = this.state;
//         console.log('Rendering');
//         return (
            // <SafeAreaView>
            //     <Header style={{backgroundColor: ColorHeader}} androidStatusBarColor='#000' transparent>
            //         <Body>
            //             <Title style={{fontSize: 26, color: '#D90368', fontWeight:'700', alignSelf: 'center'}}>Settings</Title>
            //         </Body>
            //     </Header>
            //     <FlatList 
            //         data={list}
            //         renderItem={({ item }) => <SettingListItem token={token} list={item} index={item.id} switchScreen={this.switchScreen}/>}
            //         keyExtractor={(item) => `${item.id}`}
            //         style={{backgroundColor: '#000'}}
            //         contentContainerStyle={{backgroundColor: '#000'}}
            //     />
            // </SafeAreaView>
//         )
//     }
// }