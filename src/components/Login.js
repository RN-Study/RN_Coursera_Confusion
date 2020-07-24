import React, {useState, useRef} from 'react';
import {View, StyleSheet, Text, Button, Platform} from 'react-native';
import {Card, Icon, Input, CheckBox} from 'react-native-elements';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleLogin = () => {
    console.log(JSON.stringify(username, password, remember));
    if (remember) {
      // set token to Async
    } else {
      // delete token
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder={'Username'}
        leftIcon={{name: 'user-o', type: 'font-awesome'}}
        onChangeText={(username) => setUsername(username)}
        value={username}
        containerStyle={styles.formInput}
      />
      <Input
        placeholder={'Password'}
        leftIcon={{name: 'key', type: 'font-awesome'}}
        onChangeText={(password) => setPassword(password)}
        value={password}
        containerStyle={styles.formInput}
      />
      <CheckBox
        title={'Remember me'}
        center={true}
        checked={remember}
        onPress={() => setRemember(!remember)}
        containerStyle={styles.formCheckBox}
        checkedColor={'green'}
        // checkedIcon={'ios-checkbox-outline'}
        uncheckedColor={'gray'}
      />
      <View style={styles.formButton}>
        <Button title={'Login'} onPress={() => handleLogin()} color={'white'} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    margin: 20,
    // backgroundColor: 'gray',
  },
  formInput: {
    // backgroundColor: 'tomato',
  },
  formCheckBox: {
    margin: 40,
    backgroundColor: null,
  },
  formButton: {
    backgroundColor: '#512DA8',
    marginHorizontal: 80,
    borderRadius: 8,
    justifyContent: 'center',
    height: 50,
  },
});

export default Login;
