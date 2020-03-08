import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import CreateItem from '../Components/CreateItem';

class ScreenCreate extends Component {

    render() {
        const { token } = this.props.route.params;
        return (
            <View style={styles.container}>
                <CreateItem navigation={this.props.navigation} token={token} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        height: '100%'
    }
});

export default ScreenCreate;