import React, {useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  FlatList,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTheme} from '@react-navigation/native';

import ThreePostsBox from '../components/ThreePostsBox';
import SearchBox from '../components/SearchBox';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EmptyList from '../components/EmptyList';
import SmallUser from '../components/SmallUser';

export default function Search({navigation}) {
  const {colors} = useTheme();
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  // getting posts
  useEffect(() => {
    firestore()
      .collection('Posts')
      .orderBy('createdAt', 'desc')
      .get()
      .then(res => {
        let myPosts = [];
        res.forEach(post => {
          myPosts.push({postId: post.id, ...post.data()});
        });
        setPosts(myPosts);
        setLoading(false);
      })
      .catch(e => console.log('Getting Posts Error :', e.message));
  }, []);
  return (
    <>
      {loading ? (
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
          <SearchBox onPress={() => setModal(true)} />
          <ThreePostsBox data={posts} forItem="Posts" />
          <SearchModal
            navigation={navigation}
            setModal={setModal}
            modal={modal}
            colors={colors}
          />
        </View>
      )}
    </>
  );
}
const Tab = createMaterialTopTabNavigator();

function SearchModal({setModal, modal, colors}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  //   users search functionality
  function searchUsers() {
    setLoading(true);
    firestore()
      .collection('Users')
      .where('username', '>=', searchTerm)
      .where('username', '<', searchTerm + 'z')
      .get()
      .then(res => {
        setUsers(res.docs.map(user => user.data()));
        setLoading(false);
      })
      .catch(e => console.log('search error:', e.message));
  }
  useEffect(() => {
    const temp = setTimeout(() => {
      if (searchTerm) searchUsers();
    }, 200);
    return () => {
      clearTimeout(temp);
    };
  }, [searchTerm]);

  return (
    <Modal
      animationType="none"
      visible={modal}
      onRequestClose={() => {
        setModal(false);
      }}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        {/* header */}
        <View style={styles.header}>
          <AntDesign
            name="arrowleft"
            size={28}
            color={colors.text}
            style={styles.icon}
            onPress={() => setModal(false)}
          />
          <SearchBox focused={true} onChangeText={setSearchTerm} />
        </View>
        <Tab.Navigator
          initialRouteName="Posts"
          screenOptions={{
            tabBarActiveTintColor: colors.text,
            tabBarInactiveTintColor: colors.inputBorder,
            tabBarStyle: {
              backgroundColor: colors.background,
              elevation: 0,
              borderBottomColor: colors.inputBackground,
              borderBottomWidth: 1,
            },
            tabBarIndicatorStyle: {
              backgroundColor: colors.text,
              height: 1.2,
            },
            tabBarLabelStyle: {
              fontSize: 11,
            },
            tabBarItemStyle: {width: 100},
            tabBarScrollEnabled: true,
            swipeEnabled: true,
          }}>
          <Tab.Screen name="Top">
            {() => <Accounts users={users} loading={loading} />}
          </Tab.Screen>
          <Tab.Screen name="Accounts">
            {() => <Accounts users={users} loading={loading} />}
          </Tab.Screen>
          <Tab.Screen name="Audio" component={Audio} />
          <Tab.Screen name="Tags" component={Tags} />
          <Tab.Screen name="Places" component={Places} />
        </Tab.Navigator>
      </View>
    </Modal>
  );
}

function Accounts({loading, users}) {
  return (
    <>
      {loading ? (
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.container}
          bounces={true}
          data={users}
          keyExtractor={(item, i) => item.uid.toString()}
          renderItem={({item}) => <SmallUser uid={item.uid} />}
          ListEmptyComponent={<EmptyList item="Search Resault" />}
        />
      )}
    </>
  );
}
function Tags() {
  return (
    <View style={styles.container}>
      <EmptyList item="Tags" />
    </View>
  );
}
function Places() {
  return (
    <View style={styles.container}>
      <EmptyList item="Places" />
    </View>
  );
}
function Audio() {
  return (
    <View style={styles.container}>
      <EmptyList item="Audio" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
    width: '96%',
  },
});
