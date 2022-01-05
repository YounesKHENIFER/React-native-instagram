import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Modal,
  Image,
  ActivityIndicator,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import firestore from '@react-native-firebase/firestore';

import useAuth from '../context/useAuth';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Camera({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({swipeEnabled: true});
  }, [navigation]);

  const [CT, setCT] = useState(false);
  const [modal, setModal] = useState(false);
  const [URI, setUri] = useState();
  const [loading, setLoading] = useState(false);
  const [{cameraRef}, {takePicture}] = useCamera();

  //   capture functionality
  async function handleTakePicture() {
    setLoading(true);
    const data = await takePicture();
    setUri(data.uri);
    setLoading(false);
    setModal(true);
  }

  async function useGallery() {
    try {
      const image = await ImagePicker.openPicker({});
      setUri(image.path);
      setModal(true);
    } catch (error) {
      console.log('image from gallery : ', error.message);
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <RNCamera
        ref={cameraRef}
        type={CT ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back}
        captureAudio={false}
        style={styles.camera}>
        <View style={styles.inside}>
          {/* top section */}
          <View style={[styles.row, {width: '100%'}]}>
            <Ionicons name="settings-sharp" color="white" size={25} />
            <Ionicons name="flash-off" color="white" size={25} />
            <Ionicons
              name="close"
              color="white"
              size={30}
              onPress={() => navigation.goBack()}
            />
          </View>
          {loading && (
            <View style={styles.indicator}>
              <ActivityIndicator size="large" color="gray" />
            </View>
          )}
          {/* bottom section */}
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.btnBox}
              onPress={handleTakePicture}
              disabled={loading}>
              <View style={styles.btn} />
            </TouchableOpacity>
          </View>
        </View>
      </RNCamera>
      {/* footer */}
      <View style={styles.footer}>
        <Ionicons onPress={useGallery} name="image" size={40} color="white" />
        <Text style={styles.text}>Story</Text>
        <Ionicons
          name="camera-reverse"
          color="white"
          size={40}
          onPress={() => setCT(!CT)}
        />
      </View>
      <AddStoryModal
        modal={modal}
        setModal={setModal}
        image={URI}
        navigation={navigation}
      />
    </View>
  );
}

function AddStoryModal({modal, setModal, image, navigation}) {
  const {colors} = useTheme();
  const {user} = useAuth();
  const [uploading, setUploading] = useState(false);

  //   handle saving story
  async function handlePostStory() {
    try {
      setUploading(true);
      // getting the image name and add date to make it unique
      let filename = image.substring(image.lastIndexOf('/') + 1);
      const extention = filename.split('.').pop();
      const name = filename.split('.').slice(0, -1).join('.');
      filename = name + Date.now() + '.' + extention;

      // uploading image to storage
      const storageRef = storage().ref(`images/stories/${filename}`);
      await storageRef.putFile(image);
      const url = await storageRef.getDownloadURL();

      //   saving the story in firebase (each user can save only one storie and the new story will replace older one)
      firestore()
        .collection('Stories')
        .doc(user.uid)
        .set({
          userId: user.uid,
          story: url,
          type: 'image',
          createdAt: firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          setUploading(false);
          navigation.navigate('Home');
        })
        .catch(e => console.log('saving story:', e.message));
    } catch (e) {
      console.log('upload stroy', e.message);
    }
  }
  return (
    <Modal
      animationType="slide"
      transparent
      visible={modal}
      onRequestClose={() => setModal(false)}>
      <View
        style={[styles.modalContainer, {backgroundColor: colors.background}]}>
        {/* header */}
        <View style={styles.header}>
          <Text style={[styles.title, {color: colors.text}]}>ADD Story</Text>
          <Ionicons
            name="close"
            size={30}
            color="red"
            onPress={() => setModal(false)}
          />
        </View>
        {/* main image */}
        <View
          style={[
            styles.imageBox,
            {
              backgroundColor: colors.inputBackground,
            },
          ]}>
          <Image
            style={[
              styles.imageBox,
              {
                backgroundColor: colors.inputBackground,
              },
            ]}
            source={{uri: image}}
          />
          {uploading && (
            <View style={styles.indicator}>
              <ActivityIndicator size="large" color="gray" />
            </View>
          )}
        </View>
        {/* footer */}
        <View
          style={{height: 100, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            disabled={uploading}
            style={[
              styles.sendBtn,
              {
                backgroundColor: colors.inputBackground,
              },
            ]}
            onPress={handlePostStory}>
            <Text style={{fontSize: 16, color: colors.text, marginRight: 10}}>
              Post To Story
            </Text>
            <Ionicons
              name="send"
              size={20}
              color={colors.text}
              onPress={() => setModal(false)}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  indicator: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  sendBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  modalContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  imageBox: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  inside: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  btnBox: {
    backgroundColor: '#ccc',
    height: 75,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 75 / 2,
  },
  btn: {
    backgroundColor: '#eee',
    height: 70,
    width: 70,
    borderRadius: 70 / 2,
    borderColor: '#333',
    borderWidth: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 120,
    width: '100%',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
    color: 'white',
    letterSpacing: 1,
  },
  imagesBox: {
    width: 40,
    height: 40,
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
});
