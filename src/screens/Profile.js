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

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useTheme} from '@react-navigation/native';

import useAuth from '../context/useAuth';
import EditUser from '../components/EditUser';
import Btn from '../components/Btn';
import IconBtn from '../components/IconBtn';
import useToggleTheme from '../context/useToggleTheme';
import AddBox from '../components/AddBox';
import ProfileNavigation from '../components/ProfileNavigation';
import ProfileHeader from '../components/ProfileHeader';

export default function Profile({navigation}) {
  const {user} = useAuth();
  const {colors} = useTheme();
  const [editModal, setEditModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  //   getting user posts
  function getPosts() {
    firestore()
      .collection('Posts')
      .where('userId', '==', user.uid)
      .get()
      .then(res => {
        let tmp = [];
        res.forEach(post => {
          tmp.push({id: post.id, ...post.data()});
        });
        setPosts(tmp);
        setLoading(false);
      })
      .catch(e => console.log('Getting Posts Error :', e.message));
  }

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Header colors={colors} navigation={navigation} user={user} />
      <Informations
        colors={colors}
        navigation={navigation}
        user={user}
        setEditModal={setEditModal}
        postsLength={posts.length}
      />

      <ProfileNavigation posts={posts} loading={loading} />
      <EditUser
        setEditModal={setEditModal}
        editModal={editModal}
        navigation={navigation}
        colors={colors}
      />
    </View>
  );
}

function Header({colors, navigation, user}) {
  const {isDark, setIsDark} = useToggleTheme();
  const [modalVisible, setModelVisible] = useState(false);
  const [boxModal, setBoxModal] = useState(false);

  return (
    <View style={styles.header}>
      <View style={styles.row}>
        <Feather name="lock" size={20} color={colors.text} />
        <Text style={[styles.text, {color: colors.text}]}>
          {user?.username}
        </Text>
      </View>
      <View style={styles.row}>
        <MaterialCommunityIcons
          name="theme-light-dark"
          size={25}
          style={styles.icon}
          color={colors.text}
        />
        <Switch
          trackColor={{false: '#7675', true: '#ccc'}}
          thumbColor={isDark ? '#f4f3f4' : '#767577'}
          onValueChange={() => setIsDark(!isDark)}
          value={isDark}
        />

        <Feather
          name="plus-square"
          size={25}
          style={styles.icon}
          color={colors.text}
          onPress={() => setBoxModal(true)}
        />

        <Feather
          name="menu"
          size={25}
          style={styles.icon}
          color={colors.text}
          onPress={() => setModelVisible(true)}
        />
      </View>
      <MyModal
        colors={colors}
        modalVisible={modalVisible}
        setModelVisible={setModelVisible}
      />
      <AddBox boxModal={boxModal} setBoxModal={setBoxModal} />
    </View>
  );
}

function Informations({user, setEditModal, colors, postsLength}) {
  return (
    <View>
      <ProfileHeader profileUser={user} postsLength={postsLength} />
      <Btn
        title="Edit Profile"
        btnStyle={{
          padding: 5,
          backgroundColor: colors.background,
          borderColor: colors.text,
          borderWidth: 1,
        }}
        txtStyle={{
          color: colors.text,
          fontWeight: '600',
        }}
        onPress={() => setEditModal(true)}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.highlightes}>
        <View style={styles.circle}>
          <Feather name="plus" size={30} color="black" />
        </View>
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
      </ScrollView>
    </View>
  );
}

function MyModal({colors, modalVisible, setModelVisible}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModelVisible(false);
      }}>
      <TouchableWithoutFeedback onPress={() => setModelVisible(false)}>
        <View style={styles.modalContainer}>
          <View
            style={[styles.modalContent, {backgroundColor: colors.background}]}>
            <TouchableOpacity
              onPress={() => {
                setModelVisible(false);
              }}
              style={{height: 10}}>
              <View
                style={[styles.modalClose, {backgroundColor: colors.text}]}
              />
            </TouchableOpacity>
            <IconBtn
              title="Settings"
              icon={<Feather name="settings" size={23} color={colors.text} />}
            />
            <IconBtn
              title="Archive"
              icon={
                <MaterialIcons name="restore" size={23} color={colors.text} />
              }
            />
            <IconBtn
              title="Your Activity"
              icon={
                <MaterialCommunityIcons
                  name="progress-clock"
                  size={23}
                  color={colors.text}
                />
              }
            />
            <IconBtn
              title="QR Code"
              icon={
                <MaterialIcons
                  name="qr-code-scanner"
                  size={23}
                  color={colors.text}
                />
              }
            />
            <IconBtn
              title="Saved"
              icon={<Feather name="bookmark" size={23} color={colors.text} />}
            />
            <IconBtn
              title="Close Friends"
              icon={
                <MaterialCommunityIcons
                  name="playlist-star"
                  size={23}
                  color={colors.text}
                />
              }
            />
            <IconBtn
              title="COVID-19 Information Center"
              icon={
                <MaterialCommunityIcons
                  name="heart-pulse"
                  size={23}
                  color={colors.text}
                />
              }
            />
            <IconBtn
              title="Log Out"
              icon={<Feather name="log-out" size={23} color={colors.text} />}
              onPress={() => auth().signOut()}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
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
