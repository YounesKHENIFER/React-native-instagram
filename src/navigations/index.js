import React, {useEffect} from 'react';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from '@react-navigation/native';

import StackNav from './StackNav';
import useToggleTheme from '../context/useToggleTheme';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'white',
    postBack: '#eee',
  },
};
const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'rgb(255, 45, 85)',
    postBack: 'rgb(0, 0, 30)',
  },
};

const Index = () => {
  const {isDark} = useToggleTheme();
  return (
    <NavigationContainer theme={isDark ? MyDarkTheme : MyTheme}>
      <StackNav />
    </NavigationContainer>
  );
};

export default Index;
