import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default class LoadingScreen extends Component {

    _loadData = () => {
        const { navigation } = this.props;
        const { token } = this.props.route.params;
        token ? navigation.navigate("Create", { token }) : navigation.navigate('Login');
    }

    componentDidMount() {
        this._loadData();
    }

    render() {
        return (
            <View style={[styles.container_indicator, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container_indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});