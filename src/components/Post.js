import React, {useEffect, useState} from 'react';

import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import {useTheme} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

export default function Post({item}) {
  const {userId, postImage, description, createdAt} = item;
  const [likes, setLikes] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(userId)
      .get()
      .then(user => {
        setUser(user.data());
      })
      .catch(e => console.log('Getting Posts Error :', e.message));
  }, [userId]);

  const {colors} = useTheme();
  return (
    <View style={s.container}>
      <Header
        colors={colors}
        username={user?.username}
        profilePicture={user?.profilePicture}
      />
      <PostImage colors={colors} image={postImage} />
      <Footer colors={colors} />
      <Description
        colors={colors}
        username={user?.username}
        likes={likes}
        description={description}
        createdAt={createdAt}
      />
    </View>
  );
}

function Header({username, profilePicture, colors}) {
  return (
    <View style={s.header}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View>
          <Image
            style={s.profile}
            source={{
              uri: profilePicture,
            }}
          />
        </View>
        <View>
          <Text
            style={[
              s.name,
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
    <View style={[s.imageBox, {backgroundColor: colors.postBack}]}>
      <Image source={{uri: image}} resizeMode="contain" style={s.image} />
    </View>
  );
}

function Footer({colors}) {
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  return (
    <View style={s.footer}>
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
          <TouchableOpacity style={s.btn} onPress={() => setLiked(!liked)}>
            <AntDesign
              name={liked ? 'heart' : 'hearto'}
              size={25}
              color={liked ? 'red' : colors.text}
            />
          </TouchableOpacity>

          <TouchableOpacity style={s.btn} onPress={() => {}}>
            <AntDesign name="message1" size={25} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity style={s.btn} onPress={() => {}}>
            <Feather name="send" size={25} color={colors.text} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={s.btn}
          onPress={() => setBookmarked(!bookmarked)}>
          <Ionicons
            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={25}
            color={colors.text}
          />
        </TouchableOpacity>
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
          s.name,
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

const s = StyleSheet.create({
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
