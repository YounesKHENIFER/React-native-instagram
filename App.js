import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import StackNav from './src/screens/StackNav';
import {AuthProvider} from './src/context/useAuth';
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
