import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TopTabs from './TopTabs';
import Message from '../screens/Message';
import Story from '../screens/Story';
import Notifications from '../screens/Notifications';
import Auth from '../screens/Auth';
import AddPost from '../screens/AddPost';

import useAuth from '../context/useAuth';
import {StatusBar} from 'react-native';
import {useTheme} from '@react-navigation/native';
import useToggleTheme from '../context/useToggleTheme';

const Stack = createNativeStackNavigator();
const StackNav = () => {
  const {user} = useAuth();
  const {isDark} = useToggleTheme();
  const {colors} = useTheme();

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          backgroundColor: colors.background,
          headerStyle: {
            backgroundColor: colors.background,
          },
        }}>
        {user ? (
          <>
            <Stack.Screen name="MainApp" component={TopTabs} />
            <Stack.Screen name="Story" component={Story} />
            <Stack.Screen name="Message" component={Message} />
            <Stack.Screen
              name="Notifications"
              options={{
                headerShown: true,
                title: 'Activity',
              }}
              component={Notifications}
            />
            <Stack.Screen
              name="AddPost"
              options={{
                headerShown: true,
                title: 'Add Post',
              }}
              component={AddPost}
            />
          </>
        ) : (
          <Stack.Screen name="Auth" component={Auth} />
        )}
      </Stack.Navigator>
    </>
  );
};

export default StackNav;
