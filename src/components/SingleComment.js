import React, {useEffect, useState} from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';

export default function SingleComment({userId, comment, createdAt}) {
  const {colors} = useTheme();
  const [user, setUser] = useState(null);
  // getting user infos
  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(userId)
      .get()
      .then(user => {
        setUser(user.data());
      })
      .catch(e => console.log(e.message));
  }, []);

  return (
    <View
      style={[styles.container, {borderBottomColor: colors.inputPlaceholder}]}>
      {user ? (
        <Text style={[styles.username, {color: colors.text}]}>
          {user?.username} :
          <Text style={[styles.comment, {color: 'gray'}]}> {comment}</Text>
        </Text>
      ) : (
        <Text>loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 0.4,
  },
  username: {
    fontSize: 14,
  },
  comment: {
    fontSize: 13,
  },
});
