import React, { PureComponent } from 'react';
import { ImageBackground, TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import BG5 from '../images/welcome.jpg';

export default class Welcome extends PureComponent {
    render() {
        return (
            <ImageBackground source={BG5} style={styles.container}>
                <View style={styles.wrapper_top}>
                    <Text style={styles.text}>We make it for you.</Text>
                </View>
                <View style={styles.wrapper_bottom}>
                    <Text style={styles.text}>You read it for youself.</Text>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} activeOpacity={.6} style={styles.btn}>
                    <Text style={styles.text_btn}>Get Started</Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    wrapper_top: {
        position: 'absolute',
        top: '20%',
        marginLeft: 5
    },
    wrapper_bottom: {
        position: 'absolute',
        top: '25%',
        right: 0,
        marginRight: 5
    },
    text: {
        color: '#fdf0d5',
        fontSize: 20,
        letterSpacing: 1.5,
        fontStyle: 'italic'
    },
    btn: {
        position: 'absolute',
        bottom: '2%',
        backgroundColor: '#f4a261',
        paddingVertical: 15,
        width: '90%',
        borderRadius: 20,
        alignSelf: 'center'
    },
    text_btn: {
        textAlign: 'center',
        fontSize: 19,
        fontStyle: 'italic',
        letterSpacing: 1.5,
        fontWeight: 'bold'
    }
})