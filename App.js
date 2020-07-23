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
import {PersistGate} from 'redux-persist/es/integration/react';
import Loading from './src/components/Loading';

const {store, persistor} = ConfigureStore();

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
