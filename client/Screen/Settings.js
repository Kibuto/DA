import React, { Component } from 'react';
import { FlatList, View, Text, AsyncStorage } from 'react-native';
import { Avatar } from "react-native-elements";
import SettingListItem from '../Components/SettingListItem';
import { _handleGetFromStorage, _handleRemoveStorage } from '../utils/Storage';
import { HOST } from '../key';

export default class SettingScreen extends Component {
    static navigationOptions = {
        headerTitleAlign: {
            textAlign: 'center'
        }
    };

    state = {
        list: [
            {
                id: 1,
                title: 'Sign in',
                icon: 'ios-contact',
                hidden: true
            },
            {
                id: 2,
                title: 'Create product',
                icon: 'ios-create',
                hidden: true
            },
            {
                id: 3,
                title: 'Mail',
                icon: 'ios-mail',
                hidden: true
            },
            {
                id: 4,
                title: 'Notification',
                icon: 'ios-notifications',
                hidden: true
            },
            {
                id: 5,
                title: 'Log out',
                icon: 'ios-exit',
                hidden: false
            }
        ],
        token: '',
        name: ''
    }

    componentDidMount() {
        this._handleChangeState();
    }

    _handleChangeState = async () => {
        const { list } = this.state;
        const { navigation } = this.props;
        const tokenTamp = navigation.getParam('token');
        if(tokenTamp) {
            list.map(item => {
                if(item.id === 1 || item.id === 5)
                    item.hidden = !item.hidden
                else 
                    item.hidden = true;
            })
            this.setState({
                list,
                token: tokenTamp,
                name: navigation.getParam('name')
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log(`Next state: ${nextState.token}`, `current state: ${this.state.token}`);
        // console.log(`Props: ${nextProps.navigation.getParam('token')}`);
        let nextToken = nextProps.navigation.getParam('token');
        if(this.state.token === nextToken) {
            return false;
        }
        return true;
    }

    componentDidUpdate() {
        this._handleChangeState();
    }
    
    switchSignInScreen = async () => {
        const { navigation } = this.props;
        navigation.navigate('LogIn');
    }

    switchScreen = async (index) => {
        const { token } = this.state;
        const { navigation } = this.props;
        switch (index) {
            case 1: 
                navigation.navigate('LogIn');
                break;
            case 2: 
                navigation.navigate('Loading', {token, index});
                break;
            case 3:
                console.log('Mail');
                break;
            case 4: 
                console.log('Notification');
                break;
            case 5:
                await _handleRemoveStorage('token').then( () => {
                    navigation.navigate('LogIn');
                })
                break;
            default:
            break;
        }
    }

    render() {
        const { list, token, name } = this.state;
        console.log('Rendering');
        return (
            <View>
                {token ? <Avatar
                    size="xlarge"
                    rounded
                    activeOpacity={0.7}
                    source={{
                        uri:
                        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    }}
                    containerStyle={{alignSelf: 'center', marginVertical: 15}}
                />:null}
                {name?<Text style={{textAlign: 'center', fontSize: 24, fontWeight: '700', marginBottom: 15}}>{name}</Text>:null}
                <FlatList 
                    data={list}
                    renderItem={({ item }) => <SettingListItem token={token} list={item} index={item.id} switchScreen={this.switchScreen}/>}
                    keyExtractor={(item) => `${item.id}`}
                />
            </View>
        )
    }
}