import React from 'react';

import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '@react-navigation/native';

const Story = props => {
  const {colors} = useTheme();
  const {username, profilePicture, navigation} = props;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push('Story', {
          props: props,
        })
      }
      style={styles.container}
      activeOpacity={0.9}>
      <LinearGradient
        colors={['#CA1D7E', '#E35157', '#F2703F']}
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 1.0}}
        style={styles.circle}>
        <Image
          source={{uri: profilePicture}}
          style={[styles.image, {borderColor: colors.background}]}
        />
      </LinearGradient>

      <View style={{width: 70}}>
        <Text
          style={[styles.name, {color: colors.text}]}
          circle
          numberOfLines={1}>
          {username}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 4,
  },
  circle: {
    height: 68,
    width: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 64,
    width: 64,
    borderRadius: 32,
    alignSelf: 'center',
    borderWidth: 2,
  },
  name: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: '400',
    color: 'black',
  },
});

export default Story;
