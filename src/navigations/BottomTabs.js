import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Search from '../screens/Search';
import Reels from '../screens/Reels';
import Shop from '../screens/Shop';
import Home from '../screens/Home';
import Profile from '../screens/Profile';

import {useTheme} from '@react-navigation/native';
import {Text, View} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();
function HeaderRightShop({colors}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 70,
        marginHorizontal: 15,
      }}>
      <View
        style={{
          padding: 2,
          borderWidth: 2,
          borderColor: colors.text,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Feather name="bookmark" size={17} color={colors.text} />
      </View>

      <Feather name="menu" size={27} color={colors.text} />
    </View>
  );
}
export default function BottomTabs({navigation, route}) {
  const {colors} = useTheme();
  React.useLayoutEffect(() => {
    navigation.setOptions({swipeEnabled: getSwiper(route)});
  }, [navigation, route]);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: colors.background,
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
          backgroundColor: colors.background,
        },
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Home') {
            return (iconName = focused ? (
              <Ionicons name="home" size={size} color={color} />
            ) : (
              <Ionicons name="home-outline" size={size} color={color} />
            ));
          } else if (route.name === 'Search') {
            return (iconName = focused ? (
              <Ionicons name="search" size={size} color={color} />
            ) : (
              <Ionicons name="search-outline" size={size} color={color} />
            ));
          } else if (route.name === 'Shop') {
            return (iconName = focused ? (
              <MaterialCommunityIcons
                name="shopping"
                size={size}
                color={color}
              />
            ) : (
              <MaterialCommunityIcons
                name="shopping-outline"
                size={size}
                color={color}
              />
            ));
          } else if (route.name === 'Reels') {
            return (iconName = focused ? (
              <MaterialCommunityIcons
                name="play-box-multiple"
                size={size}
                color={color}
              />
            ) : (
              <MaterialCommunityIcons
                name="play-box-multiple-outline"
                size={size}
                color={color}
              />
            ));
          } else if (route.name === 'Profile') {
            return (iconName = focused ? (
              <MaterialCommunityIcons
                name="account-circle"
                size={size}
                color={color}
              />
            ) : (
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={size}
                color={color}
              />
            ));
          }
        },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Reels" component={Reels} />
      <Tab.Screen
        name="Shop"
        component={Shop}
        options={{
          headerShown: true,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: colors.background,
          },
          headerRight: () => <HeaderRightShop colors={colors} />,
        }}
      />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

function getSwiper(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  return routeName === 'Home' ? true : false;
}
