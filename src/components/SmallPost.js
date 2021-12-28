import React, {useState} from 'react';
import {StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PostModal from './PostModal';

export default function SmallPost({post}) {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.container}
        onLongPress={() => setModal(true)}
        onPressOut={() => setModal(false)}
        onPress={() => navigation.push('SinglePost', {postId: post.id})}>
        <Image style={styles.image} source={{uri: post.postImage}} />
      </TouchableOpacity>
      <PostModal post={post} modal={modal} setModal={setModal} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    height: Dimensions.get('window').width / 3 - 5,
    width: Dimensions.get('window').width / 3 - 5,
    margin: 2,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
