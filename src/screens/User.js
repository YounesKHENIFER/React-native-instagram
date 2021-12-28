import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  Switch,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import useAuth from '../context/useAuth';
import Btn from '../components/Btn';

import {useTheme} from '@react-navigation/native';

import ProfileNavigation from '../components/ProfileNavigation';
import ProfileHeader from '../components/ProfileHeader';

export default function User({navigation, route}) {
  const {user} = useAuth();
  const {colors} = useTheme();
  const [userProfile, setUserProfile] = useState();
  const [posts, setPosts] = useState([]);

  // set the screen title as user's username and check if user is the logged.in user
  useEffect(() => {
    if (route.params.userId === user.uid) {
      navigation.navigate('Profile');
    } else {
      navigation.setOptions({headerTitle: route.params.username});
    }
  }, []);

  //   getting user information and his posts
  function getPosts() {
    firestore()
      .collection('Posts')
      .where('userId', '==', route.params.userId)
      .get()
      .then(res => {
        let tmp = [];
        res.forEach(post => {
          tmp.push({id: post.id, ...post.data()});
        });
        setPosts(tmp);
      })
      .catch(e => console.log('Getting Posts Error :', e.message));
  }
  function getUser() {
    firestore()
      .collection('Users')
      .doc(route.params.userId)
      .get()
      .then(user => {
        setUserProfile(user.data());
      })
      .catch(e => console.log('Getting User Error :', e.message));
  }

  useEffect(() => {
    getUser();
    getPosts();
  }, [route.params.userId]);

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View>
        <ProfileHeader profileUser={userProfile} postsLength={posts.length} />
      </View>
      <ProfileNavigation posts={posts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    alignItems: 'center',
    marginLeft: 20,
  },
  text: {
    marginLeft: 10,
    fontSize: 17,
  },
  icon: {
    marginLeft: 10,
  },
  profile: {
    height: 95,
    width: 95,
    borderRadius: 95 / 2,
  },
  number: {
    fontWeight: '600',
    fontSize: 18,
  },
  highlightes: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  circle: {
    height: 70,
    width: 70,
    borderRadius: 70 / 2,
    backgroundColor: '#eee',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  modalContainer: {
    backgroundColor: '#2021244d',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  modalClose: {
    width: 40,
    height: 4,
    borderRadius: 5,
    alignSelf: 'center',
  },
});
