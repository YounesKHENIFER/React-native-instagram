import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ErrorMsg = ({error}) => {
  return (
    <View style={styles.error}>
      <Text style={{fontSize: 15, color: '#f13022'}}>{error}</Text>
    </View>
  );
};

export default ErrorMsg;

const styles = StyleSheet.create({
  error: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
});
