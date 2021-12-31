import React from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Btn from '../components/Btn';
export default function Activity() {
  const data = [
    {
      username: 'cat_lover',
      displayName: 'cat lover',
      profilePicture:
        'https://avatarfiles.alphacoders.com/123/thumb-1920-123953.jpg',
    },
    {
      username: 'mark.zuckerberg',
      displayName: 'Mark Zuckerberg',
      profilePicture:
        'https://images.macrumors.com/t/_0L8Bwdigw8z-67erzQhEH65lTY=/400x400/smart/article-new/2018/04/tim-cook-mark-zuckerberg.jpg',
    },
    {
      username: 'Youcef_blaili',
      displayName: 'Youcef blaili',
      time: 'Last week',

      profilePicture:
        'https://information.tv5monde.com/sites/info.tv5monde.com/files/styles/large/public/assets/images/AP-Belaili-Visage_2.jpeg?itok=7RCnmPn8',
    },
    {
      username: 'elzer.web.school',
      displayName: 'Osama Elzero',
      profilePicture:
        'https://yt3.ggpht.com/ytc/AKedOLTHKPaCC8X70K4JHAeg_05JFL98z_wbnAPzWrgKIg=s900-c-k-c0x00ffffff-no-rj',
    },
    {
      username: 'sonny_sangha',
      displayName: 'Sonny Sangha',
      time: 'Eleair',
      profilePicture:
        'https://pbs.twimg.com/profile_images/1339192504382590976/2WxMn8cm_400x400.jpg',
    },
  ];
  return (
    <View style={{flex: 1}}>
      <View style={styles.data}>
        <View>
          <Text style={styles.title}>Today</Text>
          <Row
            username={data[0].username}
            displayName={data[0].displayName}
            image={data[0].profilePicture}
          />
        </View>
        <View>
          <Text style={styles.title}>Yesterday</Text>
          <Row
            username={data[1].username}
            displayName={data[1].displayName}
            image={data[1].profilePicture}
          />
          <Row
            username={data[2].username}
            displayName={data[2].displayName}
            image={data[2].profilePicture}
          />
        </View>
        <View>
          <Text style={styles.title}>Last Week</Text>
          <Row
            username={data[3].username}
            displayName={data[3].displayName}
            image={data[3].profilePicture}
          />
        </View>
        <View>
          <Text style={styles.title}>Last Month</Text>
          <Row
            username={data[4].username}
            displayName={data[4].displayName}
            image={data[4].profilePicture}
          />
        </View>
      </View>
    </View>
  );
}

function Row({image, username, displayName}) {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.row,
          {
            justifyContent: 'space-between',
          },
        ]}>
        <View style={styles.row}>
          <Image style={styles.profilePic} source={{uri: image}} />
          <View>
            <Text style={{fontSize: 15, color: colors.text}}>{username}</Text>
            <Text style={{fontSize: 12, color: 'gray'}}>{displayName}</Text>
            <Text style={{fontSize: 10, color: 'gray'}}>Followed You</Text>
          </View>
        </View>
        <View style={{width: 110}}>
          <Btn
            title="Follow"
            btnStyle={{
              padding: 5,
              backgroundColor: '#217ac1',
            }}
            txtStyle={{
              fontWeight: '600',
            }}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
    marginLeft: 10,
    marginBottom: 10,
  },
  time: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  data: {
    padding: 10,
    flex: 1,
  },

  profilePic: {
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    backgroundColor: '#eee',
    marginRight: 10,
  },
  container: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
