import React, {useEffect, useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import useAuth from '../context/useAuth';

export default function SmallUser({uid}) {
  const {colors} = useTheme();
  const {user} = useAuth();
  const [visitedUser, setVisitedUser] = useState();
  const navigation = useNavigation();
  //   getting visitedUser data

  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(uid)
      .get()
      .then(res => {
        setVisitedUser(res.data());
      })
      .catch(e => console.log('Getting User Error :', e.message));
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        if (visitedUser.uid === user.uid) {
          navigation.navigate('Profile');
        } else {
          navigation.push('User', {
            userId: uid,
            username: visitedUser.username,
          });
        }
      }}
      style={styles.container}>
      <View style={styles.row}>
        <Image
          style={styles.image}
          source={{uri: visitedUser?.profilePicture}}
        />
        <View>
          <Text style={{fontSize: 15, color: colors.text}}>
            {visitedUser?.username}
          </Text>
          <Text style={{fontSize: 12, color: 'gray'}}>
            {visitedUser?.displayName
              ? visitedUser?.displayName
              : visitedUser?.username}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  row: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    backgroundColor: '#eee',
    marginRight: 20,
  },
});
