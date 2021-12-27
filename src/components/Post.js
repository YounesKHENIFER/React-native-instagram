import React, {useEffect, useState} from 'react';

import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import {useNavigation, useTheme} from '@react-navigation/native';
import useAuth from '../context/useAuth';
import firestore from '@react-native-firebase/firestore';

export default function Post({item}) {
  const {colors} = useTheme();
  const {user} = useAuth();
  const {userId, postImage, description, createdAt, postId} = item;
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [likedPost, setLikedPost] = useState(likes.includes(user.uid));
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
  }, [userId]);

  //   post like real time listener
  function onLikeResult(res) {
    let tmp = [];
    res.forEach(item => {
      tmp.push(item.id);
    });
    setLikes(tmp);
  }
  function onErr(e) {
    console.log(e.message);
  }
  useEffect(
    () =>
      firestore()
        .collection('Posts')
        .doc(postId)
        .collection('Likes')
        .onSnapshot(onLikeResult, onErr),
    [likedPost],
  );

  function onComResult(res) {
    let tmp = [];
    res.forEach(com => {
      tmp.push({commentId: com.id, ...com.data()});
    });
    setComments(tmp);
  }

  useEffect(
    () =>
      firestore()
        .collection('Posts')
        .doc(postId)
        .collection('Comments')
        .orderBy('createdAt', 'desc')
        .onSnapshot(onComResult, onErr),
    [],
  );

  return (
    <View style={styles.container}>
      <Header
        colors={colors}
        username={postuser?.username}
        profilePicture={postuser?.profilePicture}
      />
      <PostImage colors={colors} image={postImage} />
      <Footer
        colors={colors}
        userId={user.uid}
        postId={postId}
        likedPost={likedPost}
        setLikedPost={setLikedPost}
      />
      <Description
        colors={colors}
        username={postuser?.username}
        likes={likes}
        description={description}
        createdAt={createdAt}
      />
      <Comments comments={comments} />
    </View>
  );
}

function Header({username, profilePicture, colors}) {
  return (
    <View style={styles.header}>
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
      <TouchableOpacity>
        <Feather name="more-vertical" size={25} color={colors.text} />
      </TouchableOpacity>
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

function Footer({colors, setLikedPost, postId, userId, likedPost}) {
  const [bookmarked, setBookmarked] = useState(false);
  const navigation = useNavigation();
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
      console.log('like removed');
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

function Description({likes, description, username, colors, createdAt}) {
  const [nlines, setNlines] = useState(true);
  const date =
    new Date(createdAt._seconds * 1000).toLocaleDateString('en-US') +
    ' ' +
    new Date(createdAt._seconds * 1000).toLocaleTimeString();
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
      <Text
        style={[
          styles.name,
          {
            color: colors.text,
          },
        ]}>
        {username}
      </Text>
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
      <Text
        style={{
          color: colors.inputPlaceholder,
          fontSize: 12,
        }}>
        {date}
      </Text>
    </View>
  );
}

function Comments({comments}) {
  if (comments.length) {
    return (
      <View style={styles.footer}>
        <Text>Comments:</Text>
        <Text>{comments[0].username}</Text>
        <Text>{comments[0].comment}</Text>
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
