import React from 'react';
import {FlatList, Text, View} from 'react-native';
import EmptyList from './EmptyList';
import SmallPost from './SmallPost';
const ThreePostsBox = ({data, forItem}) => {
  return (
    <FlatList
      contentContainerStyle={{flex: 1}}
      data={data}
      keyExtractor={item => item}
      renderItem={({item}) => <SmallPost item={item} />}
      numColumns={3}
      ListEmptyComponent={<EmptyList item={forItem} />}
    />
  );
};

export default ThreePostsBox;
