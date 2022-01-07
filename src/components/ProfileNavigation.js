import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

import {useTheme} from '@react-navigation/native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Feather from 'react-native-vector-icons/Feather';
import ThreePostsBox from '../components/ThreePostsBox';
import EmptyList from './EmptyList';

const Tab = createMaterialTopTabNavigator();

export default function ProfileNavigation({posts, loading}) {
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
      <Tab.Screen name="Posts">
        {() => <Posts posts={posts} loading={loading} />}
      </Tab.Screen>
      <Tab.Screen name="Videos" component={Videos} />
      <Tab.Screen name="Tags" component={Tags} />
    </Tab.Navigator>
  );
}

function Posts({posts, loading}) {
  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : (
        <ThreePostsBox data={posts} forItem="Posts" />
      )}
    </View>
  );
}
function Videos() {
  return (
    <View style={styles.container}>
      <EmptyList item="Videos" />
    </View>
  );
}
function Tags() {
  return (
    <View style={styles.container}>
      <EmptyList item="Videos" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
