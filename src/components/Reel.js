import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

import Video from 'react-native-video';

import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Reel = ({item}) => {
  const {likes, url, comments, description, username} = item;
  const [like, setLike] = useState(false);
  const videoRef = React.useRef();
  function onBuffer() {
    console.log('buffering');
  }
  function videoError(e) {
    console.log('video error', e);
  }
  return (
    <View style={styles.container}>
      {/* layout */}
      <View style={styles.layout}>
        {/* header */}
        <View style={styles.row}>
          <Text style={styles.title}>Reels</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: 60,
            }}>
            <Feather name="camera" size={27} color="white" />
            <Feather name="menu" size={27} color="white" />
          </View>
        </View>
        {/* footer */}
        <View style={styles.footer}>
          {/* left section */}
          <View>
            <View style={styles.info}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
                {username}
              </Text>
              <View style={styles.follow}>
                <Text style={{color: 'white', fontSize: 12}}>Follow</Text>
              </View>
            </View>
            <Text numberOfLines={2} style={{color: 'white', marginVertical: 5}}>
              {description}
            </Text>
          </View>
          {/* right section */}
          <View style={styles.btn}>
            <View style={{alignItems: 'center'}}>
              <AntDesign
                name={like ? 'heart' : 'hearto'}
                size={27}
                color={like ? 'red' : 'white'}
                onPress={() => setLike(!like)}
              />
              <Text style={styles.nmbr}>{likes}</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <AntDesign name="message1" size={27} color="white" />
              <Text style={styles.nmbr}>{comments}</Text>
            </View>
            <Feather name="send" size={27} color="white" />
            <Feather name="more-vertical" size={27} color="white" />
          </View>
        </View>
      </View>
      <Video
        source={{
          uri: url,
        }}
        ref={videoRef}
        onBuffer={onBuffer}
        onError={videoError}
        style={styles.backgroundVideo}
        muted
        resizeMode="contain"
        paused={false}
        repeat
      />
    </View>
  );
};

export default Reel;

const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  follow: {
    color: 'white',
    borderColor: '#eee',
    borderWidth: 1.5,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 15,
  },
  footer: {
    paddingBottom: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  container: {
    height: Dimensions.get('window').height - 50,
    position: 'relative',
    backgroundColor: 'black',
  },
  backgroundVideo: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  layout: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 2,
    justifyContent: 'space-between',
  },
  title: {color: 'white', fontWeight: 'bold', fontSize: 18},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  btn: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 190,
    margin: 10,
  },
  nmbr: {
    fontSize: 13,
    color: 'white',
    fontWeight: '400',
    marginVertical: 5,
  },
});
