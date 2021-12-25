import React, {useState} from 'react';

import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

export default function Post({
  username,
  profilePicture,
  postImage,
  likes,
  description,
}) {
  return (
    <View style={s.container}>
      <Header username={username} profilePicture={profilePicture} />
      <PostImage image={postImage} />
      <Footer />
      <Description
        username={username}
        likes={likes}
        description={description}
      />
    </View>
  );
}

function Header({username, profilePicture}) {
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
          <Text style={s.name} circle numberOfLines={1}>
            {username}
          </Text>
        </View>
      </View>
      <TouchableOpacity>
        <Feather name="more-vertical" size={25} color="black" />
      </TouchableOpacity>
    </View>
  );
}

function PostImage({image}) {
  return (
    <View style={s.imageBox}>
      <Image source={{uri: image}} resizeMode="contain" style={s.image} />
    </View>
  );
}

function Footer() {
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
              color={liked ? 'red' : 'black'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={s.btn} onPress={() => {}}>
            <AntDesign name="message1" size={25} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={s.btn} onPress={() => {}}>
            <Feather name="send" size={25} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={s.btn}
          onPress={() => setBookmarked(!bookmarked)}>
          <Ionicons
            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={25}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Description({likes, description, username}) {
  const [nlines, setNlines] = useState(true);
  return (
    <View style={{paddingHorizontal: 10}}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 15,
          color: 'black',
        }}>
        {likes} Likes
      </Text>
      <Text style={s.name}>{username}</Text>
      <Text
        style={{
          color: 'black',
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
              color: 'black',
            }}>
            See {nlines ? 'More' : 'Less'}
          </Text>
        </TouchableOpacity>
      )}
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
    backgroundColor: '#c90873',
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
    color: 'black',
  },
  imageBox: {
    height: 350,
    backgroundColor: '#eee',
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
