import React, {Component, useState} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Menu from './Menu';
import DishDetail from './DishDetail';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './Home';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const MenuNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Menu"
      // headerMode={'none'}
      screenOptions={{
        headerStyle: {backgroundColor: '#512DA8'},
        headerTintColor: '#FFF',
        headerTitleStyle: {color: '#FFF'},
      }}>
      <Stack.Screen
        name={'Menu'}
        component={Menu}
        options={{
          title: 'Menu',
        }}
      />
      <Stack.Screen
        name={'DishDetail'}
        component={DishDetail}
        options={{
          title: 'Dish Detail',
        }}
      />
    </Stack.Navigator>
  );
};

export const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      // headerMode={'none'}
      screenOptions={{
        headerStyle: {backgroundColor: '#512DA8'},
        headerTintColor: '#FFF',
        headerTitleStyle: {color: '#FFF'},
      }}>
      <Stack.Screen
        name={'Home'}
        component={Home}
        options={{
          title: 'Home',
        }}
      />
    </Stack.Navigator>
  );
};

export const MainNavigator = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: '#D1C4E9',
      }}
      // screenOptions={{
      //   headerStyle: {backgroundColor: '#D1C4E9'},
      // }}
    >
      <Drawer.Screen
        name={'Home'}
        component={HomeNavigator}
        options={{
          title: 'Home',
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen
        name={'Menu'}
        component={MenuNavigator}
        options={{
          title: 'Menu',
          drawerLabel: 'Menu',
        }}
      />
    </Drawer.Navigator>
  );
};

const Main = (props) => {
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <MainNavigator />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Main;
