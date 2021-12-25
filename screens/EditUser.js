import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import Btn from '../components/Btn';
import Input from '../components/Input';
import ErrorMsg from '../components/ErrorMsg';
import useAuth from '../context/useAuth';

import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export default function Edit({setModal, modal}) {
  const {setUser, user} = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName);
  const [username, setUsername] = useState(user?.username);
  const [bio, setBio] = useState(user?.bio);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [profilePic, setProfilePic] = useState(user?.profilePicture);

  // image picker
  const [image, setImage] = useState(null);

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setImage(image.path);
        setProfilePic(image.path);
      })
      .catch(e => {});
  };

  // handleing changes
  function handleSave() {
    if (username) {
      // changing uploading state
      setUploadLoading(true);
      if (image) {
        // getting the image name and add date to make it unique
        let filename = image.substring(image.lastIndexOf('/') + 1);
        const extention = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extention;

        // uploading image to storage
        const storageRef = storage().ref(
          `/images/profilesPictures/${filename}`,
        );
        storageRef
          .putFile(image)
          .then(() =>
            // getting image download url
            storageRef
              .getDownloadURL()
              .then(url => setProfilePic(url))
              .catch(e => console.log('inside url', e.message)),
          )
          .catch(e => console.log('inside upload img', e.message));
      }

      // updating the user's info
      const newUserInfos = {
        username: username,
        profilePicture: profilePic,
        displayName: displayName ?? '',
        bio: bio ?? '',
      };
      firestore()
        .collection('Users')
        .doc(user.uid)
        .update(newUserInfos)
        .then(() => {
          setUser(newUserInfos);
          setModal(false);
        })
        .catch(e => console.log('inside update', e.message));

      // finishing up
      setUploadLoading(false);
      setUser(true);
    } else {
      Errmsg('Username Is Required');
    }
  }

  // handleing Errors
  const [error, setError] = useState('');
  function Errmsg(err) {
    setError(err);
    return setTimeout(() => {
      setError('');
    }, 2000);
  }

  return (
    <Modal
      animationType="slide"
      visible={modal}
      onRequestClose={() => {
        setModal(false);
      }}>
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setModal(false)}>
            <Feather name="x" size={30} color="red" />
          </TouchableOpacity>

          <Text style={styles.title}>Edit Profile</Text>
          <TouchableOpacity onPress={() => handleSave()}>
            <Feather name="check" size={30} color="green" />
          </TouchableOpacity>
        </View>
        {/* body */}
        <View style={styles.imageBox}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => openGallery()}>
            <Image style={styles.image} source={{uri: profilePic}} />
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
            <Text>Saving...</Text>
          )}
          {updated && <Text>Profile Update Success</Text>}
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
    paddingBottom: 120,
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
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  plus: {
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
    borderColor: '#ccc',
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
});
