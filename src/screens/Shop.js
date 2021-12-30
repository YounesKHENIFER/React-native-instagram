import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Image} from 'react-native';
import {View, Text, FlatList, StyleSheet, Dimensions} from 'react-native';
import SearchBox from '../components/SearchBox';
export default function Shop() {
  const {colors} = useTheme();
  //   dummy data
  const data = [
    'https://media.direct.playstation.com/is/image/psdglobal/PS5-digital-edition-console-front',
    'https://www.militaryworldsrl.com/pimages/KATANA-THE-LAST-SAMURAI-IN-ACCIAIO-INOX-440-E-FODERO-IN-LEGNO-ZS-small-38318.jpg',
    'https://i.pinimg.com/474x/a5/9e/3d/a59e3db823aaf7b13d0c73f7345558ca.jpg',
    'https://static.sscontent.com/prodimg/thumb/400/400/products/124/v962200_prozis_x-college-varsity-jacket-high-red-m_xs_red_main.jpg',
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphone-11-pro-midnight-green-2019?wid=400&hei=400&fmt=jpeg&qlt=80&.v=1611101526000',
    'https://i.pinimg.com/474x/c7/78/17/c77817440655ef2ba627ad1067d4a269.jpg',
    'https://i.ebayimg.com/images/g/DhIAAOSwtixemLPH/s-l400.jpg',
    'https://i1.wp.com/nepalbinayaktraders.com.np/wp-content/uploads/2021/02/thumb0-04-03-6b811f937c146cf3dcdac318933ba06b7573daa201cda476b274ceb2b6e5ef22_8c36f9b5.jpg?fit=400%2C400&ssl=1',
  ];
  return (
    <View style={{backgroundColor: colors.background, flex: 1}}>
      <View>
        <SearchBox />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.container}
          data={['Shops', 'Videos', "Editors' picks", 'Collections', 'Guides']}
          keyExtractor={({item}, i) => i.toString()}
          renderItem={({item}) => (
            <Text
              style={[
                styles.toptext,
                {borderColor: colors.inputPlaceholder, color: colors.text},
              ]}>
              {item}
            </Text>
          )}
        />
      </View>
      <View style={styles.data}>
        <FlatList
          numColumns={2}
          data={data}
          keyExtractor={({item}, i) => i.toString()}
          renderItem={({item}) => (
            <View style={styles.imageBox}>
              <Image
                source={{uri: item}}
                style={{width: '99%', height: '99%'}}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  toptext: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1.2,
    marginRight: 5,
    borderRadius: 8,
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 10,
  },
  data: {
    paddingVertical: 10,
    flex: 1,
  },
  imageBox: {
    backgroundColor: '#eee',
    height: Dimensions.get('window').width / 2 - 5,
    width: Dimensions.get('window').width / 2 - 5,
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
