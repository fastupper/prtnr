import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import ActivityIndicator from '../../components/ActivityIndicator';
import localStorage from '../../api/localStorage';
import UserStorage from '../../Data/UserStorage';
import firebase from '../../api/firebase';

import {useToast} from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Placeholder({route, navigation}) {
  const randomItem = route.params.backgroundImg;
  const [isloader, setIsLoader] = useState(false);
  const [right, setright] = useState('');
  const isFocused = useIsFocused();
  const Toast = useToast();

  const showToastMsg = (
    msg = 'Something went wrong...',
    position = 'center',
  ) => {
    Toast.hideAll();
    Toast.show(msg, {
      type: 'normal',
      placement: 'center',
      duration: 2000,
      offset: 30,
      animationType: 'slide-in | zoom-in',
    });
  };
  const Hand = async () => {
    const result = await AsyncStorage.getItem('Hand');
    setright(result);
  };
  const getPartnerlist = () => {
    try {
      setIsLoader(true);
      firebase.getAllPartnersData(UserStorage.userRefId, response => {
        if (response != null && response.length > 0) {
          navigation.navigate('NewHomeScreen', {right: right});
        } else if (response === 'error') {
          showToastMsg('something went wrong please try again...');
        } else {
          //setIsPrtnr(false);
          navigation.navigate('Addpartner');
        }
        setIsLoader(false);
      });
    } catch (error) {
      setIsLoader(false);
    }
  };
  const fetchUserdataFromlocal = async () => {
    localStorage.getUserFromlocal(userResult => {
      if (userResult !== 'error') {
        UserStorage.userRefId = userResult.userRefId;
        UserStorage.imgUrl = userResult.profileImg;
      }
      //setIsLoader(false);
      getPartnerlist();
    });
  };
  useEffect(() => {
    if (isFocused) {
      Hand();
      fetchUserdataFromlocal();
    }
  }, [isFocused]);
  return (
    <>
      <ActivityIndicator visible={isloader} />
      <View style={{flex: 1}}>
        <FastImage
          style={{width: '100%', height: '100%'}}
          source={randomItem}
          //require('../assets/splashimage/s4.png')
        />
      </View>
    </>
  );
}

export default Placeholder;
