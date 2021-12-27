import React, {useEffect, useState} from 'react';

import {
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import openGallery from '../utils/openGallery';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from './Input';
import Separator from './Separator';
import firestore from '@react-native-firebase/firestore';
import useAuth from '../context/useAuth';

export default function SingleComment({userId, comment, createdAt}) {
  const {colors} = useTheme();
  const [user, setUser] = useState(null);

  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(userId)
      .get()
      .then(user => setUser(user.data()))
      .catch(e => console.log(e.message));
  }, []);

  return (
    <View style={[styles.row, {borderBottomColor: colors.inputPlaceholder}]}>
      <Image source={{uri: user?.profilePicture}} style={styles.image} />
      <View style={styles.textBox}>
        <Text style={[styles.username, {color: colors.text}]}>
          {user?.username}
        </Text>
        <Text style={[styles.comment, {color: colors.inputPlaceholder}]}>
          {comment}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
    padding: 15,
    marginVertical: 10,
    borderBottomWidth: 0.5,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    backgroundColor: '#ccc',
    marginRight: 20,
  },
  textBox: {
    width: '80%',
  },
  username: {
    fontSize: 16,
  },
  comment: {
    fontSize: 14,
  },
});
