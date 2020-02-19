/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDl3-rSp5LVsni33u-J9HH6Qm0Ubs7pBVQ",
    authDomain: "doandb-c66dd.firebaseapp.com",
    databaseURL: "https://doandb-c66dd.firebaseio.com",
    projectId: "doandb-c66dd",
    storageBucket: "doandb-c66dd.appspot.com",
    messagingSenderId: "110597668538",
    appId: "1:110597668538:web:3fd17457d2548477ca0c83",
    measurementId: "G-EFSKZE7RMT"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


AppRegistry.registerComponent(appName, () => App);
