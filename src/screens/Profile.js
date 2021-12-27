import React, {useState} from 'react';
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

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import useAuth from '../context/useAuth';
import EditUser from '../components/EditUser';
import Btn from '../components/Btn';
import ThreePostsBox from '../components/ThreePostsBox';
import IconBtn from '../components/IconBtn';

import {posts} from '../../dummyData';
import {useTheme} from '@react-navigation/native';
import useToggleTheme from '../context/useToggleTheme';
import AddBox from '../components/AddBox';

const Tab = createMaterialTopTabNavigator();

export default function Profile({navigation}) {
  const {user} = useAuth();
  const {colors} = useTheme();

  const [editModal, setEditModal] = useState(false);
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Header colors={colors} navigation={navigation} user={user} />
      <Informations
        colors={colors}
        navigation={navigation}
        user={user}
        setEditModal={setEditModal}
      />

      <Tab.Navigator
        initialRouteName="Posts"
        screenOptions={({route}) => ({
          tabBarShowLabel: false,
          tabBarShowIcon: true,
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: colors.text,
          tabBarStyle: {
            backgroundColor: colors.background,
            elevation: 0,
            borderBottomColor: colors.text,
            borderBottomWidth: 1,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.text,
            height: 1.5,
          },
          swipeEnabled: true,
          tabBarIcon: ({color}) => {
            if (route.name === 'Posts') {
              return <Feather name="grid" size={23} color={color} />;
            } else if (route.name === 'Videos') {
              return <Feather name="play-circle" size={25} color={color} />;
            } else if (route.name === 'Tags') {
              return <Feather name="tag" size={25} color={color} />;
            }
          },
        })}>
        <Tab.Screen name="Posts" component={Posts} />
        <Tab.Screen name="Videos" component={Videos} />
        <Tab.Screen name="Tags" component={Tags} />
      </Tab.Navigator>
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

function Informations({navigation, user, setEditModal, colors}) {
  return (
    <View>
      <View
        style={[
          styles.row,
          {justifyContent: 'space-between', paddingHorizontal: 20},
        ]}>
        <Image style={styles.profile} source={{uri: user?.profilePicture}} />
        <View style={styles.row}>
          <TouchableOpacity style={styles.column}>
            <Text style={[styles.number, {color: colors.text}]}>6</Text>
            <Text style={{color: colors.text}}>Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.column}>
            <Text style={[styles.number, {color: colors.text}]}>61</Text>
            <Text style={{color: colors.text}}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.column}>
            <Text style={[styles.number, {color: colors.text}]}>168</Text>
            <Text style={{color: colors.text}}>Following</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginHorizontal: 20, marginVertical: 10}}>
        <Text style={{color: colors.text}}>{user?.displayName}</Text>
        <Text style={{color: colors.text}}>Bio : {user?.bio}</Text>
      </View>
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
          <Feather name="plus" size={30} color={colors.text} />
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

function Posts() {
  //  TODO : replace posts with real posts
  const data = posts;
  return (
    <View style={styles.container}>
      <ThreePostsBox data={data} forItem="Posts" />
    </View>
  );
}
function Videos() {
  //  TODO : replace data with real vidoes
  const data = [];
  return (
    <View style={styles.container}>
      <ThreePostsBox data={data} forItem="Videos" />
    </View>
  );
}
function Tags() {
  //  TODO : replace data with real tags
  const data = [];
  return (
    <View style={styles.container}>
      <ThreePostsBox data={data} forItem="Tags" />
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
