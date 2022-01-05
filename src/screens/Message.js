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
  const [roomId, setRoomId] = useState(route.params.roomId);
  const [contact, setContact] = useState();
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef();
  // getting contact infos
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

  // first check if the room exists if not create one
  async function createRoom() {
    firestore()
      .collection('Messages')
      .add({
        Participants: [user.uid, route.params.senderID],
        lastChanged: Date.now(),
      })
      .then(res => setRoomId(res.id))
      .catch(e => console.log('setting new room :', e.message));
  }
  // check for room existens
  function checker() {
    firestore()
      .collection('Messages')
      .where('Participants', '==', [user.uid, route.params.senderID])
      .get()
      .then(res => {
        //   if the doc does not exists in first try
        if (!res?.docs[0]?.exists) {
          firestore()
            .collection('Messages')
            .where('Participants', '==', [route.params.senderID, user.uid])
            .get()
            .then(res => {
              // if doc does not exists in second try we create a room
              if (!res?.docs[0]?.exists) {
                createRoom();
              } else {
                setRoomId(res.docs[0].id);
              }
            })
            .catch(e => console.log('second check test :', e.message));
        } else {
          setRoomId(res.docs[0].id);
        }
      })
      .catch(e => console.log('first check test :', e.message));
  }
  useEffect(() => {
    if (!roomId) {
      checker();
    }
  }, []);

  //   real time listener msgs
  useEffect(() => {
    if (roomId) {
      return firestore()
        .collection('Messages')
        .doc(roomId)
        .collection('messages')
        .orderBy('createdAt', 'asc')
        .onSnapshot(
          res => {
            setMessages(res.docs.map(msg => ({msgId: msg.id, ...msg.data()})));
            setLoading(false);
          },
          e => console.log('getting sender :', e.message),
        );
    }
  }, [roomId]);

  const renderItem = (item, i) =>
    item.sender === user.uid ? (
      <SendedMsg
        key={item.msgId}
        msg={item.message}
        createdAt={item.createdAt}
        colors={colors}
      />
    ) : (
      <RecievedMsg
        key={item.msgId}
        msg={item.message}
        createdAt={item.createdAt}
        user={contact}
        colors={colors}
      />
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
        <>
          {messages.length ? (
            <ScrollView
              ref={scrollRef}
              onContentSizeChange={() =>
                scrollRef.current.scrollToEnd({animated: true})
              }
              style={[
                styles.container,
                {backgroundColor: colors.background, flex: 1},
              ]}>
              {messages.map((item, i) => renderItem(item, i))}
            </ScrollView>
          ) : (
            <View style={styles.sendMsgBox}>
              <Text>Say Hi to {route.params.senderUsername}</Text>
            </View>
          )}
        </>
      )}

      <Input colors={colors} user={user} roomId={roomId} />
    </View>
  );
}
function Input({colors, user, roomId}) {
  const [message, setMessage] = useState('');
  //   handle send message
  function handleSendMsg() {
    if (message.trim()) {
      setMessage('');
      //   sending msg
      firestore()
        .collection('Messages')
        .doc(roomId)
        .collection('messages')
        .add({
          sender: user.uid,
          createdAt: firestore.FieldValue.serverTimestamp(),
          type: 'text',
          message: message,
        })
        .then(res => {})
        .catch(e => {
          console.log('sending msg  :', e.message);
        });

      // updating last msg time
      firestore()
        .collection('Messages')
        .doc(roomId)
        .update({
          lastChanged: Date.now(),
        })
        .then(res => {})
        .catch(e => {
          console.log('updateing lasttime :', e.message);
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
      <View style={{flexDirection: 'row'}}>
        <Text numberOfLines={1} style={styles.moment}>
          {moment(createdAt?.toDate()).fromNow()}
        </Text>
        <View
          style={[
            styles.msg,
            {
              backgroundColor: colors.inputBackground,
              borderBottomRightRadius: 0,
            },
          ]}>
          <Text style={[styles.text, {color: colors.text}]}>{msg}</Text>
        </View>
      </View>
    </View>
  );
}

function RecievedMsg({msg, createdAt, user, colors}) {
  return (
    <View style={styles.RecievedMsg}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: user?.profilePicture}}
          style={styles.profilePicture}
        />
        <View
          style={[
            styles.msg,
            {
              backgroundColor: colors.inputBackground,
              borderTopLeftRadius: 0,
            },
          ]}>
          <Text style={[styles.text, {color: colors.text}]}>{msg}</Text>
        </View>
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
    // position: 'absolute',
    top: 20,
    marginHorizontal: 10,
  },
  container: {
    paddingHorizontal: 15,
  },
  msg: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '70%',
    // minWidth: 120,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
    position: 'relative',
  },
  profilePicture: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    backgroundColor: '#eee',
    marginRight: 5,
  },
  RecievedMsg: {
    alignItems: 'flex-start',
  },
  SendedMsg: {
    alignItems: 'flex-end',
  },
  sendMsgBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
