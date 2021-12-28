import React from 'react';
import {StatusBar, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

import TopTabs from './TopTabs';
import Message from '../screens/Message';
import Story from '../screens/Story';
import Notifications from '../screens/Notifications';
import Auth from '../screens/Auth';
import AddPost from '../screens/AddPost';
import useAuth from '../context/useAuth';
import useToggleTheme from '../context/useToggleTheme';
import Comment from '../screens/Comment';
import User from '../screens/User';

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
          headerTitleAlign: 'center',
          headerShadowVisible: false,
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
            <Stack.Screen
              name="Comment"
              options={{
                headerShown: true,
                title: 'Comments',
              }}
              component={Comment}
            />
            <Stack.Screen
              name="User"
              options={{
                headerShown: true,
                headerShadowVisible: false,
                title: '',
                headerTitleAlign: 'left',
                headerRight: () => (
                  <Feather name="more-vertical" color={colors.text} size={25} />
                ),
              }}
              component={User}
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
