/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import Main from './src/components/Main';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {ConfigureStore} from './src/redux/configureStore';

const store = ConfigureStore();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Main />
      </Provider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
