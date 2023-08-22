import React, {useEffect, useState, useCallback, useRef, useMemo} from 'react';
import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
  Platform,
  Alert,
  Pressable,
  PanResponder,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import Header from './Components/Header';
import Sections from './Components/Sections';
import strings from '../../utils/strings';
import styles from './styles';
import {wp, hp} from '../../utils/size';
import firebase from '../../api/firebase';
import ActivityIndicator from '../../components/ActivityIndicator';
import UserStorage from '../../Data/UserStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Google from '../../GoogleSignIn/Google';
import SortableList from 'react-native-sortable-list';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
//Toast
import {useToast} from 'react-native-toast-notifications';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import UserProfileModal from '../../component/UserProfileModal';

const window = Dimensions.get('window');

function ChoiceItem(props) {
  const {active, data} = props;

  const activeAnim = useRef(new Animated.Value(0));
  const style = useMemo(
    () => ({
      ...Platform.select({
        ios: {
          transform: [
            {
              scale: activeAnim.current.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.07],
              }),
            },
          ],
          shadowRadius: activeAnim.current.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [
            {
              scale: activeAnim.current.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.07],
              }),
            },
          ],
          // elevation: activeAnim.current.interpolate({
          //   inputRange: [0, 1],
          //   outputRange: [2, 6],
          // }),
        },
      }),
    }),
    [],
  );
  useEffect(() => {
    Animated.timing(activeAnim.current, {
      duration: 300,
      easing: Easing.bounce,
      toValue: Number(active),
      useNativeDriver: true,
    }).start();
  }, [active]);

  return (
    <Animated.View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: 16,
          // height: 80,
          flex: 1,
          // marginTop: 7,
          // marginBottom: 12,
          // borderRadius: 4,
          ...Platform.select({
            ios: {
              width: window.width - 30 * 2,
              shadowColor: 'rgba(0,0,0,0.2)',
              shadowOpacity: 1,
              shadowOffset: {height: 2, width: 2},
              shadowRadius: 2,
            },
            android: {
              width : '100%',
              // width: window.width - 30 * 2,
              elevation: 0,
              // marginHorizontal: 30,
            },
          }),
        },
        style,
      ]}>
      <View style={{flex:0.1}}>
      <Text style={styles.choiceTitle}>{`${data.label}`}</Text>
      </View>
      <View style={{marginLeft : wp(2), marginRight : wp(5)}}>
      <Image
        imageStyle={{resizeMode: 'stretch'}}
        style={{
          height: 10,
          width: 22,
          // marginHorizontal: wp(2),
          alignSelf: 'center',
        }}
        source={require('../../assets/drag-handle.png')}
      />
      </View>
      <View style={{flex: 1}}>
      <Text style={[styles.choiceTitle,{fontSize : 20}]}>{`${data.answer}`}</Text>

      </View>
    </Animated.View>
  );
}

const NewHomeScreen = ({route, navigation}) => {
  const isRightHand = route?.params?.right == 'right' ? 'right' : 'left';
  const [popUp, setPopup] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  //Girish Chauhan
  const [isPartner, setIsPartners] = useState(false);
  const [partners, setPartners] = useState([]);
  const [prtnrName, setPrtnrName] = useState('');
  const [prtnrImage, setPrtnrImage] = useState('');
  const [prtnrsecondImage, setIsprtnrsecondImage] = useState('');
  const [isLoader, setisLoader] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);
  const [choicesModalVisible, setChoicesModalVisible] = useState(false);
  const [secondImg, setIssecondImage] = useState(false);
  const [prtnrRefId, setIsPartnersRefId] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [inviteUserData, setInviteUserData] = useState('');
  const [question, setQuestion] = useState(
    'What is today drink for dinner? dsf sdfds fds fds ds dsf ds fdsfds f',
  );
  const [firstAnswer, setFirstAnswer] = useState('Cappuccino');
  const [secondAnswer, setSecondAnswer] = useState('Red Tea');
  const [thirdAnswer, setThirdAnswer] = useState('Beer');

  const [tasks, setIsTasks] = useState([]);

  const [taskTexy1, setIsTaskText1] = useState('Ask them how their day was?');
  const [taskId1, setIsTaskId1] = useState('1');

  const [taskTexy2, setIsTaskText2] = useState(
    'Figure out dinner before they ask about it and tell them it’s taken care of as they are on their way home.',
  );
  const [taskId2, setIsTaskId2] = useState('2');

  const [taskTexy3, setIsTaskText3] = useState(
    "Write a note and leave it in their coat pocket and let them know that they are very special to you and your life wouldn't be the same without them. You could probably write something better than that but I'm just saying.",
  );
  const [taskId3, setIsTaskId3] = useState('3');

  const [localDate, setIslocalDate] = useState('');
  const Toast = useToast();
  const isFocused = useIsFocused();

  // const [data, setdata] = useState([
  //   {text: 'Ask them how their day was?'},
  //   {
  //     text: 'Figure out dinner before they ask about it and tell them it’s taken care of as they are on their way home.',
  //   },
  //   {
  //     text: "Write a note and leave it in their coat pocket and let them know that they are very special to you and your life wouldn't be the same without them. You could probably write something better than that but I'm just saying.",
  //   },
  //   {text: 'Send a random text message'},
  //   {
  //     text: 'Figure out dinner before they ask about it and tell them it’s taken care of as they are on their way home.',
  //   },
  //   {text: 'Send a random text message'},
  //   {
  //     text: "Write a note and leave it in their coat pocket and let them know that they are very special to you and your life wouldn't be the same without them. You could probably write something better than that but I'm just saying.",
  //   },
  // ]);

  // const [choicesData, setChoicesData] = useState([
  //   {key: 'item-0', label: 1, answer: firstAnswer},
  //   {key: 'item-1', label: 2, answer: secondAnswer},
  //   {key: 'item-2', label: 3, answer: thirdAnswer},
  // ]);

  const [choicesData] = useState({
    0: {
      label: '1',
      answer: 'firstAnswer',
    },
    1: {
      label: '2',
      answer: 'secondAnswer',
    },
    2: {
      label: '3',
      answer: 'thirdAnswer',
    },
  });

  // choiceItem = ({item, index, move, moveEnd, isActive}) => {
  //   return (
  //     <TouchableOpacity
  //       style={{
  //         height: 100,
  //         // backgroundColor: isActive ? 'blue' : item.backgroundColor,
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //       }}
  //       onLongPress={move}
  //       onPressOut={moveEnd}>
  //       <View style={styles.rowContainerChoice}>
  //         <Text style={[styles.choiceTitle, {marginLeft: wp(2)}]}>
  //           {`${index}`}
  //         </Text>
  //         <Image
  //           imageStyle={{resizeMode: 'stretch'}}
  //           style={{
  //             height: 10,
  //             width: 22,
  //             marginLeft: wp(2),
  //             alignSelf: 'center',
  //           }}
  //           source={require('../../assets/drag-handle.png')}
  //         />
  //         <Text style={[styles.modalText, {marginLeft: wp(6)}]}>
  //           {`${answer}`}
  //         </Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  const renderChoice = useCallback(({data, active}) => {
    return <ChoiceItem data={data} active={active} />;
  }, []);

  //Girish Chauhan...
  const showToastMsg = (msg = 'Something went wrong...', duration1 = 2000) => {
    Toast.hideAll();
    Toast.show(msg, {
      type: 'normal',
      placement: 'center',
      duration: duration1,
      offset: 30,
      animationType: 'slide-in | zoom-in',
    });
  };
  const getCurrentdate = () => {
    // var date = moment()
    //   .utcOffset('+05:30')
    //   .format('YYYY-MM-DD hh:mm:ss a');
    const date = moment().utcOffset('+05:30').format('MMM-DD-YYYY');
    setIslocalDate(date);
  };
  const getPartners = async () => {
    try {
      setisLoader(true);
      firebase.getPartnersData(UserStorage.userRefId, async response => {
        if (response != null && response.length > 0) {
          setIsPartners(true);
          const ptrnrname = response[0].firstname;
          const prtnimg = response[0].imageUrl;
          const prRefId = response[0].prtnrRefId;
          setIsPartnersRefId(prRefId);
          setPrtnrImage(prtnimg);
          setPrtnrName(ptrnrname);
          if (
            response[0].secondimageUrl != null ||
            response[0].secondimageUrl != ''
          ) {
            const sImg = response[0].secondimageUrl;
            setIsprtnrsecondImage(sImg);
          }
        } else {
          showToastMsg('You have no any partner...');
          setIsPartners(false);
        }
        setisLoader(false);
      });
    } catch (error) {
      setisLoader(false);
      console.log('eroor', error);
    }
  };
  const getTaskFromserver = async () => {
    firebase
      .getPrtnrTasks(response => {
        if (response !== 'error') {
          if (response.length !== null && response.length > 0) {
            setIsTasks(response);
          }
        }
      })
      .then(() => {
        if (tasks.length > 2) {
          setIsTaskText1(tasks[0].task);
          setIsTaskId1(tasks[0].id);
          setIsTaskId2(tasks[1].id);
          setIsTaskText2(tasks[1].task);
          setIsTaskId3(tasks[2].id);
          setIsTaskText3(tasks[2].task);
        }
      });
  };

  useEffect(() => {
    if (isFocused) {
      getCurrentdate();
      getPartners();
      getTaskFromserver();
    }
  }, [isFocused]);

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

  const handleDynamicLink = useCallback(
    async link => {
      if (link.url) {
        if (link.url.split('/')[3]) {
          /* firebase.getInvitePartner(link.url.split('/')[3], response => {
            const userName = response.firstname;
            createAlert(userName);
            setInviteUserData(response);
          }); */
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
  }, [handleDynamicLink]);

  useEffect(() => {
    const fetchScreen = async () => {
      const getInitialLink = await dynamicLinks().getInitialLink();
      if (getInitialLink !== null) {
        if (getInitialLink.url) {
          if (getInitialLink.url.split('/')[3]) {
            /* firebase.getInvitePartner(
              getInitialLink.url.split('/')[3],
              response => {
                const userName = response.firstname;
                createAlert(userName);
                setInviteUserData(response);
              },
            ); */
            firebase.getInviteUser(
              getInitialLink.url.split('/')[3],
              response => {
                const userName = response.firstname + ' ' + response.lastname;
                createAlert(userName);
                setInviteUserData(response);
              },
            );
          }
        }
      }
    };
    fetchScreen();
  }, [navigation]);

  const MenuButton = props => {
    const {onPress, title, dot} = props;
    return (
      <TouchableOpacity style={styles.menuBtn} onPress={onPress}>
        <Text style={styles.menuBtnText}>{title}</Text>
        {dot && <View style={styles.redDot} />}
      </TouchableOpacity>
    );
  };
  const navigateTo = screen => {
    setMenuOpen(false);
    navigation.navigate(screen);
  };
  const logoutPressed = async () => {
    await AsyncStorage.setItem('REGISTRATION', 'logout');
    setisLoader(true);
    Google._signOut(signOut => {
      if (signOut) {
        showToastMsg('Google signOut...');
        navigateTo('Login');
      } else {
        navigateTo('Login');
      }
      setisLoader(false);
    });
  };
  //IMAGE
  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const imageGalleryLaunch = () => {
    try {
      setTimeout(
        () =>
          launchImageLibrary(options, res => {
            if (res.didCancel) {
              console.log('User cancelled image picker');
            } else if (res.error) {
              console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
              console.log('User tapped custom button: ', res.customButton);
              alert(res.customButton);
            } else {
              if (secondImg == true) {
                setIsprtnrsecondImage(res.assets[0].uri);
              } else {
                setPrtnrImage(res.assets[0].uri);
              }

              uploadPartnerImage(res.assets[0].uri);
            }
          }),
        400,
      );
    } catch (error) {
      console.warn('error', error);
    }
  };
  const cameraLaunch = () => {
    launchCamera(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        showToastMsg('ImagePicker Error');
      } else if (res.customButton) {
        alert(res.customButton);
      } else {
        //setImg(res.assets[0].uri);
        if (secondImg == true) {
          setIsprtnrsecondImage(res.assets[0].uri);
        } else {
          setPrtnrImage(res.assets[0].uri);
        }
        uploadPartnerImage(res.assets[0].uri);
      }
    });
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        cameraLaunch();
      } else {
        showToastMsg('Camera permission not granted...');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const checkReadContactsPermission = async () => {
    const result = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );

    if (result == true) {
      cameraLaunch();
    } else {
      requestCameraPermission();
    }
  };
  const requestStorage = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        imageGalleryLaunch();
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        imageGalleryLaunch();
      } else {
        console.log(granted);
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const checkSTORAGE = async () => {
    if (Platform.OS == 'ios') {
      imageGalleryLaunch();
    } else {
      const result = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (result == true) {
        imageGalleryLaunch();
      }
      if (result == false) {
        requestStorage();
      }
    }
  };

  //UPLOAD PARTNER IMAGE
  const uploadPartnerImage = async filename => {
    if (!filename) {
      return;
    }
    if (prtnrRefId !== '') {
      setisLoader(true);
      firebase.uploadImage('Partners', filename, result => {
        if (result == 'error') {
          showToastMsg('something went wrong...');
        } else {
          if (!secondImg) {
            // setPrtnrImage(result);
            firebase.updatePartnerImage(result, false, prtnrRefId, response => {
              if (response === 'error') {
                showToastMsg(
                  'Please add the partner before uploading an image of the partner',
                  3000,
                );
              }
            });
          } else {
            //for second image
            // setIsprtnrsecondImage(result);
            firebase.updatePartnerImage(result, true, prtnrRefId, response => {
              if (response === 'error') {
                showToastMsg('something went wrong...');
              }
            });
          }
        }
        setisLoader(false);
      });
    } else {
      showToastMsg(
        'Please add the partner before uploading an image of the partner',
        3000,
      );
    }
  };

  const Draggable = ({index, answer}) => {
    const pan = useState(new Animated.ValueXY())[0];
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: false,
        }).start();
      },
    });

    return (
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        }}>
        <View style={styles.rowContainerChoice}>
          <Text style={[styles.choiceTitle, {marginLeft: wp(2)}]}>
            {`${index}`}
          </Text>
          <Image
            imageStyle={{resizeMode: 'stretch'}}
            style={{
              height: 10,
              width: 22,
              marginLeft: wp(2),
              alignSelf: 'center',
            }}
            source={require('../../assets/drag-handle.png')}
          />
          <Text style={[styles.modalText, {marginLeft: wp(6)}]}>
            {`${answer}`}
          </Text>
        </View>
      </Animated.View>
    );
  };

  const _renderImageModal = () => {
    return (
      <Modal animationType="none" transparent={true} visible={imageOpen}>
        <View style={styles.Modalview}>
          <View style={styles.ModalItem}>
            <TouchableOpacity
              onPress={() => {
                // setopen(!open);
                setImageOpen(!imageOpen);
              }}
              style={styles.close}>
              <Image
                imageStyle={{resizeMode: 'stretch'}}
                style={{height: 10, width: 10}}
                source={require('../../assets/close3.png')}
              />
            </TouchableOpacity>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => {
                  checkReadContactsPermission(), setImageOpen(!imageOpen);
                }}>
                <Image
                  imageStyle={{resizeMode: 'stretch'}}
                  style={styles.Icon}
                  source={require('../../assets/camera.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  checkSTORAGE(), setImageOpen(!imageOpen);
                }}>
                <Image
                  imageStyle={{resizeMode: 'stretch'}}
                  style={styles.Icon}
                  source={require('../../assets/gallery.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const _renderChoicesModal = () => {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={choicesModalVisible}>
        <View style={styles.modalBase}>
          <View style={styles.modalInnerContainer}>
            <View style={[styles.rowContainer,{justifyContent : 'space-between'}]}>
              <Text style={styles.modalText}>{`${question}`}</Text>
              <TouchableOpacity
                onPress={() => setChoicesModalVisible(false)}
                style={{
                  height: 25,
                  width: 25,
                  alignItems: 'flex-end',
                  marginHorizontal: 5,
                }}>
                <Image
                  imageStyle={{resizeMode: 'stretch'}}
                  style={{
                    height: 15,
                    width: 15,
                  }}
                  source={require('../../assets/close3.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={{borderWidth: 0}}>
              <SortableList
                contentContainerStyle={{
                  // width: window.width,
                  ...Platform.select({
                    ios: {
                      paddingHorizontal: 30,
                    },
                    android: {
                      paddingHorizontal: 0,
                    },
                  }),
                }}
                data={choicesData}
                renderRow={renderChoice}
              />
              {/* <Draggable index="1" answer={firstAnswer} />
              <Draggable index="2" answer={secondAnswer} />
              <Draggable index="3" answer={thirdAnswer} /> */}
              <Pressable onPress={() => {}} style={styles.sendBtn}>
                <Text
                  style={
                    [styles.btnText,{padding : 5}]
                  }>{`Save order and send to ${prtnrName}`}</Text>
              </Pressable>
            </View>
            <View />
          </View>
        </View>
      </Modal>
    );
  };

  const _renderMenuModal = () => {
    return (
      <Modal visible={menuOpen} transparent={true}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>
          <View
            style={[
              styles.menuBox,
              isRightHand && {right: wp(5), left: wp(5)},
            ]}>
            <MenuButton
              title={'Change Prtnr'}
              onPress={() => navigateTo('ChangePartner')}
              //dot
            />
            <MenuButton
              title={'Games'}
              onPress={() => navigateTo('DinnerChoices')}
            />
            <MenuButton title={'Forums'} onPress={() => {}} />
            <MenuButton title={'Settings'} onPress={() => navigateTo('Tabs')} />
            <MenuButton
              title={'Logout'}
              onPress={() => {
                logoutPressed();
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => setMenuOpen(false)}
            style={[
              styles.menuIcCon,
              isRightHand && {right: wp(3), left: wp(3)},
            ]}>
            <Image
              style={styles.menuIc}
              resizeMode="contain"
              source={require('../../assets/ic_menu.png')}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  //Girish Chauhan
  const addPartner = () => {
    navigation.navigate('Otherprofile1');
  };
  const taskRefreshed = id => {
    let randomValue = {};
    let randomArray = tasks.filter(task => task.id !== id);
    randomValue = randomArray[Math.floor(Math.random() * randomArray.length)];
    setIsTaskText1(randomValue.task);
    setIsTaskId1(randomValue.id);
  };
  const taskRefreshed1 = id => {
    let randomValue = {};
    let randomArray = tasks.filter(task => task.id !== id);
    randomValue = randomArray[Math.floor(Math.random() * randomArray.length)];
    setIsTaskText2(randomValue.task);
    setIsTaskId2(randomValue.id);
  };
  const taskRefreshed2 = id => {
    let randomValue = {};
    let randomArray = tasks.filter(task => task.id !== id);
    randomValue = randomArray[Math.floor(Math.random() * randomArray.length)];
    setIsTaskText3(randomValue.task);
    setIsTaskId3(randomValue.id);
  };

  return (
    <>
      <ActivityIndicator visible={isLoader} />
      <View style={styles.container}>
        <SafeAreaView />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header />
          {inviteUserData && showProfileModal ? (
            <UserProfileModal
              user={inviteUserData}
              visible={showProfileModal}
              onClose={() => setShowProfileModal(false)}
              onAccept={() => {
                //navigateTo('ChangePartner');
                const prtnrData = {
                  firstname: inviteUserData.firstname,
                  dateOfbirth: moment(inviteUserData.dateOfbirth).format(
                    'MMM-DD-YYYY',
                  ),
                  imageUrl: inviteUserData.profileImg,
                  relationType: 'Intimate',
                  age: '',
                  gender: '',
                };
                firebase.addPartner(prtnrData, result => {
                  if (result === 'success') {
                    getPartners();
                    const selected = true;
                    firebase.partnerChoosed(
                      selected,
                      UserStorage.userRefId,
                      response => {
                        console.log('=partnerChoosed=', response);
                      },
                    );
                    setShowProfileModal(false);
                  } else {
                    showToastMsg('Something went wrong...');
                  }
                });
                //addPartner(prtnrData);
              }}
              onDecline={() => setShowProfileModal(false)}
            />
          ) : null}
          <View style={styles.profile}>
            {popUp && (
              <>
                <View style={styles.connectPopup}>
                  <Text style={styles.connectText}>
                    {isPartner ? 'Connected' : 'Add Partner'}
                  </Text>
                  <View style={[styles.triangle, styles.arrowDown]} />
                </View>
              </>
            )}
            <View style={[styles.profileNameCon]}>
              <View style={{flex: 1}}>
                <Text style={[styles.profileNameText]}>
                  {isPartner ? prtnrName : strings.profileName}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                {/*Connect Icon */}
                {isPartner ? (
                  <TouchableOpacity style={styles.connectIcCon}>
                    <Image
                      style={styles.connectIc}
                      resizeMode="contain"
                      source={require('../../assets/ic_dot_circle.png')}
                    />
                  </TouchableOpacity>
                ) : null}
                {true || isPartner ? (
                  question ? (
                    <TouchableOpacity
                      onPress={() => setChoicesModalVisible(true)}
                      style={[styles.connectIcCon, {marginHorizontal: 10}]}>
                      <Image
                        style={styles.connectIc}
                        resizeMode="contain"
                        source={require('../../assets/games_w_icon.png')}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => navigateTo('DinnerChoices')}
                      style={[styles.connectIcCon, {marginHorizontal: 10}]}>
                      <Image
                        style={styles.connectIc}
                        resizeMode="contain"
                        source={require('../../assets/ic_dots.png')}
                      />
                    </TouchableOpacity>
                  )
                ) : null}
                {isPartner ? (
                  <TouchableOpacity
                    onPress={() => setPopup(!popUp)}
                    style={styles.connectIcCon}>
                    <Image
                      style={styles.connectIc}
                      resizeMode="contain"
                      source={require('../../assets/ic_connect.png')}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      addPartner();
                      setPopup(!popUp);
                    }}
                    style={styles.connectIcCon}>
                    <Image
                      style={styles.connectIc}
                      resizeMode="contain"
                      source={require('../../assets/plusB.png')}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.imagesSectionCon} />
            <TouchableOpacity
              style={styles.horizontalImageCon}
              onPress={() => {
                setIssecondImage(false), setImageOpen(!imageOpen);
              }}>
              {isPartner && prtnrImage ? (
                <Image
                  imageStyle={{resizeMode: 'cover'}}
                  source={{uri: prtnrImage}}
                  style={[styles.horizontalImage, {}]}
                />
              ) : (
                <Text style={styles.horizontalImageText}>
                  {strings.HORIZONTALIMAGETEXT}
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.verticalImageCon}
              onPress={() => {
                setIssecondImage(true), setImageOpen(!imageOpen);
              }}>
              {isPartner && prtnrsecondImage ? (
                <Image
                  imageStyle={{resizeMode: 'cover'}}
                  source={{uri: prtnrsecondImage}}
                  style={[styles.horizontalImage, {}]}
                />
              ) : (
                <Text style={styles.verticalImageText}>
                  {strings.VERTICALIMAGETEXT}
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.tasksCon}>
            <Text style={styles.tasksText}>Tasks - 0/6</Text>
            <Text style={styles.dateDayText}>{localDate}</Text>
          </View>
          <Sections
            indexText={'1'}
            ptText={'pt'}
            sectionText={taskTexy1}
            onPress={() => taskRefreshed(taskId1)}
          />
          <Text
            style={[
              styles.tasksText,
              {
                fontSize: 14,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              },
            ]}>
            Don't like the suggestion just press refresh
          </Text>
          <Sections
            indexText={'2'}
            ptText={'pts'}
            sectionText={taskTexy2}
            onPress={() => taskRefreshed1(taskId2)}
          />

          <Sections
            indexText={'3'}
            ptText={'pts'}
            sectionText={taskTexy3}
            onPress={() => taskRefreshed2(taskId3)}
          />
          <Text style={styles.forumsText}>{strings.FORUMS}</Text>
          <View style={styles.forumCon}>
            <Text style={styles.blogText}>
              “She sold my dog while I was on a work trip. Should she leave like
              she made my dog leave”
            </Text>
            <Text style={styles.authorText}>- Walid Johnson</Text>
            <View
              style={{
                alignSelf: 'flex-end',
                marginEnd: '3%',
              }}>
              <Text style={styles.forumBottomText}>Go to Forums</Text>
            </View>
          </View>
          <View style={{height: 10, width: '100%'}} />
        </ScrollView>
        <TouchableOpacity
          onPress={() => setMenuOpen(true)}
          style={[
            styles.menuIcCon,
            isRightHand && {right: wp(3), left: wp(3)},
          ]}>
          <Image
            style={styles.menuIc}
            resizeMode="contain"
            source={require('../../assets/ic_menu.png')}
          />
        </TouchableOpacity>
        {_renderMenuModal()}
        {_renderImageModal()}
        {_renderChoicesModal()}
        <SafeAreaView />
      </View>
    </>
  );
};

export default NewHomeScreen;

// setisLoader(true);
// localStorage.getPartnerFromlocal().then((jsonValue) => {
//   if (jsonValue !== null) {
//     setIsPartners(true);
//     setPrtnrImage(jsonValue['imageUrl']);
//     setPrtnrName(jsonValue['firstname']);
//     setisLoader(false);
//     localStorage.getSecondPrtnrFromlocal().then((secondPrtnr) => {

//       if (secondPrtnr !== null) {
//         setSecondPrtnrImg(jsonValue['imageUrl']);
//       }
//       else {

//       }
//     });

//   }
//   else {
//     try {
//       // setisLoader(true);
//       firebase.getPartnersData(UserStorage.userRefId, async (response) => {
//         if (response != null && response.length > 0) {
//           setIsPartners(true);
//           const ptrnrname = response[0]['firstname'];
//           const prtnimg = response[0]['imageUrl'];
//           setPrtnrImage(prtnimg);
//           setPrtnrName(ptrnrname);
//           const value = response[0];
//           localStorage.setPartnerTolocal(value);
//           if (response.length > 1) {
//             const jsnValue = response[1];
//             const secondImg = response[1]['imageUrl'];
//             setSecondPrtnrImg(secondImg);
//             localStorage.setSecondPrtnrTolocal(jsnValue);
//           }
//         }
//         else {
//           setIsPartners(false);
//         }
//         setisLoader(false);
//       })

//     } catch (error) {
//       console.log('eroor', error);
//     }
//   }
// });

// if (ChoosedPrtnr.partnerRefId !== "") {
//   let selectedPrtnr = response.filter(prtnr => prtnr.prtnrRefId == ChoosedPrtnr.partnerRefId);
//   if (selectedPrtnr.length > 0) {
//     const ptrnrname = selectedPrtnr[0]['firstname'];
//     const prtnimg = selectedPrtnr[0]['imageUrl'];
//     setPrtnrImage(prtnimg);
//     setPrtnrName(ptrnrname);
//   }
//   let otherPrtnr = response.filter(prtnr => prtnr.prtnrRefId !== ChoosedPrtnr.partnerRefId);
//   if (otherPrtnr.length > 0) {
//     const secondImg = otherPrtnr[0]['imageUrl'];
//     setSecondPrtnrImg(secondImg);
//   }
// }
// else {
//   const ptrnrname = response[0]['firstname'];
//   const prtnimg = response[0]['imageUrl'];
//   const prRefId = response[0]['prtnrRefId'];
//   setIsPartnersRefId(prRefId);
//   setPrtnrImage(prtnimg);
//   setPrtnrName(ptrnrname);
//   if (response.length > 1) {
//     const jsnValue = response[1];
//     const secondImg = response[1]['imageUrl'];
//     setSecondPrtnrImg(secondImg);
//   }
// }
