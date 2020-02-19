/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import * as firebase from 'firebase';
import Categories from './Screen/Categories';
import AppNavigator from './AppNavigator';
class App extends Component {

  render() {
    return (
      <AppNavigator />
    )
  }
}

export default App;
