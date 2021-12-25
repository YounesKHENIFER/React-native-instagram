import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function EmptyList({item}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>There Is No {item}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
});
