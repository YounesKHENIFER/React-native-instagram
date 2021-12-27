import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';

export default function Separator({height}) {
  const {colors} = useTheme();

  return (
    <View
      style={{
        marginVertical: 3,
        height: height || 0.4,
        backgroundColor: colors.text,
      }}
    />
  );
}
