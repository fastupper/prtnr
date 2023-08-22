import {async} from '@firebase/util';
import AsyncStorage from '@react-native-async-storage/async-storage';

const googleDatastore = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('GOOGLE_SIGN_IN', jsonValue);
    return 'success';
  } catch (e) {
    return 'faild';
  }
};
const getGoogleSignedData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('GOOGLE_SIGN_IN');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('getDate error', e);
  }
};
const setPartnerTolocal = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('PARTNER', jsonValue);
  } catch (error) {
    console.log('partner error', error);
  }
};
const getPartnerFromlocal = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('PARTNER');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    return null;
  }
};
const setUserTolocal = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('USER', jsonValue);
  } catch (error) {
    console.log('userlocal error', error);
  }
};
const setSecondPrtnrTolocal = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('PARTNER2', jsonValue);
  } catch (error) {
    console.log('partner2 error', error);
  }
};
const getSecondPrtnrFromlocal = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('PARTNER2');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    return null;
  }
};
const getUserFromlocal = async callback => {
  try {
    let jsonValue = await AsyncStorage.getItem('USER');
    if (jsonValue != null) {
      jsonValue = JSON.parse(jsonValue);
      callback(jsonValue);
    } else {
      callback('error111');
    }
  } catch (error) {
    callback('error');
  }
};
export default {
  googleDatastore,
  getGoogleSignedData,
  //partner
  setPartnerTolocal,
  getPartnerFromlocal,
  //second prtnr
  setSecondPrtnrTolocal,
  getSecondPrtnrFromlocal,
  //user
  setUserTolocal,
  getUserFromlocal,
};
