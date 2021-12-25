import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/Instagram-logo-transparent-PNG.png')}
      />
      <View style={{alignItems: 'center'}}>
        <Text style={styles.author}>From</Text>
        <Text style={styles.text}>YOUNES KHENIFER</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 250,
    paddingBottom: 100,
  },
  image: {
    width: 120,
    height: 120,
  },
  text: {
    color: '#E1306C',
    fontSize: 20,
    fontWeight: '200',
  },
  author: {
    color: 'black',
    fontWeight: '300',
    fontSize: 15,
    marginTop: 5,
  },
});
