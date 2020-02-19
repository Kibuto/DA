import React, { Component } from 'react';
import WallPaper from '../Components/WallPaper';
import LoginItem from '../Components/LoginItem';

export default class Login extends Component {

    static navigationOptions = {
        headerShown: false
    };

    render() {
        return (
            <LoginItem navigation={this.props.navigation}/>
        )
    }
    
}