import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function EmptyList({item}) {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '500',
          color: colors.text,
        }}>
        There Is No {item}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
