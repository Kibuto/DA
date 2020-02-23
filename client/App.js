/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import * as firebase from 'firebase';
import { CartProvider } from './contexts/Cart';
import AppNavigator from './AppNavigator';
class App extends Component {

  render() {
    return (
      <CartProvider>
        <AppNavigator />
      </CartProvider>
    )
  }
}

export default App;
