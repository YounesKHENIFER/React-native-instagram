import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
} from 'react-native';

import auth from '@react-native-firebase/auth';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import useAuth from '../context/useAuth';
import EditUser from './EditUser';
import Btn from '../components/Btn';
import ThreePostsBox from '../components/ThreePostsBox';
import IconBtn from '../components/IconBtn';

import {posts} from '../dummyData';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function Profile() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="userProfile" component={userProfile} />
      <Stack.Screen name="Edit" component={EditUser} />
    </Stack.Navigator>
  );
}

function userProfile({navigation}) {
  const {user} = useAuth();
  return (
    <View style={styles.container}>
      <Header navigation={navigation} user={user} />
      <Informations navigation={navigation} user={user} />
      <Tab.Navigator
        initialRouteName="Posts"
        screenOptions={({route}) => ({
          tabBarShowLabel: false,
          tabBarShowIcon: true,
          tabBarActiveTintColor: 'black',
          tabBarStyle: {
            elevation: 0,
            borderBottomColor: '#ddd',
            borderBottomWidth: 1,
          },
          tabBarIndicatorStyle: {
            backgroundColor: 'black',
            height: 1.5,
          },
          swipeEnabled: true,
          tabBarIcon: () => {
            if (route.name === 'Posts') {
              return <Feather name="grid" size={25} />;
            } else if (route.name === 'Videos') {
              return <Feather name="play-circle" size={25} />;
            } else if (route.name === 'Tags') {
              return <Feather name="tag" size={25} />;
            }
          },
        })}>
        <Tab.Screen name="Posts" component={Posts} />
        <Tab.Screen name="Videos" component={Videos} />
        <Tab.Screen name="Tags" component={Tags} />
      </Tab.Navigator>
    </View>
  );
}

function Header({navigation, user}) {
  const [modalVisible, setModelVisible] = useState(false);
  return (
    <View style={styles.header}>
      <View style={styles.row}>
        <Feather name="lock" size={20} color="black" />
        <Text style={styles.text}>{user?.username}</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.text}
          onPress={() => navigation.navigate('AddPost')}>
          <Feather name="plus-square" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.text}
          onPress={() => setModelVisible(true)}>
          <Feather name="menu" size={25} color="black" />
        </TouchableOpacity>
      </View>
      <MyModal modalVisible={modalVisible} setModelVisible={setModelVisible} />
    </View>
  );
}

function Informations({navigation, user}) {
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
            <Text style={styles.number}>6</Text>
            <Text>Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.column}>
            <Text style={styles.number}>61</Text>
            <Text>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.column}>
            <Text style={styles.number}>168</Text>
            <Text>Following</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{margin: 20}}>{user?.bio}</Text>
      <Btn
        title="Edit Profile"
        btnStyle={{
          padding: 5,
          backgroundColor: '#fff',
          borderColor: '#cccs',
          borderWidth: 1,
        }}
        txtStyle={{
          color: 'black',
          fontWeight: '600',
        }}
        onPress={() => navigation.navigate('Edit')}
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

function MyModal({modalVisible, setModelVisible}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModelVisible(false);
      }}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={() => {
              setModelVisible(false);
            }}
            style={{height: 10}}>
            <View style={styles.modalClose} />
          </TouchableOpacity>
          <IconBtn
            title="Settings"
            icon={<Feather name="settings" size={25} color="black" />}
          />
          <IconBtn
            title="Archive"
            icon={<MaterialIcons name="restore" size={25} color="black" />}
          />
          <IconBtn
            title="Your Activity"
            icon={
              <MaterialCommunityIcons
                name="progress-clock"
                size={25}
                color="black"
              />
            }
          />
          <IconBtn
            title="QR Code"
            icon={
              <MaterialIcons name="qr-code-scanner" size={25} color="black" />
            }
          />
          <IconBtn
            title="Saved"
            icon={<Feather name="bookmark" size={25} color="black" />}
          />
          <IconBtn
            title="Close Friends"
            icon={
              <MaterialCommunityIcons
                name="playlist-star"
                size={25}
                color="black"
              />
            }
          />
          <IconBtn
            title="COVID-19 Information Center"
            icon={
              <MaterialCommunityIcons
                name="heart-pulse"
                size={25}
                color="black"
              />
            }
          />
          <IconBtn
            title="Log Out"
            icon={<Feather name="log-out" size={25} color="black" />}
            onPress={() => auth().signOut()}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
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
    color: 'black',
  },
  profile: {
    height: 95,
    width: 95,
    borderRadius: 95 / 2,
  },
  number: {
    fontWeight: '600',
    fontSize: 18,
    color: 'black',
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
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  modalClose: {
    width: 40,
    height: 4,
    borderRadius: 5,
    backgroundColor: 'gray',
    alignSelf: 'center',
  },
});
