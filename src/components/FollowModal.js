import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import useAuth from '../context/useAuth';
import {useTheme} from '@react-navigation/native';
import {FlatList} from 'react-native';
import SmallUser from './SmallUser';
import EmptyList from './EmptyList';

export default function FollowModal({setModel, Model, title, data}) {
  const {user} = useAuth();
  const {colors} = useTheme();

  return (
    <Modal
      animationType="slide"
      visible={Model}
      onRequestClose={() => {
        setModel(false);
      }}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        {/* header */}
        <View style={styles.header}>
          <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
          <TouchableOpacity onPress={() => setModel(false)}>
            <Feather name="x" size={30} color="red" />
          </TouchableOpacity>
        </View>
        <FlatList
          bounces={true}
          data={data}
          keyExtractor={(item, i) => i}
          renderItem={({item}) => <SmallUser uid={item} />}
          ListEmptyComponent={
            <View style={styles.center}>
              <EmptyList item={title} />
            </View>
          }
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 80,
  },
  header: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  imageBox: {
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  plus: {
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
    borderColor: 'gray',
    borderWidth: 1,
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 5,
    right: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
  },
  saving: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
