import React, {useEffect, useState} from 'react';
import {
  NavigationContainer,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function SmallUser({uid}) {
  const {colors} = useTheme();
  const [user, setUser] = useState();
  const navigation = useNavigation();
  //   getting user data
  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(uid)
      .get()
      .then(res => {
        setUser(res.data());
      })
      .catch(e => console.log('Getting User Error :', e.message));
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.push('User', {userId: uid});
      }}
      style={styles.container}>
      <View style={styles.row}>
        <Image style={styles.image} source={{uri: user?.profilePicture}} />
        <View>
          <Text style={{fontSize: 18, color: colors.text}}>
            {user?.username}
          </Text>
          <Text style={{fontSize: 14, marginTop: 2, color: 'gray'}}>
            {user?.displayName ?? user?.username}
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
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  row: {
    position: 'relative',
    flexDirection: 'row',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    backgroundColor: '#eee',
    marginRight: 20,
  },
});
