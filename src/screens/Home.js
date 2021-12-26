import React, {useState, useEffect} from 'react';
import {useTheme} from '@react-navigation/native';

import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import Story from '../components/Story';
import AddStory from '../components/AddStory';
import Post from '../components/Post';
import useAuth from '../context/useAuth';
import {posts, stories} from '../../dummyData';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import useToggleTheme from '../context/useToggleTheme';

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
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Header navigation={navigation} colors={colors} />
      {/* posts */}
      <Posts navigation={navigation} colors={colors} />
    </View>
  );
};

function Header({navigation, colors}) {
  const {isDark} = useToggleTheme();
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
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('AddPost')}>
          <FontAwesome name="plus-square-o" size={25} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Notifications')}>
          <AntDesign name="hearto" size={25} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Messages')}>
          <AntDesign name="message1" size={25} color={colors.text} />
        </TouchableOpacity>
      </View>
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
      <View
        style={{
          marginVertical: 4,
          height: 0.5,
          backgroundColor: colors.background,
        }}
      />
    </View>
  );
}

function Posts({navigation, colors}) {
  return (
    <View>
      <FlatList
        // refreshing={refreshing}
        // onRefresh={() => onRefresh()}
        bounces={true}
        contentContainerStyle={styles.container}
        data={posts}
        keyExtractor={(item, i) => i}
        renderItem={({item}) => (
          <Post
            username={item.username}
            profilePicture={item.profilePicture}
            postImage={item.postImage}
            likes={item.likes}
            description={item.description}
          />
        )}
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
    // marginBottom: 20,
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
    marginHorizontal: 10,
  },
});
export default Home;
