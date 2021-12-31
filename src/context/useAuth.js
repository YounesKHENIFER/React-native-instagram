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
  const [initLoading, setInitLoading] = useState(true);

  //   first auth listener
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async currentUser => {
      setUser(currentUser);
      if (currentUser) {
        setUser(currentUser);
      }
      setInitLoading(false);
    });
    return unsubscribe;
  }, []);

  // user data firestore listner

  useEffect(
    () =>
      firestore()
        .collection('Users')
        .doc(user?.uid)
        .onSnapshot(res => {
          setUser(res.data());
        }),
    [initLoading],
  );

  return (
    <>
      {!initLoading ? (
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
