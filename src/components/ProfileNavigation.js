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

import {posts} from '../../dummyData';
import {useTheme} from '@react-navigation/native';
import ThreePostsBox from '../components/ThreePostsBox';
import useAuth from '../context/useAuth';

const Tab = createMaterialTopTabNavigator();

export default function ProfileNavigation({posts}) {
  const {user} = useAuth();
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarShowIcon: true,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.inputBorder,
        tabBarStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          borderBottomColor: colors.inputBackground,
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
      <Tab.Screen name="Posts">{() => <Posts posts={posts} />}</Tab.Screen>
      <Tab.Screen name="Videos" component={Videos} />
      <Tab.Screen name="Tags" component={Tags} />
    </Tab.Navigator>
  );
}

function Posts({posts}) {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
