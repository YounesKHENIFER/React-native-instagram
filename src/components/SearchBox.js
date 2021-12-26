import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SearchBox({onChangeText}) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={22} color="black" />
      <TextInput
        style={{flex: 1}}
        placeholder="Search"
        onChangeText={text => onChangeText(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    margin: 10,
    borderRadius: 10,
  },
});
