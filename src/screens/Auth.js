import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';

import Input from '../components/Input';
import Btn from '../components/Btn';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import ErrorMsg from '../components/ErrorMsg';
import {useTheme} from '@react-navigation/native';

export default function Auth() {
  const {colors} = useTheme();
  const [screen, setScreen] = useState('login');
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // handling error function
  function Errmsg(err) {
    setError(err);
    return setTimeout(() => {
      setError('');
    }, 3000);
  }

  // login function

  function handleLogin() {
    setLoginLoading(true);
    if (email && password) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {})
        .catch(error => {
          if (
            error.code === 'auth/wrong-password' ||
            error.code === 'auth/user-not-found'
          ) {
            Errmsg('Wrong Email Or Password');
          } else if (error.code === 'auth/too-many-requests') {
            Errmsg('Too Many Requests Try Again Later');
          } else {
            Errmsg('There Is A Probleme Try Again');
          }
        });
    } else {
      Errmsg('Please Enter Your Credentials');
    }
    setLoginLoading(false);
  }

  // register function
  function handleCreate() {
    if (email && password && username) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          firestore()
            .collection('Users')
            .doc(userCredential.user.uid)
            .set({
              uid: userCredential.user.uid,
              username: username,
              email: userCredential.user.email,
              profilePicture:
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
            })
            .then(() => console.log('user added'))
            .catch(error => {
              Errmsg('There Is A Probleme Try Again');
            });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Errmsg('Use An Unique Personal Email');
          } else if (error.code === 'auth/weak-password') {
            Errmsg('Your Password Is Weak Use More Then 6 Character');
          } else {
            Errmsg('There Is A Probleme Try Again');
          }
        });
    } else {
      Errmsg('Please Enter Your Credentials');
    }
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View>
        <View style={styles.imageBox}>
          <Image
            style={styles.image}
            source={require('../assets/Instagram-logo-transparent-PNG.png')}
          />
        </View>
        {screen === 'register' && (
          <Input
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
        )}
        <Input placeholder="Email" value={email} onChangeText={setEmail} />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secure={true}
        />
        {/* displaying different btns   */}
        {!loginLoading ? (
          <>
            {screen === 'login' ? (
              <>
                <Btn
                  onPress={() => handleLogin()}
                  title="LOGIN"
                  disabled={loginLoading}
                />
                <TouchableOpacity
                  style={styles.link}
                  onPress={() => setScreen('register')}>
                  <Text style={{color: colors.text}}>
                    Don't Have An Account ?
                  </Text>
                  <Text style={{color: '#217ac1'}}> Register Now</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Btn onPress={() => handleCreate()} title="REGISTER" />
                <TouchableOpacity
                  style={styles.link}
                  onPress={() => setScreen('login')}>
                  <Text style={{color: colors.text}}>
                    Already Have An Account ?
                  </Text>
                  <Text style={{color: '#217ac1'}}> Login Now</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        ) : (
          <View style={styles.saving}>
            <ActivityIndicator color="#ccc" size="large" />
            <Text>Login...</Text>
          </View>
        )}

        {/* display error msg to user */}
        {error ? <ErrorMsg error={error} /> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  link: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  image: {
    height: 150,
    width: 150,
  },
  imageBox: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 50,
  },
  saving: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
