import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Categories from './Screen/Categories';
import LogIn from './Screen/Login';
import Register from './Screen/Register';
import Cart from './Screen/Cart';
import Settings from './Screen/Settings';
import Orders from './Screen/Order'
import * as firebase from 'firebase';
import Ionicons from "react-native-vector-icons/Ionicons"

const color = {
    ACTIVE: '#147EFB',
    INACTIVE: '#CCC'
  }
  
  const CategoryStack = createStackNavigator(
    {
        Categories
    },
    {
      initialRouteName: 'Categories'
    }
  );
  CategoryStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <Ionicons name='ios-home' size={24} color={focused ? color.ACTIVE : color.INACTIVE}/>
    )
  }
  
  const CartStack = createStackNavigator({ Cart });
  CartStack.navigationOptions = {
    tabBarLabel: 'Cart',
    tabBarIcon: ({ focused }) => (
      <Ionicons name='ios-cart' size={24} color={focused ? color.ACTIVE : color.INACTIVE}/>
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
            CategoryStack,
            CartStack,
            OrderStack,
            SettingStack
        }
    )
  )
  export default AppNavigator;