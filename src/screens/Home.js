import React, {useState, useEffect} from 'react';
import Story from '../components/Story';

import {
  ScrollView,
  StyleSheet,
  Image,
  RefreshControl,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import AddStory from '../components/AddStory';
import Post from '../components/Post';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {posts, stories} from '../../dummyData';
import useAuth from '../context/useAuth';
const Home = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      {/* posts */}
      <Posts navigation={navigation} />
    </View>
  );
};

function Header({navigation}) {
  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={require('../assets/text-logo.png')} />
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Notifications')}>
          <FontAwesome name="plus-square-o" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Notifications')}>
          <AntDesign name="hearto" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Messages')}>
          <AntDesign name="message1" size={25} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Stories({navigation}) {
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
          backgroundColor: '#ddd',
        }}
      />
    </View>
  );
}

function Posts({navigation}) {
  return (
    <View>
      <FlatList
        // refreshing={refreshing}
        // onRefresh={() => onRefresh()}
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
            <Stories navigation={navigation} />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginBottom: 20,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
  logo: {
    height: 50,
    width: 150,
  },
  btn: {
    marginHorizontal: 10,
  },
});
export default Home;
