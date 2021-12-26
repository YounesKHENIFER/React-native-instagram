import React, {useState} from 'react';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';

import useToggleTheme from '../context/useToggleTheme';

export default function AddPost() {
  const {colors} = useTheme();
  const {setIsDark, isDark} = useToggleTheme();
  const [postOrStory, setPostOrStory] = useState('post');
  return (
    <View style={{backgroundColor: colors.card}}>
      {/* header */}
      <View style={styles.row}>
        <TouchableOpacity onPress={() => setIsDark(!isDark)}>
          <Text style={styles.highlight}>Post</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.highlight}>Story</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  highlight: {
    fontWeight: '500',
    fontSize: 20,
  },

  row: {flexDirection: 'row', alignItems: 'center'},
});
