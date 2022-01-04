import React from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Post from './Post';

export default function PostModal({setModal, modal, post}) {
  const {colors} = useTheme();

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modal}
      onRequestClose={() => {
        setModal(false);
      }}>
      <View style={styles.container}>
        <View style={[styles.content, {backgroundColor: colors.background}]}>
          <Post item={post} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2021246d',
  },
  content: {
    paddingVertical: 5,
    borderRadius: 20,
    width: '80%',
  },
});
