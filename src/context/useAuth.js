import React, {useContext, createContext, useEffect, useState} from 'react';

import SplashScreen from '../components/SplashScreen';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import useToggleTheme from './useToggleTheme';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const {themeLoading} = useToggleTheme();
  const [userLoading, setUserLoading] = useState(true);

  //   first auth listener
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async currentUser => {
      setUser(user);
      if (currentUser) {
        firestore()
          .collection('Users')
          .doc(currentUser.uid)
          .onSnapshot(res => {
            setUser(res.data());
            setUserLoading(false);
          });
      } else {
        setUserLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  // user data firestore listner

  //   useEffect(() => {
  //     if (!userLoading && user)
  //       firestore()
  //         .collection('Users')
  //         .doc(user.uid)
  //         .onSnapshot(res => {
  //           setUser(res.data());
  //         });
  //   }, [userLoading]);

  return (
    <>
      {!themeLoading && !userLoading ? (
        <AuthContext.Provider
          value={{
            user,
            setUser,
          }}>
          {children}
        </AuthContext.Provider>
      ) : (
        <SplashScreen />
      )}
    </>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
