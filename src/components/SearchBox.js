import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {useTheme} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SearchBox({onChangeText, focused, onPress}) {
  const {colors} = useTheme();
  return (
    <View style={{padding: 10, width: '100%'}}>
      <View
        style={[styles.container, {backgroundColor: colors.inputBackground}]}>
        <Ionicons name="search-outline" size={22} color={colors.text} />
        <TextInput
          style={{flex: 1, color: colors.text, width: '100%'}}
          placeholderTextColor={colors.text}
          placeholder="Search"
          onChangeText={text => onChangeText(text)}
          autoFocus={focused}
          onPressIn={onPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
  },
});
