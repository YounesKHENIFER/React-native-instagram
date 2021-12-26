import React from 'react';
import {StyleSheet, View, Dimensions, Image} from 'react-native';

export default function SmallPost({item}) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: item.postImage}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    height: Dimensions.get('window').width / 3 - 5,
    width: Dimensions.get('window').width / 3 - 5,
    margin: 2,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
