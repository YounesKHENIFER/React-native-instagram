import React, {useEffect, useRef, useState} from 'react';

import {
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import openGallery from '../utils/openGallery';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from '../components/Input';
import Btn from '../components/Btn';
import SingleComment from '../components/SingleComment';
import EmptyList from '../components/EmptyList';
import firestore from '@react-native-firebase/firestore';
import useAuth from '../context/useAuth';

export default function Comment({navigation, route}) {
  const {colors} = useTheme();
  const {user} = useAuth();
  const flatListRef = useRef();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  function onComResult(res) {
    let tmp = [];
    res.forEach(com => {
      tmp.push({commentId: com.id, ...com.data()});
    });
    setComments(tmp);
  }
  function onErr(e) {
    console.log(e.message);
  }
  useEffect(
    () =>
      firestore()
        .collection('Posts')
        .doc(route.params.postId)
        .collection('Comments')
        .orderBy('createdAt', 'asc')
        .onSnapshot(onComResult, onErr),
    [],
  );

  function handleComment() {
    if (comment) {
      firestore()
        .collection('Posts')
        .doc(route.params.postId)
        .collection('Comments')
        .add({
          userId: user.uid,
          comment: comment,
          createdAt: firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {})
        .catch(e => console.log(e.message));

      flatListRef.current.scrollToEnd({animating: true});
      setComment('');
    }
  }
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={{flex: 1}}>
        <FlatList
          ref={flatListRef}
          data={comments}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({item}) => (
            <SingleComment
              comment={item.comment}
              userId={item.userId}
              createdAt={item.createdAt}
            />
          )}
          ListEmptyComponent={
            <View style={styles.center}>
              <EmptyList item="Comments" />
            </View>
          }
        />
      </View>

      <View style={styles.row}>
        <Input
          placeholder="Write A Comment Here ...."
          Mystyles={styles.input}
          multiline={true}
          onChangeText={setComment}
          value={comment}
        />
        <Ionicons
          name="send"
          color={colors.text}
          size={20}
          onPress={() => handleComment()}
          style={styles.icon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 15,
    zIndex: 20,
  },
  row: {
    position: 'relative',
    height: 50,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
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
