import React, {useState, useEffect} from 'react';
import {useTheme} from '@react-navigation/native';

import {
  StyleSheet,
  Image,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import Story from '../components/Story';
import AddStory from '../components/AddStory';
import Post from '../components/Post';
import useAuth from '../context/useAuth';
import {stories} from '../../dummyData';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import useToggleTheme from '../context/useToggleTheme';
import AddBox from '../components/AddBox';
import Separator from '../components/Separator';
import EmptyList from '../components/EmptyList';

import firestore from '@react-native-firebase/firestore';

const Home = ({navigation}) => {
  const {user} = useAuth();
  const {colors} = useTheme();
  const [following, setFollowing] = useState([]);
  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(user.uid)
      .collection('Following')
      .get()
      .then(res => {
        setFollowing(res.docs.map(doc => doc.id));
      })
      .catch(e => console.log('Getting Following Error :', e.message));
  }, []);
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colors.background, marginBottom: 20},
      ]}>
      <Header navigation={navigation} colors={colors} />
      {/* posts */}
      <Posts
        navigation={navigation}
        colors={colors}
        following={[...following, user.uid]}
        profilePicture={user.profilePicture}
      />
    </View>
  );
};

function Header({navigation, colors}) {
  const {isDark} = useToggleTheme();
  const [boxModal, setBoxModal] = useState(false);
  return (
    <View style={styles.header}>
      <Image
        style={isDark ? styles.logoD : styles.logoW}
        source={
          isDark
            ? require('../assets/text-logo-white.png')
            : require('../assets/text-logo.png')
        }
      />
      <View style={{flexDirection: 'row'}}>
        <FontAwesome
          style={styles.btn}
          name="plus-square-o"
          size={25}
          color={colors.text}
          onPress={() => setBoxModal(true)}
        />

        <AntDesign
          name="hearto"
          size={25}
          color={colors.text}
          onPress={() => navigation.navigate('Activity')}
        />

        <AntDesign
          name="message1"
          size={25}
          color={colors.text}
          style={styles.btn}
          onPress={() => navigation.navigate('Messages')}
        />
      </View>
      <AddBox boxModal={boxModal} setBoxModal={setBoxModal} />
    </View>
  );
}

function Stories({following, profilePicture}) {
  const [stories, setStories] = useState([]);
  //   getting stories
  useEffect(() => {
    if (following.length)
      firestore()
        .collection('Stories')
        .where('userId', 'in', following)
        .get()
        .then(res => {
          setStories(res.docs.map(doc => doc.id));
        })
        .catch(e => console.log('Getting story Error :', e.message));
  }, [following]);

  return (
    <View>
      <FlatList
        contentContainerStyle={{paddingRight: 20}}
        style={{paddingHorizontal: 10}}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={stories}
        keyExtractor={(item, i) => i}
        renderItem={({item}) => <Story userId={item} />}
        ListHeaderComponent={
          <AddStory name="Your Story" picture={profilePicture} />
        }
      />
      <Separator height={0.3} />
    </View>
  );
}

function Posts({navigation, colors, following, profilePicture}) {
  let [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (following.length)
      return firestore()
        .collection('Posts')
        .where('userId', 'in', following)
        .onSnapshot(
          posts => {
            setPosts(
              posts.docs
                .map(post => ({postId: post.id, ...post.data()}))
                .sort((a, b) => b.createdAt - a.createdAt),
            );
            setLoading(false);
            setRefreshing(false);
          },
          e => console.log('Getting Posts Error :', e.message),
        );
  }, [refreshing, following]);
  return (
    <View>
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
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
          bounces={true}
          data={posts}
          keyExtractor={(item, i) => item.postId}
          renderItem={({item}) => <Post item={item} />}
          ListEmptyComponent={
            <View style={styles.center}>
              <EmptyList item="Posts" />
            </View>
          }
          ListHeaderComponent={
            <View>
              <Stories
                colors={colors}
                navigation={navigation}
                following={following}
                profilePicture={profilePicture}
              />
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
  logoW: {
    height: 50,
    width: 150,
  },
  logoD: {
    height: 40,
    width: 160,
  },
  btn: {
    marginHorizontal: 15,
  },
  center: {
    marginTop: 120,
  },
});
export default Home;
