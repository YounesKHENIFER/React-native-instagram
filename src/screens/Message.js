import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useTheme} from '@react-navigation/native';
import moment from 'moment';

import useAuth from '../context/useAuth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Message({navigation, route}) {
  const {user} = useAuth();
  const {colors} = useTheme();
  const [messages, setMessages] = useState([]);
  const [contact, setContact] = useState();
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef();
  function getContact() {
    firestore()
      .collection('Users')
      .doc(route.params.senderID.toString())
      .get()
      .then(res => {
        setContact(res.data());
      })
      .catch(e => console.log('Getting User Error :', e.message));
  }
  useEffect(() => {
    getContact();
    navigation.setOptions({headerTitle: route.params.senderUsername});
  }, []);
  useEffect(
    () =>
      firestore()
        .collection('Messages')
        .doc(route.params.roomId)
        .collection('messages')
        .orderBy('createdAt', 'asc')
        .onSnapshot(
          res => {
            setMessages(res.docs.map(msg => ({msgId: msg.id, ...msg.data()})));
            setLoading(false);
          },
          e => console.log('getting sender :', e.message),
        ),
    [],
  );
  return (
    <View style={{flex: 1}}>
      {loading ? (
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : (
        // <ScrollView
        //   ref={scrollRef}
        //   onContentSizeChange={() =>
        //     scrollRef.current.scrollToEnd({animated: true})
        //   }
        //   style={[styles.container, {backgroundColor: colors.background}]}>
        //   {messages.length ? (
        //     <>
        //       {messages.map((item, i) => (
        //         <>
        //           {item.sender === user.uid ? (
        //             <SendedMsg
        //               key={i.toString()}
        //               msg={item.message}
        //               createdAt={item.createdAt}
        //               colors={colors}
        //             />
        //           ) : (
        //             <RecievedMsg
        //               key={i.toString()}
        //               msg={item.message}
        //               createdAt={item.createdAt}
        //               user={contact}
        //               colors={colors}
        //             />
        //           )}
        //         </>
        //       ))}
        //     </>
        //   ) : (
        //     <Text>Send A msg Now</Text>
        //   )}
        // </ScrollView>
        <FlatList
          inverted
          contentContainerStyle={[
            styles.container,
            {backgroundColor: colors.background},
          ]}
          data={messages}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({item}) =>
            item.sender === user.uid ? (
              <SendedMsg
                msg={item.message}
                createdAt={item.createdAt}
                colors={colors}
              />
            ) : (
              <RecievedMsg
                msg={item.message}
                createdAt={item.createdAt}
                user={contact}
                colors={colors}
              />
            )
          }
          ListEmptyComponent={<Text>Send A msg Now</Text>}
        />
      )}

      <Input colors={colors} user={user} roomId={route.params.roomId} />
    </View>
  );
}
function Input({colors, user, roomId}) {
  const [message, setMessage] = useState('');
  //   handle send message
  function handleSendMsg() {
    if (message.trim()) {
      setMessage('');
      firestore()
        .collection('Messages')
        .doc(roomId)
        .collection('messages')
        .add({
          sender: user.uid,
          createdAt: firestore.FieldValue.serverTimestamp(),
          type: 'text',
          message: message,
        });
    }
  }
  return (
    <View style={[styles.input, {backgroundColor: colors.inputBackground}]}>
      <View style={[styles.row, {width: '65%'}]}>
        <View style={styles.camera}>
          <Ionicons name="camera" size={25} color="white" />
        </View>
        <TextInput
          value={message}
          multiline
          onChangeText={setMessage}
          style={{width: '100%', maxHeight: 100}}
          placeholder="Message"
        />
      </View>
      {message.trim().length ? (
        <TouchableOpacity onPress={handleSendMsg}>
          <Text
            style={{
              color: '#0095f6',
              fontSize: 15,
              marginRight: 5,
            }}>
            Send
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.row}>
          <Feather
            style={{marginLeft: 5}}
            name="mic"
            size={25}
            color={colors.text}
          />
          <Feather
            style={{marginLeft: 5}}
            name="image"
            size={25}
            color={colors.text}
          />
          <MaterialCommunityIcons
            style={{marginLeft: 5}}
            name="sticker-emoji"
            size={25}
            color={colors.text}
          />
        </View>
      )}
    </View>
  );
}
function SendedMsg({msg, createdAt, colors}) {
  return (
    <View style={styles.SendedMsg}>
      <View
        style={[
          styles.msg,
          {backgroundColor: colors.inputBackground, borderTopRightRadius: 0},
        ]}>
        <Text style={[styles.text, {color: colors.text}]}>{msg}</Text>
        <Text numberOfLines={1} style={styles.moment}>
          {moment(createdAt?.toDate()).fromNow()}
        </Text>
      </View>
    </View>
  );
}

function RecievedMsg({msg, createdAt, user, colors}) {
  return (
    <View style={styles.RecievedMsg}>
      <View
        style={[
          styles.msg,
          {backgroundColor: colors.inputBackground, borderTopLeftRadius: 0},
        ]}>
        <Image
          source={{uri: user?.profilePicture}}
          style={styles.profilePicture}
        />
        <Text style={[styles.text, {color: colors.text}]}>{msg}</Text>
        <Text numberOfLines={1} style={styles.moment}>
          {moment(createdAt?.toDate()).fromNow()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    backgroundColor: '#0095f6',
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingLeft: 5,
    borderRadius: 25,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
  },
  moment: {
    color: 'gray',
    fontSize: 10,
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
  container: {
    paddingHorizontal: 15,
  },
  msg: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '70%',
    minWidth: 120,
    padding: 10,
    paddingBottom: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
    position: 'relative',
  },
  profilePicture: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    backgroundColor: '#eee',
    marginRight: 5,
  },
  RecievedMsg: {
    alignItems: 'flex-start',
  },
  SendedMsg: {
    alignItems: 'flex-end',
  },
});
