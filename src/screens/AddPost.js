import React from 'react';

import {Text, View, StyleSheet} from 'react-native';

export default function AddPost() {
  return (
    <View style={styles.container}>
      <Text style={styles.highlight}>Add Post Comming Soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  highlight: {
    fontWeight: '500',
    fontSize: 20,
  },
});
