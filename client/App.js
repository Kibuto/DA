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
import { Provider } from 'react-redux';
import { store } from './store/index';
import AppNavigator from './AppNavigator';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <CartProvider>
          <AppNavigator />
        </CartProvider>
      </Provider>
    )
  }
}

export default App;
