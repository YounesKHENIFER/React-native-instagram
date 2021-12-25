import React from 'react';

import {Text, View, StyleSheet} from 'react-native';

const Camera = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({swipeEnabled: true});
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text style={styles.highlight}>Camera Comming Soon...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  highlight: {
    fontWeight: '500',
    fontSize: 20,
  },
});

export default Camera;
