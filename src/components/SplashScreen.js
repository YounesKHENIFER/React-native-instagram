import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

export default function SplashScreen() {
  const {colors} = useTheme();
  return (
    <View style={[styles.container, {color: colors.background}]}>
      <Image style={styles.image} source={require('../assets/logo.png')} />
      <View style={{alignItems: 'center'}}>
        <Text style={[styles.author, {color: colors.text}]}>From</Text>
        <Text style={styles.text}>YOUNES KHENIFER</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 250,
    paddingBottom: 80,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 250,
  },
  text: {
    color: '#E1306d',
    fontSize: 20,
    fontWeight: '200',
  },
  author: {
    fontWeight: '400',
    fontSize: 15,
    marginTop: 5,
  },
});
