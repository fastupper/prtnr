/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  Text,
  Image,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  ImageBackground,
  KeyboardAvoidingView,
  useWindowDimensions,
  Platform,
} from 'react-native';
import style from './Styles';
import Textinput from '../../component/textinput';
import {RadioButton} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment, {duration} from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
// import Arrowwhite from '../../assets/svg/arrowwhite';
import Backarrow from '../../assets/svg/arrowback';
//Girish Chauhan
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useToast} from 'react-native-toast-notifications';

import ActivityIndicator from '../../components/ActivityIndicator';
import firebase from '../../api/firebase';
import ImageModel from '../ImageModel/ImageModel';

const SplashScreen = ({navigation, item}) => {
  const windowHeight = useWindowDimensions().height;
  const windowWidth = useWindowDimensions().height;
  const [checked, setChecked] = React.useState('first');
  const [name, setname] = useState('');
  const [Age, setAge] = useState('');
  const [Sex, setSex] = useState('');
  const [Fill, setfill] = useState('');
  const [isTO, setisTO] = useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [todate, settodate] = useState('Their Birthdate');
  const [img, setImg] = useState('');
  const [open, setopen] = useState(false);
  const [isLoader, setisLoader] = useState(false);
  const [partnerImg, setpartnerImg] = useState('');
  const Toast = useToast();
  global.item = {Age: '', todate1: '', name: '', Sex: '', checked: ''};
  const handleConfirm = date => {
    // console.warn('A date has been picked: ', date);
    if (isTO) {
      settodate(moment(date).format('MMM-DD-YYYY'));
    }
    //showToastMsg('A date has been picked:' + todate);
    hideDatePicker();
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
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        setImg(res.assets[0].uri);
        uploadPartnerImage(res.assets[0].uri);
      }
    });
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
              setImg(res.assets[0].uri);
              uploadPartnerImage(res.assets[0].uri);
            }
          }),
        400,
      );
    } catch (error) {
      console.warn('error', error);
    }
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
        {},
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        imageGalleryLaunch();
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        console.log('er->', granted);
        imageGalleryLaunch();
      } else {
        console.log('er->', granted);
        console.log(granted);
      }
    } catch (err) {
      console.log('er->', granted);
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
  //Girish Chauhan
  const showToastMsg = (
    msg = 'Something went wrong...',
    position = 'center',
  ) => {
    Toast.hideAll();
    Toast.show(msg, {
      type: 'normal',
      placement: position,
      duration: 2000,
      offset: 30,
      animationType: 'slide-in | zoom-in',
    });
  };
  const clearPage = () => {
    setname('');
    setAge('');
    setSex('');
    setfill('');
  };
  const uploadPartnerImage = async filename => {
    if (!filename) {
      return;
    }
    setisLoader(true);
    firebase.uploadImage('Partners', filename, result => {
      if (result == 'error') {
        console.warn('something went wrong...');
      } else {
        setpartnerImg(result);
      }
      setisLoader(false);
    });
  };
  const addPartner = async prtnrData => {
    setisLoader(true);
    firebase.addPartner(prtnrData, result => {
      if (result == 'success') {
        setisLoader(false);
        clearPage();
        navigation.navigate('Otherfavorite');
      } else {
        setisLoader(false);
        showToastMsg('Something went wrong...');
      }
    });
  };
  const handleClose = () => {
    ``;
    console.log('handleClose');
    //setopen(!open);
  };
  const handleModal = e => {
    setopen(!open);
  };
  return (
    <>
      <ActivityIndicator visible={isLoader} />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        {/* <ImageBackground imageStyle={{ resizeMode: "stretch" }} style={{ flex: 1, height: windowHeight, width: "100%" }} source={require('../../assets/otherimage.png')}> */}
        <ScrollView showsVerticalScrollIndicator={false}>
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
          <KeyboardAvoidingView style={{marginLeft: 31}}>
            <View
              style={{
                width: '70%',
                backgroundColor: 'transparent',
                marginTop: 10,
              }}>
              <Text style={style.text}>2.</Text>
              <Text style={style.text}>Enter their details</Text>
              <View style={[style.line]}>
                <Textinput
                  placeholder="First Name"
                  color="black"
                  tstyle={style.textinput}
                  onChangeText={text => setname(text)}
                />
              </View>

              <View style={[style.line]}>
                <Textinput
                  placeholder="Age (optional)"
                  keyboardType="numeric"
                  color="black"
                  tstyle={style.textinput}
                  onChangeText={text => setAge(text)}
                />
              </View>

              <View style={[style.line]}>
                <Textinput
                  placeholder="Sex (optional)"
                  color="black"
                  tstyle={style.textinput}
                  onChangeText={text => setSex(text)}
                />
              </View>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
              <TouchableOpacity
                onPress={() => {
                  showDatePicker(), setisTO(true);
                }}
                style={[
                  style.line,
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  },
                ]}>
                <Text style={style.textinput}>{todate}</Text>
                {/* <TouchableOpacity
                                    onPress={() => { showDatePicker(), setisTO(true) }}
                                    style={style.date}>
                                    <Image imageStyle={{ resizeMode: "stretch" }} style={{ height: 25, width: 25, marginRight: 5 }} source={require('../../assets/calendar.png')} ></Image>
                                </TouchableOpacity> */}
                {/* <Textinput placeholder="Their Birthdate" color="black" tstyle={style.textinput} onChangeText={(text) => (text)} /> */}
              </TouchableOpacity>

              <View style={{marginTop: 22}}>
                <Text style={style.text}>Relationship Type</Text>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 1,
                    }}>
                    <TouchableOpacity
                      style={{marginHorizontal: 5}}
                      onPress={() => setChecked('first')}>
                      <Icon
                        name={
                          checked === 'first'
                            ? 'radiobox-marked'
                            : 'radiobox-blank'
                        }
                        size={26}
                        color="#000000"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setChecked('first')}>
                      <Text style={style.rediotext}>Plutonic</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 16,
                    }}>
                    <TouchableOpacity
                      style={{marginHorizontal: 5}}
                      onPress={() => setChecked('second')}>
                      <Icon
                        name={
                          checked === 'second'
                            ? 'radiobox-marked'
                            : 'radiobox-blank'
                        }
                        size={26}
                        color="#000000"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setChecked('second')}>
                      <Text style={style.rediotext}>Intimate</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View style={{marginTop: 26, width: '85%'}}>
              <Text style={style.text}>Add Photo</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setopen(true);
                  }}
                  style={[style.Add, {backgroundColor: 'white'}]}>
                  {img == '' ? (
                    <Image
                      imageStyle={{resizeMode: 'stretch'}}
                      style={[style.Icon, {height: 25, width: 25}]}
                      source={require('../../assets/camera.png')}
                    />
                  ) : (
                    <Image
                      imageStyle={{resizeMode: 'stretch'}}
                      source={{uri: img}}
                      style={{height: '100%', width: '100%'}}
                    />
                  )}
                </TouchableOpacity>
                <Text
                  style={[
                    style.text,
                    {
                      width: '60%',
                      marginLeft: 20,
                      alignSelf: 'center',
                      marginTop: -5,
                    },
                  ]}>
                  Add your favorite SFW photo of them.
                </Text>
              </View>
              {img != '' && (
                <Text style={[style.text, {fontSize: 18, paddingTop: 5}]}>
                  {''}
                </Text>
              )}
            </View>

            <Modal
              animationType="none"
              transparent={true}
              visible={open}
              onRequestClose={() => {
                setopen(!open);
              }}>
              <View style={style.Modalview}>
                <View style={style.ModalItem}>
                  <TouchableOpacity
                    onPress={() => {
                      setopen(!open);
                    }}
                    style={style.close}>
                    <Image
                      imageStyle={{resizeMode: 'stretch'}}
                      style={{height: 10, width: 10}}
                      source={require('../../assets/close3.png')}
                    />
                  </TouchableOpacity>

                  <View style={style.button}>
                    <TouchableOpacity
                      onPress={() => {
                        checkReadContactsPermission(), setopen(!open);
                      }}>
                      <Image
                        imageStyle={{resizeMode: 'stretch'}}
                        style={style.Icon}
                        source={require('../../assets/camera.png')}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        checkSTORAGE(), setopen(!open);
                      }}>
                      <Image
                        imageStyle={{resizeMode: 'stretch'}}
                        style={style.Icon}
                        source={require('../../assets/gallery.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            {/* <ImageModel open={open} onPress={handleClose} onCloseModal={e => handleModal(e)} /> */}
          </KeyboardAvoidingView>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
              marginTop: 78,
              flexDirection: 'row',
            }}>
            <Text
              style={[
                style.rediotext,
                {marginLeft: 20, color: 'red', width: '30%'},
              ]}>
              {Fill}
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (name == null || todate == 'Their Birthdate') {
                  setfill('fill all the details');
                  showToastMsg('fill all the details');
                } else if (img == '') {
                  showToastMsg('Add your favorite SFW Photo.');
                } else {
                  global.item = {
                    Age: Age,
                    todate1: todate,
                    name: name,
                    Sex: Sex,
                    checked: checked,
                  };
                  const relationType =
                    checked === 'first' ? 'Plutonic' : 'Intimate';
                  const prtnrData = {
                    firstname: name,
                    age: Age,
                    dateOfbirth: todate,
                    gender: Sex,
                    relationType: relationType,
                    imageUrl: partnerImg,
                  };
                  addPartner(prtnrData);
                }
              }}
              style={[style.next, {marginRight: 24}]}>
              <Text style={[style.text, {fontSize: 23, color: '#707070'}]}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* </ImageBackground> */}
      </SafeAreaView>
    </>
  );
};
export default SplashScreen;
