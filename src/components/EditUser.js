import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import Btn from './Btn';
import Input from './Input';
import ErrorMsg from './ErrorMsg';
import useAuth from '../context/useAuth';
import openGallery from '../utils/openGallery';

import firestore from '@react-native-firebase/firestore';

import {useTheme} from '@react-navigation/native';

export default function Edit({setEditModal, editModal}) {
  const {user} = useAuth();
  const {colors} = useTheme();
  const [displayName, setDisplayName] = useState(user?.displayName);
  const [username, setUsername] = useState(user?.username);
  const [bio, setBio] = useState(user?.bio);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(user?.profilePicture);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState('');

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

        setEditModal(false);
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
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        {/* header */}
        <View style={styles.header}>
          <Feather
            name="x"
            size={30}
            color="red"
            onPress={() => setEditModal(false)}
          />
          <Text style={[styles.title, {color: colors.text}]}>Edit Profile</Text>
          <Feather
            name="check"
            size={30}
            color="green"
            onPress={() => handleSave()}
          />
        </View>
        {/* body */}
        <View style={styles.imageBox}>
          <TouchableOpacity
            style={styles.image}
            activeOpacity={0.9}
            onPress={() =>
              openGallery(
                500,
                500,
                'images/profilesPictures',
                setImageLoading,
                setProfilePic,
              )
            }>
            {imageLoading ? (
              <ActivityIndicator color={colors.background} size="large" />
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
              <ActivityIndicator color={colors.text} size="large" />
              <Text style={{color: colors.text}}>Saving...</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
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
