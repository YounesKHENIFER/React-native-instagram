import React, {useState} from 'react';

import {Text, View, StyleSheet, Image, ActivityIndicator} from 'react-native';
import {useTheme} from '@react-navigation/native';

import openGallery from '../utils/openGallery';
import Feather from 'react-native-vector-icons/Feather';
import Input from '../components/Input';
import Btn from '../components/Btn';
import firestore from '@react-native-firebase/firestore';
import useAuth from '../context/useAuth';

export default function AddPost({navigation}) {
  const {colors} = useTheme();
  const {user} = useAuth();
  const [postImage, setPostImage] = useState(null);
  const [description, setDescription] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState('');
  function Errmsg(err) {
    setError(err);
    return setTimeout(() => {
      setError('');
    }, 2000);
  }
  function handlePost() {
    if (postImage) {
      firestore()
        .collection('Posts')
        .add({
          userId: user.uid,
          description: description,
          postImage: postImage,
          type: 'image',
          createdAt: firestore.FieldValue.serverTimestamp(),
        })
        .then(() => navigation.navigate('MainApp'))
        .catch(e => Errmsg(e.message));
    }
  }
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {/* image Select */}
      {imageLoading ? (
        <View style={styles.icon}>
          <ActivityIndicator color={colors.text} size="large" />
        </View>
      ) : (
        <>
          {postImage ? (
            <Image
              source={{uri: postImage}}
              style={[
                styles.postImage,
                {backgroundColor: colors.inputBackground},
              ]}
            />
          ) : (
            <View
              style={[
                styles.postImage,
                {backgroundColor: colors.inputBackground},
              ]}>
              <Feather
                name="image"
                size={100}
                color={colors.text}
                onPress={() =>
                  openGallery(
                    null,
                    null,
                    'images/posts',
                    setImageLoading,
                    setPostImage,
                  )
                }
              />
            </View>
          )}
        </>
      )}

      {/* description */}
      <Text style={[styles.text, {color: colors.text}]}>
        Post Description :
      </Text>
      <Input
        Mystyles={styles.input}
        multiline={true}
        onChangeText={setDescription}
      />
      <Btn
        onPress={() => handlePost()}
        title="POST"
        btnStyle={{width: '80%'}}
        disabled={!postImage}
      />
      {error ? <ErrorMsg error={error} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: 150,
    borderRadius: 75,
    margin: 20,
  },
  input: {
    height: 80,
    width: '80%',
    justifyContent: 'flex-start',
  },
  text: {
    width: '80%',
    fontSize: 16,
  },
  postImage: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    width: 300,
    borderRadius: 10,
    margin: 20,
  },
});
