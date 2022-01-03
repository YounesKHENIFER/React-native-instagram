import React, {useEffect} from 'react';
import {View, Text, FlatList, StatusBar} from 'react-native';
import Reel from '../components/Reel';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

export default function Reels({navigation}) {
  // change bottom tab style
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: {
        backgroundColor: 'black',
        borderTopWidth: 0,
      },
      tabBarInactiveTintColor: 'white',
      tabBarActiveTintColor: 'white',
    });
  }, []);
  const Videos = [
    {
      likes: 345,
      comments: 34,
      url: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
      description: 'Space ...',
      username: 'space.x',
    },
    {
      likes: '3k',
      comments: '239',
      url: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
      description: 'Space ...',
      username: 'space.x',
    },
    {
      likes: 65,
      comments: 8,
      url: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
      description: 'Space ...',
      username: 'space.x',
    },
  ];
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor="black" />

      <FlatList
        pagingEnabled={true}
        data={Videos}
        keyExtractor={(item, i) => i}
        renderItem={({item}) => <Reel item={item} />}
      />
    </View>
  );
}
