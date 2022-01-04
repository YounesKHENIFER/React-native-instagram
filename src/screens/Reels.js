import React, {useEffect} from 'react';
import {View, FlatList, StatusBar} from 'react-native';
import Reel from '../components/Reel';

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
      likes: 65,
      comments: 8,
      url: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
      description: 'Space ...',
      username: 'space.x',
    },
    {
      likes: 345,
      comments: 34,
      url: 'https://images.all-free-download.com/footage_preview/mp4/small_wild_squirrel_looking_for_food_in_nature_6892059.mp4',
      description: 'Nature ...',
      username: 'Nature_1024',
    },
    {
      likes: 3845,
      comments: 134,
      url: 'https://images.all-free-download.com/footage_preview/mp4/beautiful_natural_landscape_in_resort_6892001.mp4',
      description: '',
      username: 'Nature_1024',
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
