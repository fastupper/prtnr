import React, { useEffect, useState } from 'react';
import {
  Text,
  Image,
  SafeAreaView,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import styles from './Styles';
import GestureRecognizer from 'react-native-swipe-gestures';
//import { FlatListSlider } from '../../component/react-native-flatlist-slider';
import { FlatListSlider } from 'react-native-flatlist-slider';
import silderdata from '../../utils/SilderData';
import * as Animatable from 'react-native-animatable';

//Google
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useToast } from 'react-native-toast-notifications';
import ActivityIndicator from '../../components/ActivityIndicator';
import localStorage from '../../api/localStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Biometric from '../Biometerics/Biometric';
import firebase from '../../api/firebase';
import Google from '../../GoogleSignIn/Google';
import FastImage from 'react-native-fast-image';

const SplashScreen = ({ navigation, item }) => {
  const [isSwiped, setIsSwiped] = useState(false);
  const [isSwiped1, setIsSwiped2] = useState(true);
  //Google
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoingStatus, setGettingLoginStatus] = useState(null);
  const [isLoader, setIsLoader] = useState(false);

  //Random background
  const [randomItem, setIsRandomItem] = useState('');

  const [backgroundItems, setIsBackgroundItems] = useState([
    require('../../assets/splashimage/s1.png'),
    require('../../assets/splashimage/s2.png'),
    require('../../assets/splashimage/s3.png'),
    require('../../assets/splashimage/s4.png'),
    require('../../assets/splashimage/s5.png'),
    require('../../assets/splashimage/s6.png'),
    require('../../assets/splashimage/s7.png'),
  ]);

  const onSwipeUp = gestureState => {
    setIsSwiped(true);
  };
  const windowwidth = useWindowDimensions().width;
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  const Hand = async item => {
    await AsyncStorage.setItem('Hand', item);
    // const result = await AsyncStorage.getItem('Hand');
  };
  //Girish Chauhan...
  const Toast = useToast();
  const showToastMsg = (
    msg = 'Something went wrong...',
    position = 'center',
  ) => {
    if (Toast.isOpen) {
      Toast.hideAll();
    }
    Toast.show(msg, {
      type: 'normal',
      placement: 'center',
      duration: 2000,
      offset: 30,
      animationType: 'slide-in | zoom-in',
    });
  };
  const checkRegistraion = async () => {
    const isRegist = await AsyncStorage.getItem('REGISTRATION');
    // const isRegist = null;
    if (isRegist !== null && isRegist === 'success') {
      let isBiometric = await AsyncStorage.getItem('BIO_METRIC');
      if (isBiometric) {
        isBiometric = JSON.parse(isBiometric);
      }
      if (isBiometric === true) {
        Biometric.CallAuthBiomatrics(result => {
          if (result === true) {
            navigation.navigate('Addpartner');
          }
        });
      }
    } else if (isRegist === 'logout') {
      console.log('You did not log in yet.');
    } else {
    }
  };
  const randomBackground = () => {
    const randomValue = backgroundItems[Math.floor(Math.random() * backgroundItems.length)];
    // const randomValue = backgroundItems[0];
    setIsRandomItem(randomValue);
  };
  //Google SignIn...
  useEffect(() => {
    randomBackground();
    Google.configuration().then(() => {
      checkRegistraion();
    });
  }, []);

  const _signIn = async () => {
    // revoke access (disconnect Google user)
    // try {
    //   await GoogleSignin.revokeAccess();
    //   console.log('Revoked Access');
    // } catch (error) {
    //   console.error('Failed to revoke access: ', error);
    // }

    // sign out from the app
    try {
      await GoogleSignin.signOut();
      console.log('Signed Out');
    } catch (error) {
      console.error('Failed to sign out: ', error);
    }
    // It will prompt google Signin Widget
    try {
      setIsLoader(true);
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      // const userInfo = null;
      console.log('signin successfully', userInfo)
      if (userInfo != null) {
        const userValue = userInfo.user;
        const userEmail = userValue.email;
        //showToastMsg('You have signed with Google account');
        if (userEmail != null) {
          firebase
            .getRegisteredUser(userEmail, async response => {
              localStorage.googleDatastore(userValue).then(() => { });
              setIsLoader(false);
              console.log('--->', response)
              if (response.data === 'true') {
                localStorage.setUserTolocal(response);
                Hand(response.userHand);
                const regiEmail = response.email;
                if (response.Biometrics) {
                  const result = response.Biometrics;
                  await AsyncStorage.setItem(
                    'BIO_METRIC',
                    JSON.stringify(result),
                  );
                }
                console.log(response.Biometrics)
                if (regiEmail !== null && regiEmail != '') {
                  console.log('before go to Placeholder')
                  await AsyncStorage.setItem('REGISTRATION', 'success').then(
                    () => {
                      //navigation.navigate('Addpartner');
                      navigation.navigate('Placeholder', {
                        backgroundImg: randomItem,
                      });
                    },
                  );
                }
              } else {
                //registration
                navigation.navigate('Registration', { isGoogle: true });
              }
            })
          // .then(() => {
          // });
        }
        //setUserInfo(userInfo);
      }
    } catch (error) {
      setIsLoader(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        showToastMsg('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        showToastMsg('Signing In...');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Play Services Not Available or Outdated');
      } else {
        //showToastMsg('Error', error.c);
        console.log('Google Error', error);
      }
    }
  };

  return (
    <>
      <ActivityIndicator visible={isLoader} />
      <SafeAreaView>
        <GestureRecognizer
          onSwipeUp={state => onSwipeUp(state)}
          config={config}>
          {/* <FlatListSlider
            data={silderdata}
            width={windowwidth}
            height={'100%'}
            local={true}
            contentContainerStyle={{ ondrag: 'false' }}
            loop={true}
            autoscroll={true}
            onPress={() => null}
            indicator={false}

          /> */}
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={randomItem}
          //require('../assets/splashimage/s4.png')
          />

          <View style={styles.view}>
            {isSwiped ? (
              <View style={{ width: '100%', alignItems: 'center' }}>
                <Animatable.View
                  style={{ width: '100%' }}
                  animation={isSwiped1 ? 'fadeIn' : 'fadeOutDown'}
                  duration={1000}>
                  <TouchableOpacity
                    onPress={() => {
                      //navigation.navigate('Registration');
                      _signIn();
                    }}
                    style={styles.button}>
                    <Text style={[styles.buttontext, { color: 'white' }]}>
                      Sign In with Google
                    </Text>
                  </TouchableOpacity>
                </Animatable.View>
                <Animatable.View
                  style={{ width: '100%' }}
                  animation={isSwiped1 ? 'fadeIn' : 'fadeOutDown'}
                  duration={2000}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Registration');
                      // navigation.navigate('Invite');
                    }}
                    style={[
                      styles.button,
                      { backgroundColor: 'white', marginTop: 20 },
                    ]}>
                    <Text style={styles.buttontext}>Sign In with Apple</Text>
                  </TouchableOpacity>
                </Animatable.View>
                <Animatable.View
                  style={{ width: '100%', alignItems: 'center' }}
                  animation={isSwiped1 ? 'fadeIn' : 'fadeOutDown'}
                  duration={2000}>
                  <TouchableOpacity
                    onPress={() => {
                      setTimeout(() => {
                        setIsSwiped(false), setIsSwiped2(true);
                      }, 900),
                        setIsSwiped2(false);
                    }}
                    style={styles.close}>
                    <Image source={require('../../assets/close.png')} />
                  </TouchableOpacity>
                </Animatable.View>
              </View>
            ) : (
              <Text style={styles.start}>swipe up to start</Text>
            )}
            {isSwiped ? (
              <Animatable.View
                style={{ width: '100%', alignItems: 'center' }}
                animation={isSwiped1 ? 'fadeIn' : 'fadeOutDown'}
                duration={2000}>
                <View style={[styles.prtnr, { alignItems: 'center' }]}>
                  <Text style={styles.prtnrtext}>prtnr</Text>
                </View>
              </Animatable.View>
            ) : (
              <View style={styles.prtnr}>
                <Text style={styles.prtnrtext}>prtnr</Text>
              </View>
            )}
          </View>
        </GestureRecognizer>
      </SafeAreaView>
    </>
  );
};
export default SplashScreen;

// if (response.userRefId !== null) {

//   const userValue = response[0];
//   localStorage.setUserTolocal(userValue);
//   Hand(response[0]['userHand']);

//   const regiEmail = response[0]['email'];
//   if (response[0]['Biometrics']) {
//     const result = response[0]['Biometrics'];
//     await AsyncStorage.setItem('BIO_METRIC', JSON.stringify(result));
//   }
//   if (regiEmail !== null && regiEmail != '') {

//     await AsyncStorage.setItem('REGISTRATION', 'success');
//     navigation.navigate('Addpartner');
//   }
// }
// else {
//   navigation.navigate('Registration', { isGoogle: true });
// }
