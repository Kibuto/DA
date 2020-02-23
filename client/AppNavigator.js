import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from './Screen/Home';
import Categories from './Screen/Categories';
import Products from './Screen/Products';
import Detail from './Screen/Detail';
import LogIn from './Screen/Login';
import Register from './Screen/Register';
import Cart from './Screen/Cart';
import Settings from './Screen/Settings';
import Orders from './Screen/Order';
import { CartContext } from './contexts/Cart';
import * as firebase from 'firebase';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Badge } from 'react-native-elements';

const color = {
    ACTIVE: '#147EFB',
    INACTIVE: '#CCC'
  }
  
  const HomeStack = createStackNavigator(
    {
        Home
    }
  );
  HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <Ionicons name='ios-home' size={24} color={focused ? color.ACTIVE : color.INACTIVE}/>
    )
  }

  const CategoryStack = createStackNavigator(
    {
        Categories,
        Products,
        Detail
    },
    {
      initialRouteName: 'Categories'
    }
  );
  CategoryStack.navigationOptions = {
    tabBarLabel: 'Categories',
    tabBarIcon: ({ focused }) => (
        <Ionicons name='ios-list-box' size={24} color={focused ? color.ACTIVE : color.INACTIVE}/>
    )
  }
  
  const CartStack = createStackNavigator({ Cart });
  CartStack.navigationOptions = {
    tabBarLabel: 'Cart',
    tabBarIcon: ({ focused }) => (
      <View style={{position: 'relative'}}>
        <Ionicons name='ios-cart' size={24} color={focused ? color.ACTIVE : color.INACTIVE}/>
        <CartContext.Consumer>
        {({ amount }) => (
            <Badge status='error' value={amount} containerStyle={{ position: 'absolute', top: -4, right: -10 }} />
        )}
      </CartContext.Consumer>
    </View>
    )
  }
  
  const SettingStack = createStackNavigator({ Settings, LogIn, Register});
  SettingStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ focused }) => (
      <Ionicons name='ios-settings' size={24} color={focused ? color.ACTIVE : color.INACTIVE}/>
    )
  }
  
  const OrderStack = createStackNavigator({ Orders })
  OrderStack.navigationOptions = {
    tabBarLabel: 'Orders',
    tabBarIcon: ({ focused }) => (
      <Ionicons name='ios-albums' size={24} color={focused ? color.ACTIVE : color.INACTIVE}/>
    )
  }
  
  const AppNavigator = createAppContainer(
    createBottomTabNavigator(
        {
            HomeStack,
            CategoryStack,
            CartStack,
            OrderStack,
            SettingStack
        }
    )
  )
  export default AppNavigator;