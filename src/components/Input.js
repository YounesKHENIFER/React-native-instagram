import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

const Input = ({
  onChangeText,
  placeholder,
  Mystyles,
  value,
  secure,
  multiline,
}) => {
  const {colors} = useTheme();

  return (
    <TextInput
      value={value}
      style={[
        styles.input,
        {color: colors.text, backgroundColor: colors.inputBackground},
        Mystyles,
      ]}
      placeholderTextColor={colors.inputPlaceholder}
      placeholder={placeholder}
      onChangeText={onChangeText}
      secureTextEntry={secure}
      multiline={multiline}
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
  },
});
