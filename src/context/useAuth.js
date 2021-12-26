import React, {
  useMemo,
  useContext,
  createContext,
  useEffect,
  useState,
} from 'react';

import SplashScreen from '../components/SplashScreen';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [noUser, setNoUser] = useState(true);
  const [initLoading, setInitLoading] = useState(true);

  //   first auth listener
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async currentUser => {
      setUser(currentUser);
      if (currentUser) {
        setNoUser(false);
      }
      setInitLoading(false);
    });
    return unsubscribe;
  }, []);

  // user data firestore listner

  useEffect(() => {
    if (!noUser) {
      return firestore()
        .collection('Users')
        .doc(user.uid)
        .onSnapshot(res => {
          setUser(res.data());
        });
    } else {
      setNoUser(true);
    }
  }, [noUser]);

  return (
    <>
      {initLoading ? (
        <SplashScreen />
      ) : (
        <AuthContext.Provider
          value={{
            user,
            setUser,
          }}>
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
