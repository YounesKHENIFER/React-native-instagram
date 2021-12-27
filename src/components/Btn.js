import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Btn = ({onPress, btnStyle, txtStyle, title, disabled}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.btn, btnStyle, {opacity: disabled ? 0.5 : 1}]}
      onPress={onPress}
      activeOpacity={0.5}>
      <Text style={[styles.btntxt, txtStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Btn;

const styles = StyleSheet.create({
  btn: {
    marginHorizontal: 15,
    padding: 15,
    backgroundColor: '#217ac1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btntxt: {
    color: 'white',
  },
});
