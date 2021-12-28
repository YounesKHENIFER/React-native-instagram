import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

import Post from '../components/Post';
import {ActivityIndicator, View} from 'react-native';

export default function SinglePost({navigation, route}) {
  const [post, setPost] = useState();
  useEffect(() => {
    firestore()
      .collection('Posts')
      .doc(route.params.postId)
      .get()
      .then(res => {
        setPost(res.data());
      })
      .catch(e => console.log('Getting Posts Error :', e.message));
  }, [route.params.postId]);
  return !post ? (
    <View
      style={{
        height: '100%',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" color="gray" />
    </View>
  ) : (
    <Post item={post} />
  );
}
