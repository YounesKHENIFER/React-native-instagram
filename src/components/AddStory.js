import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useTheme} from '@react-navigation/native';

const AddStory = ({name, picture}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Camera')}>
      <View style={styles.circle}>
        <Image
          style={[styles.image, {borderColor: colors.background}]}
          source={{uri: picture}}
        />
      </View>
      <View>
        <Text style={styles.name} circle>
          {name}
        </Text>
      </View>
      <View style={styles.plus}>
        <AntDesign name="pluscircle" size={19} color="#3976ff" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 4,
    position: 'relative',
  },
  circle: {
    height: 68,
    width: 68,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 64,
    width: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  name: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: '400',
    color: 'black',
  },
  plus: {
    borderColor: 'white',
    borderWidth: 1,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 50,
    bottom: 25,
    right: 5,
  },
});

export default AddStory;
