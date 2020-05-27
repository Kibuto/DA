import React, { Component } from 'react';
import LoginItem from '../Components/LoginItem';

export default class Login extends Component {

    render() {
        return (
            <LoginItem navigation={this.props.navigation} />
        )
    }

}