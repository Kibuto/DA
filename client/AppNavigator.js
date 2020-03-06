import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Screen/Home';
import Categories from './Screen/Categories';
import Products from './Screen/Products';
import Detail from './Screen/Detail';
import LogIn from './Screen/Login';
import Register from './Screen/Register';
import Create from './Screen/Create';
import Loading from './Screen/Loading';
import Cart from './Screen/Cart';
import Settings from './Screen/Settings';
import Orders from './Screen/Order';
import CheckProduct from './Screen/CheckProduct';
import LogoTitle from './Components/LogoTitle';
import { CartContext } from './contexts/Cart';
import * as firebase from 'firebase';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Badge } from 'react-native-elements';

const TabBottom = createBottomTabNavigator();

function getHeaderTitle(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Feed';

  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'Categories':
      return 'Categories';
    case 'Cart':
      return 'Cart';
    case 'Orders':
      return 'Orders';
    case 'Settings':
      return 'Settings';
  }
}

function TabNavigator(props) {
  return (
    <TabBottom.Navigator 
      tabBarOptions={{style: {backgroundColor: '#000'}}}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size, color }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'ios-home';
          } else if (route.name === 'Categories') {
            iconName = "ios-list-box";
          } else if (route.name === 'Orders') {
            iconName = 'ios-albums';
          } else if (route.name === 'Settings') {
            iconName = 'ios-settings';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
    >
      <TabBottom.Screen name='Home' component={Home} />
      <TabBottom.Screen name="Categories" component={Categories} />
      <TabBottom.Screen name="Cart" component={Cart} options={{
        tabBarIcon: ({size, color}) => 
        <View style={{position: 'relative'}}>
          <Ionicons name='ios-cart' size={size} color={color}/>
          <CartContext.Consumer>
            {({ amount }) => (
              <Badge status='error' value={amount} containerStyle={{ position: 'absolute', top: -4, right: -10 }} />
            )}
          </CartContext.Consumer>
        </View>
      }}/>
      <TabBottom.Screen name="Orders" component={Orders} />
      <TabBottom.Screen name="Settings" component={Settings}/>
    </TabBottom.Navigator>
  )
}

const Stack = createStackNavigator();

export default function AppNavigator(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTransparent: true, headerTitle: null, headerTintColor: '#D90368'}}>
        <Stack.Screen 
          name='Home' 
          component={TabNavigator} 
          options={{ headerTitle: null, headerTransparent: true}}
          // options={({ route }) => ({
          //   headerTitle: getHeaderTitle(route),
          //   headerTitleAlign: 'center'
          // })}
        />
        <Stack.Screen name='Login' component={LogIn} options={{headerTitle: null, headerTransparent: true}}/>
        <Stack.Screen name='Products' component={Products}/>
        <Stack.Screen name='Detail' component={Detail} options={{headerTitle: null, headerTransparent: true}}/>
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Create' component={Create} />
        <Stack.Screen name='Loading' component={Loading} />
        <Stack.Screen name='CheckProduct' component={CheckProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}