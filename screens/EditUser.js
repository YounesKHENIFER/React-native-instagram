import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import Btn from '../components/Btn';
import Input from '../components/Input';
import ErrorMsg from '../components/ErrorMsg';

import useAuth from '../context/useAuth';

export default function Edit({navigation}) {
  const {setUser, user} = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName);
  const [username, setUsername] = useState(user?.username);
  const [bio, setBio] = useState(user?.bio);
  // handleing changes
  function handleSave() {
    if (username) {
      // logic to handle saving informations
      // navigation.navigate('Home');
      setUser(true);
    } else {
      Errmsg('Username Is Required');
    }
  }

  // handleing Errors
  const [error, setError] = useState('');
  function Errmsg(err) {
    setError(err);
    return setTimeout(() => {
      setError('');
    }, 2000);
  }

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="x" size={30} color="red" />
        </TouchableOpacity>

        <Text style={styles.title}>Edit Profile</Text>
        <TouchableOpacity onPress={() => handleSave()}>
          <Feather name="check" size={30} color="green" />
        </TouchableOpacity>
      </View>
      {/* body */}
      <View style={styles.imageBox}>
        <TouchableOpacity activeOpacity={0.9}>
          <Image style={styles.image} source={require('../assets/1.jpg')} />
          <View style={styles.plus}>
            <Feather name="camera" size={24} color="gray" />
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Input
          placeholder="Name"
          value={displayName}
          onChangeText={setDisplayName}
        />
        <Input
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <Input placeholder="Bio" value={bio} onChangeText={setBio} />
        {error ? <ErrorMsg error={error} /> : null}
        <Btn onPress={() => handleSave()} title="SAVE" />
      </View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 120,
  },
  header: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  imageBox: {
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  plus: {
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
    borderColor: '#ccc',
    borderWidth: 1,
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 5,
    right: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: 'black',
  },
});
