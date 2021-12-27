import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Sperator from './Sperator';
export default function AddBox({setBoxModal, boxModal}) {
  const {colors} = useTheme();
  const navigation = useNavigation();
  function Navigate(TO) {
    setBoxModal(false);
    navigation.navigate(TO);
  }
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={boxModal}
      onRequestClose={() => setBoxModal(false)}>
      <TouchableWithoutFeedback onPress={() => setBoxModal(false)}>
        <View style={styles.modalContainer}>
          <View
            style={[styles.container, {backgroundColor: colors.background}]}>
            <TouchableOpacity
              onPress={() => Navigate('AddPost')}
              style={[styles.textBox, {backgroundColor: colors.background}]}>
              <Text style={[styles.text, {color: colors.text}]}>Post</Text>
              <MaterialCommunityIcons
                name="grid"
                color={colors.text}
                size={22}
              />
            </TouchableOpacity>
            <Sperator />
            <TouchableOpacity
              onPress={() => Navigate('Camera')}
              style={[styles.textBox, {backgroundColor: colors.background}]}>
              <Text style={[styles.text, {color: colors.text}]}>Story</Text>
              <MaterialCommunityIcons
                name="history"
                color={colors.text}
                size={25}
              />
            </TouchableOpacity>
            <Sperator />
            <TouchableOpacity
              onPress={() => Navigate('AddPost')}
              style={[styles.textBox, {backgroundColor: colors.background}]}>
              <Text style={[styles.text, {color: colors.text}]}>Reel</Text>
              <MaterialCommunityIcons
                name="animation-play-outline"
                color={colors.text}
                size={25}
              />
            </TouchableOpacity>
            <Sperator height={0.3} />
            <TouchableOpacity
              style={[styles.textBox, {backgroundColor: colors.background}]}>
              <Text style={[styles.text, {color: colors.text}]}>Live</Text>
              <MaterialCommunityIcons
                name="video-wireless-outline"
                color={colors.text}
                size={25}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  container: {
    paddingVertical: 10,
    marginTop: 60,
    marginRight: 20,
    borderRadius: 10,
    elevation: 20,
    alignSelf: 'flex-start',
  },
  textBox: {
    width: 130,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  text: {
    fontSize: 15,
  },
});
