import React, {
  useMemo,
  useContext,
  createContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from '../components/SplashScreen';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [isDark, setisDark] = useState(null);
  const [themeLoading, setThemeLoading] = useState(true);

  async function getTheme() {
    try {
      const isDark = await AsyncStorage.getItem('AppTheme');
      setIsDark(JSON.parse(isDark));
    } catch (e) {
      console.log(e);
    } finally {
      setThemeLoading(false);
    }
  }
  useEffect(() => {
    getTheme();
  }, []);

  const setIsDark = async value => {
    setisDark(value);
    try {
      await AsyncStorage.setItem('AppTheme', JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        setIsDark,
        themeLoading,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default function useToggleTheme() {
  return useContext(ThemeContext);
}
