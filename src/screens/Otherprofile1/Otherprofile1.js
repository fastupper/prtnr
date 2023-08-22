/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  Text,
  Image,
  SafeAreaView,
  View,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import style from './Styles1';
import Arrowwhite from '../../assets/svg/arrowwhite';
import Backarrow from '../../assets/svg/arrowback';

import styles from './Styles1';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation, item}) => {
  const windowHeight = useWindowDimensions().height;
  const windowWidth = useWindowDimensions().height;
  const [right, setright] = useState('');
  const Hand = async () => {
    const result = await AsyncStorage.getItem('Hand');
    setright(result);
  };
  useEffect(() => {
    Hand();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        {/* <ImageBackground
        imageStyle={{resizeMode: 'stretch'}}
        style={{flex: 1, height: '100%', width: '100%'}}
        source={require('../../assets/otherimage.png')}> */}

        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack('')}
            style={{marginLeft: 15}}>
            <Backarrow />
          </TouchableOpacity>
          <Text style={style.text1}>prtnr</Text>
        </View>
        <View
          style={{
            width: '65%',
            position: 'absolute',
            // bottom: windowHeight / 7,
            top: '10%',
            marginLeft: 31,
          }}>
          <Text style={style.text}>1.</Text>
          <Text style={style.text}>
            First thing to do is add your 1st (and only) prtnr
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Otherdetails')}
            style={style.Add}>
            <Image
              imageStyle={{resizeMode: 'stretch'}}
              style={{height: 30, width: 30, tintColor: '#707070'}}
              source={require('../../assets/plusB.png')}
            />
          </TouchableOpacity>
        </View>
        {/* </ImageBackground> */}
        <Text
          //Otherprofile1
          onPress={() => navigation.navigate('NewHomeScreen', {right: right})}
          style={styles.skipText}>
          Skip for now
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default SplashScreen;

{
  /* <TouchableOpacity
          onPress={() => navigation.goBack('')}
          style={{ marginLeft: 15, position: 'absolute', top: 15 }}>
          {/* <Arrowwhite /> */
}
<Backarrow />;
// </TouchableOpacity> */}
