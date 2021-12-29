import React, {useEffect, useState, useCallback} from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation, useTheme} from '@react-navigation/native';

import SearchBox from '../components/SearchBox';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import EmptyList from '../components/EmptyList';
import useAuth from '../context/useAuth';
import moment from 'moment';

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
        <Feather
          style={{marginRight: 15}}
          name="video"
          size={27}
          color={colors.text}
        />

        <Feather name="edit" size={27} color={colors.text} />
      </View>
    </View>
  );
}
function Chats() {
  const {colors} = useTheme();
  const {user} = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  function getMessages() {
    if (user) {
      setLoading(true);
      firestore()
        .collection('Messages')
        .where('Participants', 'array-contains', user.uid)
        .get()
        .then(res => {
          setMessages(
            res.docs.map(message => ({id: message.id, ...message.data()})),
          );
          setLoading(false);
        })
        .catch(e => {
          console.log('getting messages:', e.message);
          setLoading(false);
        });
    }
  }
  const onRefresh = () => {
    setRefreshing(true);
    getMessages();
    setRefreshing(false);
  };

  useEffect(() => getMessages(), []);

  return (
    <>
      <SearchBox onChangeText={setSearchTerm} />
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
          onRefresh={() => onRefresh()}
          contentContainerStyle={[
            styles.container,
            {backgroundColor: colors.background},
          ]}
          data={messages}
          keyExtractor={(item, i) =>
            item.Participants.filter(id => id !== user.uid)
          }
          renderItem={({item}) => (
            <Message
              username={item.username}
              lastMessage={item.lastMessage}
              profilePicture={item.profilePicture}
              colors={colors}
              senderID={item.Participants.filter(id => id !== user.uid)}
              roomId={item.id}
            />
          )}
          ListEmptyComponent={<EmptyList item="Messages" />}
        />
      )}
    </>
  );
}

function Message({colors, senderID, roomId}) {
  const navigation = useNavigation();
  const [sender, setSender] = useState();
  const [lastMessage, setLastMessage] = useState('');

  function getSender() {
    firestore()
      .collection('Users')
      .doc(senderID.toString())
      .get()
      .then(res => setSender(res.data()))
      .catch(e => console.log('getting sender :', e.message));
  }
  function getLastMessage() {
    firestore()
      .collection('Messages')
      .doc(roomId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(1)
      .onSnapshot(
        res => {
          res.forEach(msg => {
            setLastMessage({msgId: msg.id, ...msg.data()});
          });
        },
        e => console.log('getting sender :', e.message),
      );
  }
  useEffect(() => {
    if (senderID) {
      getSender();
    }
  }, []);
  useEffect(() => getLastMessage(), []);
  return (
    <View style={styles.messageBox}>
      {/* left section */}
      <TouchableOpacity
        style={{...styles.row, flex: 1}}
        activeOpacity={0.7}
        onPress={() =>
          navigation.push('Message', {
            senderUsername: sender?.username,
            senderID: senderID,
            roomId: roomId,
          })
        }>
        <View style={styles.circle}>
          <Image
            style={[styles.image, {borderColor: colors.text}]}
            source={{uri: sender?.profilePicture}}
          />
        </View>
        <View style={{maxWidth: 250}}>
          <Text style={[styles.name, {color: colors.text}]}>
            {sender?.username}
          </Text>

          <Text numberOfLines={1} style={{color: 'gray', fontSize: 13}}>
            {lastMessage.message}
          </Text>

          <Text numberOfLines={1} style={{color: 'gray', fontSize: 10}}>
            {moment(lastMessage?.createdAt?.toDate()).fromNow()}
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
function Calls() {
  return (
    <View style={styles.container}>
      <EmptyList item="Calls" />
    </View>
  );
}
function Requests() {
  return (
    <ScrollView style={styles.container}>
      <Text>Requests</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
