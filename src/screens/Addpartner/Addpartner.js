//import liraries
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Modal,
  Alert,
} from 'react-native';
import styles from './Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import font from '../../utils/CustomFont';
import firebase from '../../api/firebase';
import UserStorage from '../../Data/UserStorage';

import {PermissionsAndroid} from 'react-native';
import ActivityIndicator from '../../components/ActivityIndicator';
import localStorage from '../../api/localStorage';
import {useIsFocused} from '@react-navigation/native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import UserProfileModal from '../../component/UserProfileModal';

const MyComponent = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const [right, setright] = useState('');
  const [username, setUsername] = useState('');
  const [imgUrl, setProfileImage] = useState('');
  const [isloader, setIsLoader] = useState(false);
  const [isPrtnr, setIsPrtnr] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [inviteUserData, setInviteUserData] = useState('');

  const isFocused = useIsFocused();

  const Hand = async () => {
    const result = await AsyncStorage.getItem('Hand');
    setright(result);
  };
  const fetchUserdataFromlocal = async () => {
    setIsLoader(true);
    localStorage.getUserFromlocal(userResult => {
      if (userResult !== 'error') {
        setProfileImage(userResult.profileImg);
        setUsername(userResult.firstname);
        UserStorage.userRefId = userResult.userRefId;
        UserStorage.imgUrl = userResult.profileImg;
        setIsLoader(false);
      }
      //setIsLoader(false);
      //getPartners();
    });
  };
  const getPartners = async () => {
    try {
      firebase.getAllPartnersData(UserStorage.userRefId, response => {
        if (response != null && response.length > 0) {
          setIsPrtnr(true);
          navigation.navigate('NewHomeScreen', {right: right});
        } else {
          setIsPrtnr(false);
        }
        setIsLoader(false);
      });
    } catch (error) {
      setIsLoader(false);
    }
  };
  useEffect(() => {
    console.log('here is Addpartner')
    Hand();
    fetchUserdataFromlocal();
  }, [isFocused]);
  const windowHeight = useWindowDimensions().height;
  //Nikunj

  const createAlert = name =>
    Alert.alert('Prtnr', `Invitation received from ${name}`, [
      {
        text: 'Decline',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Review', onPress: () => setShowProfileModal(true)},
    ]);

  /* const handleDynamicLink = useCallback(
    async link => {
      if (link.url) {
        if (link.url.split('/')[3]) {
          firebase.getInviteUser(link.url.split('/')[3], response => {
            const userName = response.firstname + ' ' + response.lastname;
            createAlert(userName);
            setInviteUserData(response);
          });
        }
      }
    },
    [navigation],
  );

  useEffect(() => {
    const unSubscribe = dynamicLinks().onLink(handleDynamicLink);
    return () => unSubscribe();
  }, [handleDynamicLink]); */

  /* useEffect(() => {
    const fetchScreen = async () => {
      const getInitialLink = await dynamicLinks().getInitialLink();
      if (getInitialLink !== null) {
        if (getInitialLink.url) {
          if (getInitialLink.url.split('/')[3]) {
            firebase.getInviteUser(
              getInitialLink.url.split('/')[3],
              response => {
                const userName = response.firstname + ' ' + response.lastname;
                createAlert(userName);
              },
            );
          }
        }
      }
    };
    fetchScreen();
  }, [navigation]); */

  //Girish Chauhan
  const ProfileImg = () => {
    const src = imgUrl ? imgUrl : 'src';
    if (src === 'src') {
      return (
        <Image
          imageStyle={{resizeMode: 'stretch'}}
          source={require('../../assets/profile.png')}
          style={[styles.profile, {}]}
        />
      );
    } else {
      return (
        <Image
          imageStyle={{resizeMode: 'stretch'}}
          source={{uri: src}}
          style={[styles.profile, {}]}
        />
      );
    }
  };
  return (
    <>
      <ActivityIndicator visible={isloader} />
      <SafeAreaView style={styles.container}>
        <ImageBackground
          imageStyle={{resizeMode: 'stretch'}}
          source={require('../../assets/background.png')}
          style={{height: '100%', width: '100%'}}>
          <ScrollView style={{flex: 1}}>
            {inviteUserData && showProfileModal ? (
              <UserProfileModal
                user={inviteUserData}
                visible={showProfileModal}
                onClose={() => setShowProfileModal(false)}
                onAccept={() => {
                  setShowProfileModal(false);
                }}
                onDecline={() => setShowProfileModal(false)}
              />
            ) : null}
            {right == 'right' ? (
              <View
                style={{
                  paddingHorizontal: 20,
                  marginTop: 10,
                  marginVertical: 10,
                  alignSelf: 'center',
                  marginBottom: -10,
                  width: '100%',
                  alignItems: 'flex-end',
                }}>
                <Text style={[styles.head]}>prtnr</Text>
              </View>
            ) : (
              <View
                style={{
                  paddingHorizontal: 20,
                  marginTop: 10,
                  marginVertical: 10,
                  alignSelf: 'center',
                  marginBottom: -10,
                  width: '100%',
                  alignItems: 'flex-start',
                }}>
                <Text style={[styles.head]}>prtnr</Text>
              </View>
            )}
            {right == 'right' ? (
              <View style={[styles.imageview]}>
                {open || toolTipVisible ? (
                  // <Image
                  //   imageStyle={{ resizeMode: 'stretch' }}
                  //   source={require('../../assets/profile2.png')}
                  //   style={[styles.profile, {}]}></Image>
                  <ProfileImg />
                ) : (
                  <ProfileImg />
                )}
                <TouchableOpacity
                  style={{marginHorizontal: 25}}
                  onPress={() => navigation.navigate('Otherprofile1')}>
                  <Image
                    imageStyle={{resizeMode: 'stretch'}}
                    source={require('../../assets/plus.png')}
                    style={{height: 20, width: 20}}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={[styles.imageview]}>
                <TouchableOpacity
                  style={{marginHorizontal: 25}}
                  onPress={() => navigation.navigate('Otherprofile1')}>
                  <Image
                    imageStyle={{resizeMode: 'stretch'}}
                    source={require('../../assets/plus.png')}
                    style={{height: 20, width: 20}}
                  />
                </TouchableOpacity>
                {open || toolTipVisible ? (
                  // <Image
                  //   imageStyle={{ resizeMode: 'stretch' }}
                  //   source={require('../../assets/profile2.png')}
                  //   style={[styles.profile, {}]}></Image>
                  <ProfileImg />
                ) : (
                  // <Image
                  //   imageStyle={{ resizeMode: 'stretch' }}
                  //   source={require('../../assets/profile.png')}
                  //   style={[styles.profile, {}]}>
                  // </Image>
                  <ProfileImg />
                )}
              </View>
            )}
            <View style={{alignSelf: 'center', width: '75%', marginTop: 80}}>
              <Text style={styles.info}>
                So, you’re flying solo, if you want to add someone just tap the
                + button above to send a request.
              </Text>
              <Text style={[styles.info, {marginTop: 10}]}>
                Click below to find out how things change when you add a partner
              </Text>
            </View>
          </ScrollView>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              bottom: '5%',
              // bottom: windowHeight / 12,
            }}>
            <Modal
              animationType="none"
              transparent={true}
              visible={toolTipVisible}
              onRequestClose={() => {
                setToolTipVisible(false);
              }}>
              <View
                style={{
                  backgroundColor: 'transparent',
                  flex: 1,
                  alignItems: 'flex-end',
                }}>
                <View
                  style={[
                    styles.touchableview1,
                    {
                      width: '80%',
                      position: 'absolute',
                      bottom: windowHeight / 3,
                    },
                  ]}>
                  <TouchableOpacity onPress={() => setToolTipVisible(false)}>
                    <Image
                      source={require('../../assets/close2.png')}
                      style={{
                        alignSelf: 'flex-end',
                        marginTop: 10,
                        marginRight: 10,
                      }}
                    />
                  </TouchableOpacity>
                  <ScrollView>
                    <Text style={[styles.popup, {}]}>
                      When you add a partner to prtnr, all of your information
                      stays with you. You’re always allowed to decide what you
                      want to share with your partner. Responses to questions
                      such as “How are you feeling?” etc. They are still
                      initially private, although, in the long run, it might
                      make sense to let them know that you had a rough week or
                      you had a tough day. That way, they can support you, and
                      then the app can help suggest things that they can do to
                      make you feel better. Regardless, everything else is
                      private in the app until you decide to share it. This
                      includes who you are connected to or how many partners you
                      add; it’s all up to you.
                    </Text>
                  </ScrollView>
                </View>
              </View>
            </Modal>

            {right == 'right' ? (
              <TouchableOpacity
                onPress={() => setToolTipVisible(true)}
                style={[
                  styles.button,
                  {
                    marginBottom: 20,
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                    alignSelf: 'flex-end',
                  },
                ]}>
                <Text style={styles.buttontext}>
                  What happens when I add a prtnr?
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setToolTipVisible(true)}
                style={[
                  styles.button,
                  {
                    marginBottom: 20,
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    alignSelf: 'flex-start',
                    alignItems: 'flex-end',
                  },
                ]}>
                <Text style={styles.buttontext}>
                  What happens when I add a prtnr?
                </Text>
              </TouchableOpacity>
            )}
            <Modal
              animationType="none"
              transparent={true}
              visible={open}
              onRequestClose={() => {
                setOpen(false);
              }}>
              <View
                style={{
                  backgroundColor: 'transparent',
                  flex: 1,
                  alignItems: 'flex-end',
                }}>
                <View
                  style={[
                    styles.touchableview1,
                    {
                      width: '80%',
                      position: 'absolute',
                      bottom: windowHeight / 3,
                    },
                  ]}>
                  <TouchableOpacity onPress={() => setOpen(false)}>
                    <Image
                      source={require('../../assets/close2.png')}
                      style={{
                        alignSelf: 'flex-end',
                        marginTop: 10,
                        marginRight: 10,
                      }}
                    />
                  </TouchableOpacity>
                  <ScrollView>
                    <Text
                      style={[
                        styles.popup,
                        {
                          fontWeight: '600',
                          fontFamily: font.QuicksandM,
                        },
                      ]}>
                      What can your partner see when you connect?{' '}
                    </Text>
                    <Text style={styles.popup}>
                      When you add a partner to prtnr, all of your personal
                      information still stays with you.
                    </Text>
                    <Text style={styles.popup}>
                      You’re always allowed to decide what you want to share
                      with your partner.
                    </Text>
                    <Text style={styles.popup}>
                      Later you can decide to share your feelings with prtnr, so
                      it can help your prtnr make better choices for how you
                      feel i.e buy you dinner on a bad day at work.{' '}
                    </Text>
                  </ScrollView>
                </View>
              </View>
            </Modal>
            {right == 'right' ? (
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={[
                  styles.button,
                  {
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                    alignSelf: 'flex-end',
                  },
                ]}>
                <Text style={styles.buttontext}>What can they see?</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={[
                  styles.button,
                  {
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    alignSelf: 'flex-start',
                    alignItems: 'flex-end',
                  },
                ]}>
                <Text style={styles.buttontext}>What can they see?</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              // ;
              // navigation.navigate('Otherprofile1')
              style={styles.nextBtn}
              onPress={() =>
                navigation.navigate('NewHomeScreen', {right: right})
              }>
              <Text style={styles.btnText}>Let's Start</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default MyComponent;

// firebase.getUserdata((userResult) => {

//   console.log('userResult:--->', userResult);

//   if (userResult !== 'error') {
//     setProfileImage(userResult.profileImg);
//     setUsername(userResult.firstname);
//     UserStorage.userRefId = userResult.userRefId;
//   }
//   setIsLoader(false);
// });
