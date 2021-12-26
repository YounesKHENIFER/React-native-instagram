import React from 'react';

import {AuthProvider} from './src/context/useAuth';
import {ThemeProvider} from './src/context/useToggleTheme';
import {LogBox} from 'react-native';

import Index from './src/navigations';

const App = () => {
  LogBox.ignoreLogs(['AsyncStorage']);
  return (
    <ThemeProvider>
      <AuthProvider>
        <Index />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
