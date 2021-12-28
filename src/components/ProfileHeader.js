import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useEffect} from 'react';

import firestore from '@react-native-firebase/firestore';
import FollowModal from '../components/FollowModal';
import Btn from './Btn';
import useAuth from '../context/useAuth';

export default function ProfileHeader({profileUser, postsLength}) {
  const {user} = useAuth();
  const navigation = useNavigation();
  const {colors} = useTheme();
  const [Model, setModel] = useState(false);
  const [screen, setScreen] = useState('');

  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  function onResult(res, set) {
    let tmp = [];
    res.forEach(item => {
      tmp.push(item.id);
    });
    set(tmp);
  }
  // getting followers & following & posts
  function getItem(item, setItem) {
    firestore()
      .collection('Users')
      .doc(profileUser?.uid)
      .collection(item)
      .get()
      .then(res => {
        onResult(res.docs, setItem);
      })
      .catch(e => console.log('Getting Following Error :', e.message));
  }
  function getPosts() {
    if (profileUser)
      firestore()
        .collection('Posts')
        .where('userId', '==', profileUser?.uid)
        .get()
        .then(res => {
          onResult(res.docs, setPosts);
        })
        .catch(e => console.log('Getting Posts Error :', e.message));
  }
  useEffect(() => {
    getItem('Followers', setFollowers);
    getItem('Following', setFollowing);
    getPosts();
  }, [profileUser]);

  //   logged user follow functionality
  function addFollow(from, target, doc) {
    firestore()
      .collection('Users')
      .doc(from)
      .collection(doc)
      .doc(target)
      .set({})
      .then(_ => setIsFollowing(true))
      .catch(e => console.log('adding Following Error :', e.message));
  }
  function removeFollow(from, target, doc) {
    firestore()
      .collection('Users')
      .doc(from)
      .collection(doc)
      .doc(target)
      .delete()
      .then(_ => setIsFollowing(false))
      .catch(e => console.log('deleting Following Error :', e.message));
  }
  function unFollow() {
    removeFollow(profileUser?.uid, user.uid, 'Followers');
    removeFollow(user.uid, profileUser?.uid, 'Following');
  }
  function Follow() {
    addFollow(profileUser?.uid, user.uid, 'Followers');
    addFollow(user.uid, profileUser?.uid, 'Following');
  }
  useEffect(() => setIsFollowing(followers.includes(user.uid)), [followers]);

  return (
    <View>
      <View
        style={[
          styles.row,
          {justifyContent: 'space-between', paddingHorizontal: 20},
        ]}>
        <Image
          style={styles.profile}
          source={{uri: profileUser?.profilePicture}}
        />
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.column}
            onPress={() => navigation.navigate('Posts')}>
            <Text style={[styles.number, {color: colors.text}]}>
              {postsLength}
            </Text>
            <Text style={{color: colors.text}}>Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.column}
            onPress={() => {
              setScreen('Followers');
              setModel(true);
            }}>
            <Text style={[styles.number, {color: colors.text}]}>
              {followers.length}
            </Text>
            <Text style={{color: colors.text}}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.column}
            onPress={() => {
              setScreen('Following');
              setModel(true);
            }}>
            <Text style={[styles.number, {color: colors.text}]}>
              {following.length}
            </Text>
            <Text style={{color: colors.text}}>Following</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginHorizontal: 20, marginVertical: 10}}>
        <Text style={{color: colors.text}}>{user?.displayName}</Text>
        <Text style={{color: colors.text}}>Bio : {user?.bio}</Text>
      </View>
      {profileUser?.uid !== user?.uid && (
        <Btn
          title={isFollowing ? 'Unfollow' : 'Follow'}
          btnStyle={{
            padding: 5,
            backgroundColor: isFollowing ? 'red' : '#217ac1',
          }}
          txtStyle={{
            fontWeight: '600',
          }}
          onPress={() => (isFollowing ? unFollow() : Follow())}
        />
      )}
      <FollowModal
        setModel={setModel}
        Model={Model}
        title={screen}
        data={screen === 'Following' ? following : followers}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    alignItems: 'center',
    padding: 5,
    marginLeft: 10,
  },
  text: {
    marginLeft: 10,
    fontSize: 17,
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
});
