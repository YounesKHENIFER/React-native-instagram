import React, {useEffect, useState, useCallback} from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import SearchBox from '../components/SearchBox';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {messages} from '../../dummyData';

const Tab = createMaterialTopTabNavigator();

export default function Messages({navigation}) {
  // this line of code is for enabling swipe in messages screen
  React.useLayoutEffect(() => {
    navigation.setOptions({swipeEnabled: true});
  }, [navigation]);

  return (
    <React.Fragment>
      <Header navigation={navigation} />
      <Tab.Navigator
        initialRouteName="Chats"
        screenOptions={{
          swipeEnabled: false,
          tabBarActiveTintColor: 'black',
          tabBarStyle: {
            elevation: 0,
            borderBottomColor: '#ddd',
            borderBottomWidth: 1,
          },
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: '500',
          },
          tabBarIndicatorStyle: {
            backgroundColor: 'black',
            height: 1.5,
          },
        }}>
        <Tab.Screen name="Chats" component={Chats} />
        <Tab.Screen name="Calls" component={Calls} />
        <Tab.Screen name="Requests" component={Requests} />
      </Tab.Navigator>
    </React.Fragment>
  );
}

function Header({navigation}) {
  return (
    <View style={styles.header}>
      {/* right section */}
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate('MainPage')}>
        <AntDesign
          style={{marginHorizontal: 15}}
          name="arrowleft"
          size={30}
          color="black"
        />
        <Text style={{fontSize: 20, color: 'black'}}>Back</Text>
      </TouchableOpacity>
      {/* left section */}
      <View style={styles.row}>
        <TouchableOpacity>
          <Feather
            style={{marginRight: 15}}
            name="video"
            size={27}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="edit" size={27} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
function Chats() {
  // search functionality
  function handleSearch(text) {
    console.log(text);
  }
  // refresh
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <FlatList
      refreshing={refreshing}
      onRefresh={() => onRefresh()}
      contentContainerStyle={styles.container}
      data={messages}
      keyExtractor={(item, i) => i}
      renderItem={({item}) => (
        <Message
          username={item.username}
          lastMessage={item.lastMessage}
          profilePicture={item.profilePicture}
        />
      )}
      ListHeaderComponent={<SearchBox onChangeText={handleSearch} />}
    />
  );
}
function Calls() {
  return (
    <ScrollView style={styles.container}>
      <Text>Calls</Text>
    </ScrollView>
  );
}
function Requests() {
  return (
    <ScrollView style={styles.container}>
      <Text>Requests</Text>
    </ScrollView>
  );
}
function Message({username, lastMessage, profilePicture}) {
  return (
    <View style={styles.messageBox}>
      {/* left section */}
      <TouchableOpacity style={{...styles.row, flex: 1}} activeOpacity={0.6}>
        <View style={styles.circle}>
          <Image
            style={styles.image}
            source={{uri: profilePicture}}
            style={styles.image}
          />
        </View>
        <View style={{maxWidth: 250}}>
          <Text style={styles.name}>{username}</Text>
          <Text numberOfLines={1}>{lastMessage}</Text>
        </View>
      </TouchableOpacity>
      {/* right section camera icon */}
      <View>
        <TouchableOpacity>
          <Feather name="camera" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  messageBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  circle: {
    height: 68,
    width: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  image: {
    height: 64,
    width: 64,
    borderRadius: 32,
    alignSelf: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  name: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
  },
});
