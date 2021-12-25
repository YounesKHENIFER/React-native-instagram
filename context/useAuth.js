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
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async currentUser => {
      setLoggedInUser(currentUser);
      if (currentUser) {
        firestore()
          .collection('Users')
          .doc(currentUser.uid)
          .get()
          .then(res => setUser(res.data()))
          .catch(e => console.log(e.message));
      }
      setInitLoading(false);
    });
    return unsubscribe;
  }, []);

  const memoValue = useMemo(
    () => ({
      user,
      loggedInUser,
      setUser,
    }),
    [user, loggedInUser],
  );
  return (
    <>
      {initLoading ? (
        <SplashScreen />
      ) : (
        <AuthContext.Provider value={memoValue}>
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
