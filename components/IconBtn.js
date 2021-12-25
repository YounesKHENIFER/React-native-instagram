import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function IconBtn({onPress, btnStyle, txtStyle, title, icon}) {
  return (
    <TouchableOpacity style={[styles.btn, btnStyle]} onPress={onPress}>
      {icon}
      <Text style={[styles.btntxt, txtStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  btntxt: {
    color: 'black',
    fontSize: 20,
    marginLeft: 10,
  },
});
