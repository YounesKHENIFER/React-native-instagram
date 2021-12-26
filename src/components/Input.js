import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const Input = ({onChangeText, placeholder, Mystyles, value, secure}) => {
  return (
    <TextInput
      value={value}
      style={[styles.input, Mystyles]}
      placeholder={placeholder}
      onChangeText={onChangeText}
      secureTextEntry={secure}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 15,
    paddingHorizontal: 20,
    backgroundColor: '#eee',
  },
});
