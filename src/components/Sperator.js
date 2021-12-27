import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';

export default function Sperator({height}) {
  const {colors} = useTheme();

  return (
    <View
      style={{
        marginVertical: 1,
        height: height || 0.4,
        backgroundColor: colors.text,
      }}
    />
  );
}
