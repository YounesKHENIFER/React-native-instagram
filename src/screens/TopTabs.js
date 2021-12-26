import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Messages from './Messages';
import BottomTabs from './BottomTabs';
import Camera from './Camera';

const Tab = createMaterialTopTabNavigator();

export default function TobTabs() {
  return (
    <Tab.Navigator
      initialRouteName="MainPage"
      backBehavior="history"
      screenOptions={{
        tabBarStyle: {display: 'none'},
        swipeEnabled: false,
      }}>
      <Tab.Screen name="Camera" component={Camera} />
      <Tab.Screen name="MainPage" component={BottomTabs} />
      <Tab.Screen name="Messages" component={Messages} />
    </Tab.Navigator>
  );
}
