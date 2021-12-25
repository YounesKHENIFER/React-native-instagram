import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Story({navigation, route}) {
  const {
    props: {username, profilePicture, storie},
  } = route.params;
  return (
    <View>
      <Text>{username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
