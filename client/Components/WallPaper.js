import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import bg from '../images/bgSignIn.png';

export default function WallPaper(props) {
    return (
        <ImageBackground blurRadius={.9} source={{ uri: props.img }} style={styles.picture}>
            {props.children}
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    picture: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
});