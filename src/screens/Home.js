import React, {useState, useEffect} from 'react';
import {useTheme} from '@react-navigation/native';

import {StyleSheet, Image, View, FlatList} from 'react-native';

import Story from '../components/Story';
import AddStory from '../components/AddStory';
import Post from '../components/Post';
import useAuth from '../context/useAuth';
import {posts, stories} from '../../dummyData';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import useToggleTheme from '../context/useToggleTheme';
import AddBox from '../components/AddBox';
import Sperator from '../components/Sperator';

import firestore from '@react-native-firebase/firestore';

const Home = ({navigation}) => {
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colors.background, marginBottom: 20},
      ]}>
      <Header navigation={navigation} colors={colors} />
      {/* posts */}
      <Posts navigation={navigation} colors={colors} />
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
          onPress={() => navigation.navigate('Notifications')}
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

function Stories({navigation, colors}) {
  const {user} = useAuth();

  return (
    <View>
      <FlatList
        contentContainerStyle={{paddingRight: 20}}
        style={{paddingHorizontal: 10}}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={stories}
        keyExtractor={(item, i) => i}
        renderItem={({item}) => (
          <Story
            username={item.username}
            profilePicture={item.profilePicture}
            storie={item.storie}
            navigation={navigation}
          />
        )}
        ListHeaderComponent={
          <AddStory name="Your Story" picture={user.profilePicture} />
        }
      />
      <Sperator height={0.3} />
    </View>
  );
}

function Posts({navigation, colors}) {
  let [posts, setPosts] = useState([]);

  function onResult(newposts) {
    let myPosts = [];
    newposts.forEach(post => {
      myPosts.push({postId: post.id, ...post.data()});
    });
    setPosts(myPosts);
  }
  function onError(e) {
    console.log('Getting Posts Error :', e.message);
  }

  useEffect(
    () =>
      firestore()
        .collection('Posts')
        .orderBy('createdAt', 'desc')
        .onSnapshot(onResult, onError),
    [],
  );
  return (
    <View>
      <FlatList
        // refreshing={refreshing}
        // onRefresh={() => onRefresh()}
        bounces={true}
        data={posts}
        keyExtractor={(item, i) => i}
        renderItem={({item}) => <Post item={item} />}
        ListHeaderComponent={
          <View>
            <Stories colors={colors} navigation={navigation} />
          </View>
        }
      />
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
});
export default Home;
