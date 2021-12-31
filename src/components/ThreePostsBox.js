import React from 'react';
import {FlatList} from 'react-native';
import EmptyList from './EmptyList';
import SmallPost from './SmallPost';

const ThreePostsBox = ({data, forItem}) => {
  return (
    <FlatList
      contentContainerStyle={{flex: 1}}
      data={data}
      keyExtractor={(item, i) => i.toString()}
      renderItem={({item}) => <SmallPost post={item} />}
      numColumns={3}
      ListEmptyComponent={<EmptyList item={forItem} />}
    />
  );
};

export default ThreePostsBox;
