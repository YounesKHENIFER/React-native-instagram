import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {useTheme} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SearchBox({onChangeText}) {
  const {colors} = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Ionicons name="search-outline" size={22} color={colors.text} />
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    margin: 10,
    borderRadius: 10,
  },
});
