import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TopTabs from './TopTabs';
import Message from './Message';
import Story from './Story';
import Notifications from './Notifications';
import Auth from './Auth';
import useAuth from '../context/useAuth';
import AddPost from './AddPost';

const Stack = createNativeStackNavigator();
const StackNav = () => {
  const {user} = useAuth();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
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
  );
};

export default StackNav;
