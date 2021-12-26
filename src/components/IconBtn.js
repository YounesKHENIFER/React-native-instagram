import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function IconBtn({onPress, btnStyle, txtStyle, title, icon}) {
  const {colors} = useTheme();
  return (
    <TouchableOpacity style={[styles.btn, btnStyle]} onPress={onPress}>
      {icon}
      <Text style={[styles.btntxt, txtStyle, {color: colors.text}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginHorizontal: 15,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  btntxt: {
    color: 'black',
    fontSize: 16,
    marginLeft: 10,
  },
});
