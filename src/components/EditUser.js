import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import Btn from './Btn';
import Input from './Input';
import ErrorMsg from './ErrorMsg';
import useAuth from '../context/useAuth';

import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export default function Edit({setEditModal, editModal}) {
  const {user} = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName);
  const [username, setUsername] = useState(user?.username);
  const [bio, setBio] = useState(user?.bio);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(user?.profilePicture);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState('');

  //   image picker
  async function openGallery() {
    try {
      const image = await ImagePicker.openPicker({
        width: 500,
        height: 500,
        cropping: true,
      });

      // getting the image name and add date to make it unique
      let filename = image.path.substring(image.path.lastIndexOf('/') + 1);
      const extention = filename.split('.').pop();
      const name = filename.split('.').slice(0, -1).join('.');
      filename = name + Date.now() + '.' + extention;

      // uploading image to storage
      const storageRef = storage().ref(`/images/profilesPictures/${filename}`);
      setImageLoading(true);
      await storageRef.putFile(image.path);
      // getting image download url
      const url = await storageRef.getDownloadURL();
      setProfilePic(url);
      setImageLoading(false);
    } catch (error) {
      console.log('image uplod : ', error.message);
    }
  }

  // handleing changes
  async function handleSave() {
    if (username) {
      // changing uploading state
      setUploadLoading(true);
      let newUserInfos = {
        username: username,
        profilePicture: profilePic,
        displayName: displayName ?? '',
        bio: bio ?? '',
      };
      try {
        await firestore()
          .collection('Users')
          .doc(user.uid)
          .update(newUserInfos);

        setModal(false);
      } catch (error) {
        console.log('inside update', error.message);
      }

      // finishing up
      setUploadLoading(false);
    } else {
      Errmsg('Username Is Required');
    }
  }

  // handleing Errors
  function Errmsg(err) {
    setError(err);
    return setTimeout(() => {
      setError('');
    }, 2000);
  }

  return (
    <Modal
      animationType="slide"
      visible={editModal}
      onRequestClose={() => {
        setEditModal(false);
      }}>
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setEditModal(false)}>
            <Feather name="x" size={30} color="red" />
          </TouchableOpacity>

          <Text style={styles.title}>Edit Profile</Text>
          <TouchableOpacity onPress={() => handleSave()}>
            <Feather name="check" size={30} color="green" />
          </TouchableOpacity>
        </View>
        {/* body */}
        <View style={styles.imageBox}>
          <TouchableOpacity
            style={styles.image}
            activeOpacity={0.9}
            onPress={() => openGallery()}>
            {imageLoading ? (
              <ActivityIndicator color="#ccc" size="large" />
            ) : (
              <Image style={styles.image} source={{uri: profilePic}} />
            )}
            <View style={styles.plus}>
              <Feather name="camera" size={24} color="gray" />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Input
            placeholder="Name"
            value={displayName}
            onChangeText={setDisplayName}
          />
          <Input
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <Input placeholder="Bio" value={bio} onChangeText={setBio} />
          {error ? <ErrorMsg error={error} /> : null}
          {!uploadLoading ? (
            <Btn onPress={() => handleSave()} title="SAVE" />
          ) : (
            <View style={styles.saving}>
              <ActivityIndicator color="#ccc" size="large" />
              <Text>Saving...</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 120,
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
    backgroundColor: '#eee',
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
    color: 'black',
  },
  saving: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
