import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import StackNav from './screens/StackNav';
import {AuthProvider} from './context/useAuth';
import {LogBox} from 'react-native';
const App = () => {
  LogBox.ignoreLogs(['AsyncStorage']);
  return (
    <AuthProvider>
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
