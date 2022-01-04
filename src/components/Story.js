import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useTheme} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Story = ({userId}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [user, setUser] = useState();
  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(userId)
      .get()
      .then(res => {
        setUser(res.data());
      })
      .catch(e => console.log('Getting User Error :', e.message));
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push('Story', {
          user: user,
        })
      }
      style={styles.container}
      activeOpacity={0.9}>
      <LinearGradient
        colors={['#CA1D7E', '#E35157', '#F2703F']}
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 1.0}}
        style={styles.circle}>
        <Image
          source={{uri: user?.profilePicture}}
          style={[styles.image, {borderColor: colors.background}]}
        />
      </LinearGradient>

      <View style={{width: 70}}>
        <Text
          style={[styles.name, {color: colors.text}]}
          circle
          numberOfLines={1}>
          {user?.username}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 4,
  },
  circle: {
    height: 68,
    width: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 64,
    width: 64,
    borderRadius: 32,
    alignSelf: 'center',
    borderWidth: 2,
  },
  name: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: '400',
    color: 'black',
  },
});

export default Story;
