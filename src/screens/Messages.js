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
import {useTheme} from '@react-navigation/native';
import {colors} from 'react-native-elements';

const Tab = createMaterialTopTabNavigator();

export default function Messages({navigation}) {
  // this line of code is for enabling swipe in messages screen
  React.useLayoutEffect(() => {
    navigation.setOptions({swipeEnabled: true});
  }, [navigation]);

  const {colors} = useTheme();
  return (
    <>
      <Header navigation={navigation} colors={colors} />
      <Tab.Navigator
        initialRouteName="Chats"
        screenOptions={{
          swipeEnabled: false,
          tabBarActiveTintColor: colors.text,
          tabBarStyle: {
            elevation: 0,
            borderBottomColor: colors.background,
            borderBottomWidth: 1,
            backgroundColor: colors.background,
          },
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: '500',
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.text,
            height: 1.5,
          },
        }}>
        <Tab.Screen name="Chats" component={Chats} />
        <Tab.Screen name="Calls" component={Calls} />
        <Tab.Screen name="Requests" component={Requests} />
      </Tab.Navigator>
    </>
  );
}

function Header({navigation, colors}) {
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
          color={colors.text}
        />
        <Text style={{fontSize: 20, color: colors.text}}>Back</Text>
      </TouchableOpacity>
      {/* left section */}
      <View style={styles.row}>
        <TouchableOpacity>
          <Feather
            style={{marginRight: 15}}
            name="video"
            size={27}
            color={colors.text}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="edit" size={27} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
function Chats() {
  const {colors} = useTheme();
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
      contentContainerStyle={[
        styles.container,
        {backgroundColor: colors.background},
      ]}
      data={messages}
      keyExtractor={(item, i) => i}
      renderItem={({item}) => (
        <Message
          username={item.username}
          lastMessage={item.lastMessage}
          profilePicture={item.profilePicture}
          colors={colors}
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
function Message({colors, username, lastMessage, profilePicture}) {
  return (
    <View style={styles.messageBox}>
      {/* left section */}
      <TouchableOpacity style={{...styles.row, flex: 1}} activeOpacity={0.6}>
        <View style={styles.circle}>
          <Image
            style={[styles.image, {borderColor: colors.text}]}
            source={{uri: profilePicture}}
          />
        </View>
        <View style={{maxWidth: 250}}>
          <Text style={[styles.name, {color: colors.text}]}>{username}</Text>
          <Text numberOfLines={1} style={{color: colors.text}}>
            {lastMessage}
          </Text>
        </View>
      </TouchableOpacity>
      {/* right section camera icon */}
      <View>
        <TouchableOpacity>
          <Feather name="camera" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  header: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
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
    borderWidth: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
  },
});
