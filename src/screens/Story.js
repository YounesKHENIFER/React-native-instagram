import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Feather from 'react-native-vector-icons/Feather';

export default function Story({navigation, route}) {
  const {user} = route.params;
  const [story, setStory] = useState(null);
  useEffect(() => {
    firestore()
      .collection('Stories')
      .doc(user.uid)
      .get()
      .then(res => {
        setStory(res.data());
      })
      .catch(e => console.log('Getting User Error :', e.message));
  }, []);
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.row}>
        {/* user info */}
        <View style={styles.userBox}>
          <Image source={{uri: user.profilePicture}} style={styles.userPic} />
          <Text style={styles.user}>{user.username}</Text>
        </View>
        <Feather name="more-vertical" size={27} color="white" />
      </View>
      <View style={styles.imageBox}>
        <Image source={{uri: story?.story}} style={styles.imageBox} />
      </View>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder={`Reply to ${user.username}`}
          placeholderTextColor={'gray'}
        />
        <Feather name="send" size={27} color="#ccc" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'black'},
  imageBox: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  user: {
    color: 'white',
    fontSize: 16,
  },
  userPic: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    marginRight: 10,
  },
  userBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 10,
    marginBottom: 30,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
  },
});
