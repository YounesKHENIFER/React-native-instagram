import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import {useNavigation, useTheme} from '@react-navigation/native';
import useAuth from '../context/useAuth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import SingleComment from './SingleComment';

export default function Post({item}) {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const {user} = useAuth();
  const {userId, postImage, description, createdAt, postId} = item;
  const [likes, setLikes] = useState([]);
  const [lastComment, setLastComment] = useState(null);
  const [likedPost, setLikedPost] = useState(null);
  const [postuser, setPostUser] = useState(null);
  //   get post user informations
  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(userId)
      .get()
      .then(user => {
        setPostUser(user.data());
      })
      .catch(e => console.log('Getting Posts Error :', e.message));
  }, []);

  //   post like real time listener
  function onResult(res, set) {
    let tmp = [];
    res.forEach(item => tmp.push(item.id));
    set(tmp);
    setLikedPost(tmp.includes(user.uid));
  }

  function onErr(e) {
    console.log(e.message);
  }
  //  real time listener for likes & comments
  useEffect(
    () =>
      firestore()
        .collection('Posts')
        .doc(postId)
        .collection('Likes')
        .onSnapshot(res => {
          onResult(res, setLikes);
        }, onErr),

    [],
  );
  useEffect(
    () =>
      firestore()
        .collection('Posts')
        .doc(postId)
        .collection('Comments')
        .orderBy('createdAt', 'desc')
        .limit(1)
        .onSnapshot(res => {
          setLastComment(res?.docs[0]?.data());
        }, onErr),

    [],
  );

  //   handle navigation to user profile
  function navigateToUser() {
    if (postuser.uid === user.uid) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('User', {
        userId: postuser.uid,
        username: postuser.username,
      });
    }
  }
  return (
    <View style={styles.container}>
      <Header
        colors={colors}
        username={postuser?.username}
        profilePicture={postuser?.profilePicture}
        navigateToUser={navigateToUser}
      />
      <PostImage colors={colors} image={postImage} />
      <Footer
        colors={colors}
        userId={user.uid}
        postId={postId}
        likedPost={likedPost}
        setLikedPost={setLikedPost}
        navigation={navigation}
      />
      <Description
        colors={colors}
        username={postuser?.username}
        likes={likes}
        description={description}
        createdAt={createdAt}
        navigateToUser={navigateToUser}
      />
      <Comments lastComment={lastComment} colors={colors} />
    </View>
  );
}

function Header({profilePicture, username, colors, navigateToUser}) {
  return (
    <View style={styles.header}>
      <TouchableWithoutFeedback onPress={() => navigateToUser()}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Image
              style={styles.profile}
              source={{
                uri: profilePicture,
              }}
            />
          </View>
          <View>
            <Text
              style={[
                styles.name,
                {
                  color: colors.text,
                },
              ]}
              circle
              numberOfLines={1}>
              {username}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <Feather name="more-vertical" size={25} color={colors.text} />
    </View>
  );
}

function PostImage({image, colors}) {
  return (
    <View style={[styles.imageBox, {backgroundColor: colors.postBack}]}>
      <Image source={{uri: image}} resizeMode="contain" style={styles.image} />
    </View>
  );
}

function Footer({colors, setLikedPost, postId, userId, likedPost, navigation}) {
  const [bookmarked, setBookmarked] = useState(false);
  //   on like functionality
  function onLike() {
    if (!likedPost) {
      setLikedPost(true);
      firestore()
        .collection('Posts')
        .doc(postId)
        .collection('Likes')
        .doc(userId)
        .set({});
    } else {
      setLikedPost(false);
      firestore()
        .collection('Posts')
        .doc(postId)
        .collection('Likes')
        .doc(userId)
        .delete();
    }
  }

  return (
    <View style={styles.footer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <AntDesign
            name={likedPost ? 'heart' : 'hearto'}
            size={25}
            color={likedPost ? 'red' : colors.text}
            style={styles.btn}
            onPress={() => onLike()}
          />

          <AntDesign
            name="message1"
            size={25}
            color={colors.text}
            style={styles.btn}
            onPress={() => navigation.navigate('Comment', {postId: postId})}
          />

          <Feather
            style={styles.btn}
            name="send"
            size={25}
            color={colors.text}
            onPress={() => {}}
          />
        </View>

        <Ionicons
          name={bookmarked ? 'bookmark' : 'bookmark-outline'}
          size={25}
          color={colors.text}
          style={styles.btn}
          onPress={() => setBookmarked(!bookmarked)}
        />
      </View>
    </View>
  );
}

function Description({
  likes,
  description,
  username,
  colors,
  createdAt,
  navigateToUser,
}) {
  const [nlines, setNlines] = useState(true);

  return (
    <View style={{paddingHorizontal: 10}}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 15,
          color: colors.text,
        }}>
        {likes.length} Likes
      </Text>
      <TouchableWithoutFeedback onPress={() => navigateToUser()}>
        <Text
          style={[
            styles.name,
            {
              color: colors.text,
            },
          ]}>
          {username}
        </Text>
      </TouchableWithoutFeedback>
      {description ? (
        <>
          <Text
            style={{
              color: colors.text,
            }}
            numberOfLines={nlines ? 3 : null}>
            {description}
          </Text>
          {description.length > 150 && (
            <TouchableOpacity
              style={{height: 30, justifyContent: 'center'}}
              onPress={() => setNlines(!nlines)}>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 14,
                  color: colors.text,
                }}>
                See {nlines ? 'More' : 'Less'}
              </Text>
            </TouchableOpacity>
          )}
        </>
      ) : null}

      <Text
        style={{
          color: colors.inputPlaceholder,
          fontSize: 12,
        }}>
        {moment(createdAt?.toDate()).fromNow()}
      </Text>
    </View>
  );
}

function Comments({lastComment, colors}) {
  if (lastComment) {
    return (
      <View style={styles.footer}>
        <Text style={{color: colors.text}}>Last Comment :</Text>
        <SingleComment
          userId={lastComment.userId}
          createdAt={lastComment.createdAt}
          comment={lastComment.comment}
        />
      </View>
    );
  } else {
    return null;
  }
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  header: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circle: {
    height: 68,
    width: 68,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    height: 32,
    width: 32,
    backgroundColor: '#eee',
    borderRadius: 16,
    borderWidth: 1.5,
    marginRight: 5,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
  },
  imageBox: {
    height: 350,
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  footer: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  btn: {
    marginRight: 5,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
