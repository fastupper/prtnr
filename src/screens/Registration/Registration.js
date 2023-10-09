//import liraries
import React, {
  Component,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Platform,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import Textinput from '../../component/textinput';
import font from '../../utils/CustomFont';
import styles from './Styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwitchToggle from 'react-native-switch-toggle';
import Lefthandsvg from '../../assets/svg/lefthand.svg';
import Righthandsvg from '../../assets/svg/righthand.svg';
import Backarrow from '../../assets/svg/arrowback';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Card} from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {useToast} from 'react-native-toast-notifications';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//validation by girish
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
import * as Yup from 'yup';
import ActivityIndicator from '../../components/ActivityIndicator';
import firebase from '../../api/firebase';
import localStorage from '../../api/localStorage';
//Biometrics...
import Biomatric from '../Biometerics/Biometric';
import Slider from '@react-native-community/slider';
import CheckBox from 'react-native-check-box';
import SelectDropdown from 'react-native-select-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import {Backend_api_endpoint} from '../../utils/config';
import axios from 'axios';

const FirstRoute = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} />;

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const screenHeight = Dimensions.get('window').height;

const MyComponent = ({navigation, route}) => {
  try {
    var isGoogle = route.params.isGoogle;
    var isVerified = route.params.isVerified;
  } catch (error) {
    let previousCaller = error.previousCaller;
    if (!typeof error.previousCaller == 'undefined')
      //this will now only run if error.previousCaller is defined.
      console.error(error.previousCaller.name);
  }

  const OTPInput = useRef(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTO, setisTO] = useState(true);
  const [name, setname] = useState('');

  const [lastname, setlastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setphone] = useState('');
  const [birthday, setBirthday] = useState('Birth Date');
  const [isEnabled, setIsEnabled] = useState(false);
  const [checked, setChecked] = React.useState('first');
  const [on, off] = React.useState(false);
  const [right, setrRight] = useState('true');
  const [text, settext] = useState('');
  const [img, setImg] = useState('');
  const [open, setopen] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  //Girish
  const [isPfoileImg, setIsprfileImg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImg, setProfileImg] = useState('../../assets/user.png');
  const Toast = useToast();
  const [BioMatricModal, setBioMatricModal] = useState(false);
  const [isBiometric, setIsBiometric] = useState(false);
  const [verifyCodeError, setVerifyCodeError] = useState('');
  const [isViewedTerm, setIsViewedTerm] = useState(false);
  // const layout = useWindowDimensions();

  // const [tabIndex, setTabIndex] = React.useState(0);
  // const [tabRoutes] = React.useState([
  //   { key: 'first', title: 'First' },
  //   { key: 'second', title: 'Second' },
  // ]);

  // Step Form Buttons
  const [sliderValue, setSliderValue] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [verifyCode, setVerifyCode] = useState('');
  const [handed, setHanded] = useState('Right');
  const [langType, setLangType] = useState('Sugar');
  const [clear, setClear] = useState(false);

  // const stepButton1 = () => <TouchableOpacity
  //   style={styles.stepBtn}
  //   onPress={this.onPress}
  // >
  //   <Text> INFO </Text>
  // </TouchableOpacity>
  // const stepButton2 = () => <Button title="VERIFY" type="clear" />
  // const stepButton3 = () => <Button title="SETTINGS" type="clear" />
  // const stepButton4 = () => <Button title="START" type="clear" />
  // const stepButtons = [{ element: stepButton1 }, { element: stepButton2 }, { element: stepButton3 }, { element: stepButton4 }]

  const handleStepIndex = selectedIndex => {
    setStepIndex(selectedIndex);
  };

  const getGoogleSignIn = () => {
    if (isGoogle) {
      localStorage.getGoogleSignedData().then(response => {
        setProfileImg(response['photo']);
        setImg(response['photo']);
        setname(response['givenName']);
        setEmail(response['email']);
        setlastname(response['familyName']);
      });
    }
  };
  useEffect(() => {
    getGoogleSignIn();
  }, []);

  const nextStep = useCallback(index => {
    setStepIndex(index);
    setSliderValue(index);
  }, []);

  const handleConfirm = date => {
    if (moment(date).format('ll') === moment(new Date()).format('ll')) {
      showToastMsg('date of birth should be  18 years.');
      hideDatePicker();
      return;
    }
    if (isTO) {
      setBirthday(moment(date).format('ll'));
    }
    hideDatePicker();
  };
  const Hand = async item => {
    await AsyncStorage.setItem('Hand', item);
    // const result = await AsyncStorage.getItem('Hand');
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const cameraLaunch = () => {
    launchCamera(options, res => {
      if (res.errorCode) {
        //console.warn('Camera unavailable');
        showToastMsg('Camera unavailable');
      } else if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        setImg(res.assets[0].uri);
        uploadImage(res.assets[0].uri);
      }
    });
  };
  const imageGalleryLaunch = async () => {
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
            setImg(res.assets[0].uri);
            uploadImage(res.assets[0].uri);
          }
        }),
      500,
    );
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        cameraLaunch();
      } else {
        console.log(granted);
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const checkOpenCameraPermission = async () => {
    if (Platform.OS == 'ios') {
      cameraLaunch();
    } else {
      const result = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (result == true) {
        cameraLaunch();
      } else {
        requestCameraPermission();
      }
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
  //Girish Chauhan...
  const showToastMsg = (
    msg = 'Something went wrong...',
    position = 'center',
  ) => {
    Toast.hideAll();
    Toast.show(msg, {
      type: 'normal',
      placement: 'bottom',
      duration: 2000,
      offset: 30,
      animationType: 'slide-in | zoom-in',
    });
  };
  const uploadImage = async filename => {
    if (!filename) return;
    setIsLoading(true);
    firebase.uploadImage('Registration', filename, result => {
      if (result == 'error') {
        showToastMsg('Image uploading is faild...');
      } else {
        showToastMsg('uploaded successfully...');
        setProfileImg(result);
        setIsprfileImg(true);
      }
      setIsLoading(false);
    });
  };
  const writeUserData = async () => {
    const userData = {
      firstName: name,
      lastName: lastname,
      email,
      phone,
      birthday,
      langType,
      handed,
      profileImg,
      isBiometric,
      userRefId: '',
    };
    setIsLoading(true);
    firebase.userRegistration(userData, async result => {
      if (result.isSuccess === true) {
        right == 'true' ? Hand('right') : Hand('left');
        await AsyncStorage.setItem('REGISTRATION', 'success');
        navigation.navigate('Addpartner');
      } else {
        showToastMsg(`Error: ${error}`);
      }
      setIsLoading(false);
    });
  };
  const validateEmail = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  const handleVerify = (flag = 0) => {
    //const emailText = formikref.current.values.email;
    // if (email === '') {
    //   showToastMsg('Please enter email address to verify')
    //   return;
    // }
    console.log(flag);
    if (flag) setIsLoading(true);
    axios
      .post(`${Backend_api_endpoint}/send-mail`, {
        to: phone,
      })
      // .then(response => response.json())
      .then(responseData => {
        if (flag) {
          setIsLoading(false);
          showToastMsg('The verification sent to your phone again.');
        } else {
          nextStep(1);
        }
        console.log(responseData);
      })
      .catch(error => {
        console.log(error);
        showToastMsg('Error:', error);
        if (flag) setIsLoading(false);
      });
  };

  const handleVerifyCode = async code => {
    // nextStep(2);
    // return;
    console.log(code, Backend_api_endpoint);
    setIsLoading(true);
    axios
      .post(`${Backend_api_endpoint}/confirm-verification`, {
        phone: phone,
        verifCode: code,
      })
      // .then(response => response.json())
      .then(responseData => {
        if (responseData.data.title == 'true') {
          nextStep(2);
          showToastMsg('Validate successfully!');
        } else {
          setVerifyCodeError(responseData.message);
        }
        setIsLoading(false);
        console.log(responseData);
      })
      .catch(error => {
        console.log('Eror', error);
        showToastMsg('Error:', error);
        setIsLoading(false);
      });
  };

  const handleStep = currentIndex => {
    switch (currentIndex) {
      case 0:
        if (
          checked == null ||
          right == null ||
          name == null ||
          lastname == null ||
          email == null ||
          birthday == 'Birth Date' ||
          phone == null
        ) {
          showToastMsg('Please, fill all inputs.');
          // settext('Please, fill all inputs.');
          return;
        }
        // settext('');
        if (!validateEmail(email)) {
          showToastMsg('Please enter valid email address');
          return;
        }
        if (phone === '') {
          showToastMsg('Please enter valid phone number');
          return;
        }
        // else if (!isVerified) {
        //   showToastMsg('Please verify your email address');
        //   return;
        // }
        // writeUserData(name, lastname, email, phone, birthday);

        //       navigation.navigate('Addpartner');
        //       right == 'true' ? Hand('right') : Hand('left');
        nextStep(1);
        setTimeout(() => {
          OTPInput.current.focusField(0);
        }, 1000);
        handleVerify();
        break;
      case 1:
        if (verifyCode === '') {
          showToastMsg('Fill out the verification code');
          return;
        }
        handleVerifyCode(verifyCode);
        break;
      default:
        if (!isViewedTerm) {
          showToastMsg('You should check the term and conditions.');
          return;
        }
        writeUserData();
    }
    // if (userInfo == null) return
    // if (userInfo.phone === '') {
    //   showToastMsg('Phone number is required');
    //   return;
    // }
    // else if (checked === '') {
    //   showToastMsg('Please select conent type');
    //   return;
    // }
    // else if (!isPfoileImg) {
    //   showToastMsg('Please select profile image');
    //   return;
    // }
    // writeUserData(userInfo.name, userInfo.lastname, userInfo.email, userInfo.phone, birthday);
    // //navigation.navigate('Addpartner');
  };
  const isBiometricSupport = async () => {
    Biomatric.CallCheckBiomatrics(resultObject => {
      const {available} = resultObject;
      if (available) {
        Biomatric.CallAuthBiomatrics(async result => {
          if (result == true) {
            setIsBiometric(true);
            await AsyncStorage.setItem('PopUPEnable', JSON.stringify(result));
            await AsyncStorage.setItem('BIO_METRIC', JSON.stringify(result));
          } else if (result == false) {
            showToastMsg('Biometric authentication failed or cancel');
            off(!on);
          } else {
            showToastMsg('Biometric authentication error...');
          }
        });
      }
    });
  };
  const OpneModal = async onOpen => {
    if (onOpen === true) {
      Biomatric.CallCheckBiomatrics(async result => {
        const {available} = result;
        if (available) {
          let PopUPEnable = await AsyncStorage.getItem('PopUPEnable');
          if (PopUPEnable) {
            PopUPEnable = JSON.parse(PopUPEnable);
          }
          if (PopUPEnable === null || PopUPEnable === false) {
            setBioMatricModal(true);
          } else {
            showToastMsg('Biometric authentication turns ON');
          }
        } else {
          if (result == 'notSupport') {
            alert(
              'There was a problem setting up Biometric authentication on this devices. Please try again later...',
            );
          }
        }
      });
    }
  };
  const CallBack = async data => {
    setBioMatricModal(false);
    if (data === true) {
      isBiometricSupport();
    } else {
      setIsBiometric(false);
      await AsyncStorage.setItem('PopUPEnable', JSON.stringify(data));
      off(!on);
    }
  };
  const BiomatricModal = () => {
    return (
      <Modal animationType="none" transparent={true} visible={BioMatricModal}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              flexDirection: 'column',
              backgroundColor: 'white',
              margin: 20,
              padding: 20,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}>
            <Text style={{padding: 25, fontSize: 16, textAlign: 'center'}}>
              Do you want to allow prtnr App to use biometrci authentication ?
            </Text>
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => CallBack(true)}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>Enable</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => CallBack(false)}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>Skip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
          <View style={{minHeight: screenHeight}}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: 10,
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  styles.welcome,
                  {
                    fontSize: 19,
                    // alignContent: 'flex-end',
                    // display: 'flex',
                    textAlign: 'right',
                    marginTop: 0,
                    marginBottom: 0,
                    marginRight: 40,
                    color: '#020C19',
                  },
                ]}>
                prtnr
              </Text>
            </View>
            {stepIndex === 0 && (
              <Text style={styles.welcome}>Welcome to the show</Text>
            )}
            {stepIndex === 1 && (
              <Text style={styles.welcome}>Verification</Text>
            )}
            {stepIndex === 2 && <Text style={styles.welcome}>Settings</Text>}
            {stepIndex === 0 && (
              <View style={styles.setup}>
                <Text
                  style={[
                    styles.Account,
                    {
                      fontFamily: font.OpenSansR,
                      color: '#252323',
                      width: '100%',
                      fontSize: 15,
                    },
                  ]}>
                  {`Account confirmation and setup \nLet\’s confirm account settings, and a few other things to get you going.
              `}
                </Text>
              </View>
            )}
            {stepIndex === 1 && (
              <View style={styles.setup}>
                <Text
                  style={[
                    styles.Account,
                    {
                      fontFamily: font.OpenSansR,
                      color: '#252323',
                      width: '100%',
                      fontSize: 15,
                    },
                  ]}>
                  {`We sent you a unique code to your email to verify your account.
              `}
                </Text>
              </View>
            )}
            {stepIndex === 2 && (
              <View style={styles.setup}>
                <Text
                  style={[
                    styles.Account,
                    {
                      fontFamily: font.OpenSansR,
                      color: '#252323',
                      width: '100%',
                      fontSize: 15,
                    },
                  ]}>
                  {`Customize your experience to make things smooth for you.
              `}
                </Text>
              </View>
            )}

            <SafeAreaView style={{flex: 1}}>
              <View
                style={{
                  flex: 1,
                  paddingVertical: 15,
                  paddingHorizontal: 32,
                  justifyContent: 'center',
                  // backgroundColor: '#000000',
                }}>
                {/*Slider with max, min, step and initial value*/}
                <Slider
                  maximumValue={2}
                  minimumValue={0}
                  minimumTrackTintColor="#252323"
                  maximumTrackTintColor="#252323"
                  step={1}
                  value={sliderValue}
                  // onValueChange={
                  //   (sliderValue) => setSliderValue(sliderValue)
                  // }
                  // disabled
                />
              </View>
            </SafeAreaView>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flex: 1,
                // paddingVertical: 0,
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                // backgroundColor: '#000000',
              }}>
              <TouchableOpacity disabled={stepIndex !== 0} style={{flex: 1}}>
                <Text
                  style={[
                    styles.stepBtn,
                    stepIndex !== 0 && styles.stepBtnDisable,
                    {textAlign: 'left'},
                  ]}>
                  {' '}
                  INFO{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={stepIndex !== 1} style={{flex: 1}}>
                <Text
                  style={[
                    styles.stepBtn,
                    stepIndex !== 1 && styles.stepBtnDisable,
                    {textAlign: 'center'},
                  ]}>
                  {' '}
                  VERIFY{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={stepIndex !== 2} style={{flex: 1}}>
                <Text
                  style={[
                    styles.stepBtn,
                    stepIndex !== 2 && styles.stepBtnDisable,
                    {textAlign: 'right'},
                  ]}>
                  {' '}
                  SETTINGS{' '}
                </Text>
              </TouchableOpacity>
            </View>

            <Card containerStyle={styles.formCard}>
              {stepIndex === 0 && (
                <>
                  <View>
                    <View style={{backgroundColor: '#DDEEF8'}}>
                      <View style={styles.imageContainer}>
                        <TouchableOpacity
                          onPress={() => {
                            setopen(true);
                          }}>
                          {img == '' ? (
                            <Image
                              // resizeMode="stretch"
                              style={[styles.profile]}
                              source={require('../../assets/user.png')}
                            />
                          ) : (
                            <Image
                              // imageStyle={{resizeMode: 'stretch'}}
                              source={{uri: img}}
                              style={styles.profileImage}
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                    <LinearGradient
                      colors={['#DDEEF8', '#FFFFFF']}
                      style={styles.linearGradient}>
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            setopen(true);
                          }}
                          style={[
                            styles.Accountdata,
                            {
                              alignSelf: 'flex-end',
                              fontSize: 14,
                              marginBottom: 0,
                              marginTop: 10,
                              marginRight: 17,
                            },
                          ]}>
                          <Text>Select Photo</Text>
                        </TouchableOpacity>
                      </View>
                    </LinearGradient>
                  </View>
                  <View style={{marginHorizontal: 24, marginTop: 0}}>
                    <View style={styles.line}>
                      <Textinput
                        name="name"
                        value={name}
                        autoCorrect={false}
                        autoCapitalize="words"
                        placeholder="First"
                        color="black"
                        tstyle={{width: '90%'}}
                        onChangeText={text => setname(text)}
                      />
                    </View>
                    <View style={styles.line}>
                      <Textinput
                        name="lastname"
                        value={lastname}
                        autoCorrect={false}
                        autoCapitalize="words"
                        placeholder="Last"
                        color="black"
                        tstyle={{width: '90%'}}
                        onChangeText={text => setlastname(text)}
                      />
                    </View>
                    {/* <ErrorMessage error={errors.name} visible={touched.name} /> */}
                    {/* {nameError && <ErrorMessage error={'Name is required'} visible={!nameError}/>} */}

                    <View style={[styles.line]}>
                      <Textinput
                        name="email"
                        value={email}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Email address"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        color="black"
                        tstyle={{width: '90%'}}
                        onChangeText={text => setEmail(text)}
                      />
                    </View>
                    {/* <ErrorMessage error={errors.email} visible={touched.email} /> */}
                    <TouchableOpacity
                      onPress={() => {
                        showDatePicker(), setisTO(true);
                      }}
                      style={[
                        styles.line,
                        {
                          flexDirection: 'row',
                          // alignItems: 'center',
                          justifyContent: 'flex-start',
                        },
                      ]}>
                      <Text style={{color : 'black', fontFamily : font.QuicksandR}}>{birthday}</Text>
                      {/* <TouchableOpacity
                        onPress={() => { showDatePicker(), setisTO(true) }}
                        style={styles.date}>
                        <Image imageStyle={{ resizeMode: "stretch" }} style={{ height: 25, width: 25, marginRight: 5 }} source={require('../../assets/calendar.png')} ></Image>
                    </TouchableOpacity>*/}
                    </TouchableOpacity>
                    <View style={[styles.line, {marginBottom: 20}]}>
                      <Textinput
                        name="phone"
                        placeholder="Phone number"
                        keyboardType="phone-pad"
                        color="black"
                        tstyle={{width: '90%'}}
                        onChangeText={text => setphone(text)}
                      />
                    </View>
                    {/* <ErrorMessage error={errors.phone} visible={touched.phone} /> */}
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      minimumDate={new Date(moment().subtract(100, 'years'))}
                      maximumDate={new Date(moment().subtract(18, 'years'))}
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                    />
                    {/* <TouchableOpacity
                  //navigation.navigate('Otp')
                  onPress={() => handleVerify()}
                  // onPress={handleSubmit}
                  style={styles.Verify}>
                  <Text style={styles.very}>Next</Text>
                </TouchableOpacity> */}
                  </View>
                </>
              )}
              {stepIndex === 1 && (
                <View
                  style={{width: '100%', paddingTop: 10, paddingBottom: 10}}>
                  <Text
                    style={{
                      marginTop: 10,
                      marginBottom: 32,
                      textAlign: 'center',
                      fontFamily: font.QuicksandM,
                      fontSize: 16,
                      color: '#000000',
                    }}>
                    {'Enter verification code'}
                  </Text>
                  <View style={{width: '90%', alignSelf: 'center', height: 60}}>
                    <OTPInputView
                      ref={OTPInput}
                      pinCount={5}
                      style={{height: 50}}
                      autoFocusOnLoad={false}
                      codeInputHighlightStyle={styles.underlineStyleHighLighted}
                      codeInputFieldStyle={styles.underlineStyleBase}
                      onCodeFilled={code => {
                        setVerifyCode(code);
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: font.QuicksandM,
                      textAlign: 'center',
                      marginTop: 20,
                      color: 'black',
                    }}>
                    {`The code was sent to ${email}`}.
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 19,
                        fontFamily: font.QuicksandM,
                        color: 'black',
                      }}>
                      {`Didn't get it? `}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        OTPInput.current.focusField(0);
                        setVerifyCode('');
                        handleVerify(1);
                        // setClear(true);
                      }}>
                      <Text
                        style={{
                          fontSize: 19,
                          fontFamily: font.QuicksandM,
                          color: '#DE0101',
                        }}>
                        {'Resend Code'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {verifyCodeError && (
                    <Text
                      style={{
                        alignSelf: 'center',
                        marginTop: 20,
                        color: 'red',
                        fontSize: 20,
                      }}>
                      {verifyCodeError}
                    </Text>
                  )}
                </View>
              )}
              {stepIndex === 2 && (
                <View>
                  <Text
                    style={{
                      fontFamily: font.QuicksandR,
                      fontSize: 16,
                      color: '#000000',
                      marginTop: 9,
                    }}>
                    {'Confirm Term and Conditions'}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignContent: 'space-between',
                      marginTop: 7,
                    }}>
                    <Text
                      style={{
                        fontFamily: font.QuicksandM,
                        color: 'black',
                        fontSize: 14,
                      }}>
                      {'View Term and Conditions'}
                    </Text>
                    <CheckBox
                      style={{
                        display: 'flex',
                        alignContent: 'flex-end',
                        justifyContent: 'flex-end',
                        marginLeft: 115,
                      }}
                      onClick={() => {
                        setIsViewedTerm(prev => !prev);
                      }}
                      isChecked={isViewedTerm}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignContent: 'space-between',
                      marginTop: 35,
                    }}>
                    <Text
                      style={{
                        fontFamily: font.QuicksandR,
                        fontSize: 16,
                        color: 'black',
                        marginRight: 30,
                      }}>
                      {'Left or Right handed?'}
                    </Text>
                    <SelectDropdown
                      data={['Right', 'Left']}
                      onSelect={(selectedItem, index) => {
                        setHanded(selectedItem);
                        console.log(selectedItem, index);
                      }}
                      defaultButtonText={'Right'}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item;
                      }}
                      buttonStyle={styles.dropdown1BtnStyle}
                      buttonTextStyle={styles.dropdown1BtnTxtStyle}
                      renderDropdownIcon={isOpened => {
                        return (
                          <FontAwesome
                            name={isOpened ? 'chevron-up' : 'chevron-down'}
                            color={'#444'}
                            size={18}
                          />
                        );
                      }}
                      dropdownIconPosition={'right'}
                      dropdownStyle={styles.dropdown1DropdownStyle}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignContent: 'space-between',
                      marginTop: 35,
                    }}>
                    <Text
                      style={{
                        fontFamily: font.QuicksandR,
                        fontSize: 16,
                        color: 'black',
                        marginRight: 80,
                      }}>
                      {'Sugar or Salty \n Language'}
                    </Text>
                    <SelectDropdown
                      data={['Sugar', 'Salty']}
                      onSelect={(selectedItem, index) => {
                        setLangType(selectedItem);
                        console.log(selectedItem, index);
                      }}
                      defaultButtonText={'Sugar'}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item;
                      }}
                      buttonStyle={styles.dropdown1BtnStyle}
                      buttonTextStyle={styles.dropdown1BtnTxtStyle}
                      renderDropdownIcon={isOpened => {
                        return (
                          <FontAwesome
                            name={isOpened ? 'chevron-up' : 'chevron-down'}
                            color={'#444'}
                            size={18}
                          />
                        );
                      }}
                      dropdownIconPosition={'right'}
                      dropdownStyle={styles.dropdown1DropdownStyle}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignContent: 'space-between',
                      marginTop: 35,
                      marginBottom: 20,
                    }}>
                    <Text
                      style={{
                        fontFamily: font.QuicksandR,
                        fontSize: 16,
                        color: 'black',
                        marginRight: 80,
                      }}>
                      {'Login with Biometrics'}
                    </Text>
                    <View style={{width: '30%', alignItems: 'center'}}>
                      <SwitchToggle
                        switchOn={on}
                        onPress={() => {
                          off(!on);
                          OpneModal(!on);
                        }}
                        circleColorOff="#f4f3f4"
                        circleColorOn="#767577"
                        backgroundColorOn="#f4f3f4"
                        backgroundColorOff="white"
                        containerStyle={{
                          width: 33,
                          borderRadius: 15,
                          height: 21,
                          borderColor: 'black',
                          borderWidth: 1,
                          padding: 5,
                        }}
                        circleStyle={{
                          width: 9,
                          height: 9,
                          borderRadius: 4.5,
                          borderWidth: 1,
                          borderColor: 'black',
                        }}
                      />
                    </View>
                  </View>
                </View>
              )}
            </Card>
            <TouchableOpacity
              onPress={() => {
                switch (stepIndex) {
                  case 0:
                    handleStep(0);
                    break;
                  case 1:
                    handleStep(1);
                    break;
                  default:
                    handleStep(2);
                }
              }}
              // onPress={handleStep()}
              style={[styles.button, {marginBottom: 40}]}>
              {stepIndex === 0 && (
                <Text style={styles.buttontext}>{`Next`}</Text>
              )}
              {stepIndex === 1 && (
                <Text style={styles.buttontext}>{`Confirm Validation`}</Text>
              )}
              {stepIndex === 2 && (
                <Text style={styles.buttontext}>{`Let\’s get started!`}</Text>
              )}
            </TouchableOpacity>
            <View
              style={
                {
                  // flexDirection: 'row',
                  // justifyContent: 'center',
                }
              }>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Backarrow />
                <Text
                  style={{
                    marginLeft: 4,
                    fontFamily: font.QuicksandM,
                    color: '#000000',
                    fontSize: 12,
                  }}>
                  {'Cancel Registration'}
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={[
                styles.Accountdata,
                {alignSelf: 'center', marginBottom: 40, color: 'red'},
              ]}>
              {text}
            </Text>
            <View style={[styles.infoStepBack]}></View>
            <Modal
              animationType="none"
              transparent={true}
              visible={open}
              onRequestClose={() => {
                setopen(!open);
              }}>
              <View style={styles.Modalview}>
                <View style={styles.ModalItem}>
                  <TouchableOpacity
                    onPress={() => {
                      setopen(!open);
                    }}
                    style={styles.close}>
                    <Image
                      imageStyle={{resizeMode: 'stretch'}}
                      style={{height: 10, width: 10}}
                      source={require('../../assets/close3.png')}
                    />
                  </TouchableOpacity>

                  <View style={styles.button2}>
                    <TouchableOpacity
                      onPress={() => {
                        checkOpenCameraPermission(), setopen(!open);
                      }}>
                      <Image
                        imageStyle={{resizeMode: 'stretch'}}
                        style={styles.Icon}
                        source={require('../../assets/camera.png')}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        checkSTORAGE(), setopen(!open);
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
            <BiomatricModal />
          </View>
          {/*Header view*/}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default MyComponent;
