/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Text,
  Image,
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import style from './Styles1';
import Backarrow from '../../assets/svg/arrowback';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {PermissionsAndroid} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import styles from './Styles1';
import firebase from '../../api/firebase';
import {useToast} from 'react-native-toast-notifications';
import ActivityIndicator from '../../components/ActivityIndicator';

const FirstStepAddPartner = ({navigation, item}) => {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('Birthdate');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTO, setisTO] = useState(true);
  const [open, setopen] = useState(false);
  const [img, setImg] = useState('');
  const [isLoader, setisLoader] = useState(false);
  const [partnerImg, setpartnerImg] = useState('');
  const Toast = useToast();
  global.item = {Age: '', todate1: '', name: '', Sex: '', checked: ''};

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
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
              console.log(res.assets[0].uri);
              uploadPartnerImage(res.assets[0].uri);
            }
          }),
        400,
      );
    } catch (error) {
      console.warn('error', error);
    }
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
        console.log({result});
        setpartnerImg(result);
      }
      setisLoader(false);
    });
  };

  const clearPage = () => {
    setName('');
    setBirthday('BirthDate');
    setImg('');
  };

  const addPartner = async prtnrData => {
    setisLoader(true);
    console.log('------------> add partner');
    firebase.addPartner(prtnrData, result => {
      console.log({result});
      if (result == 'success') {
        setisLoader(false);
        clearPage();
        navigation.navigate('Otherdetails');
      } else {
        setisLoader(false);
        showToastMsg('Something went wrong...');
      }
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ActivityIndicator visible={isLoader} />
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack('')}
            style={{marginLeft: 15, display: 'flex', flexDirection: 'row'}}>
            <Backarrow />
            <Text style={styles.topTxt}>Addig a prtnr</Text>
          </TouchableOpacity>
          <Text style={styles.topTxt}>1/3</Text>
          <Text style={style.text1}>prtnr</Text>
        </View>
        <TouchableOpacity style={styles.body} onPress={() => setopen(true)}>
          {img ? (
            <Image
              imageStyle={{resizeMode: 'stretch'}}
              source={{uri: img}}
              style={{height: '100%', width: '100%'}}
            />
          ) : (
            <View style={style.Add}>
              <Text style={styles.topTxt}>Add their photo</Text>
              <Image
                imageStyle={{resizeMode: 'stretch'}}
                style={{height: 30, width: 30, tintColor: '#000'}}
                source={require('../../assets/plusB.png')}
              />
            </View>
          )}
        </TouchableOpacity>
        {img && (
          <View
            style={{
              marginTop: -50,
              marginBottom: 35,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
            <Text style={styles.tapImgTxt}>Tap on photo to change</Text>
          </View>
        )}
        <View style={styles.nameInput}>
          <TextInput
            name="name"
            value={name}
            autoCorrect={false}
            autoCapitalize="words"
            textAlign="center"
            onChangeText={name => setName(name)}
            style={styles.inputTxt}
            placeholder="Enter your partners name"
          />
        </View>
        <View style={[styles.nameInput, {marginTop: 10}]}>
          <TouchableOpacity
            onPress={() => {
              showDatePicker(), setisTO(true);
            }}
            style={{
              alignItems: 'center',
            }}>
            <Text style={styles.inputTxt}>{birthday}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (!name || birthday == 'Birthdate') {
              showToastMsg('Fill all details');
            } else if (img == '') {
              showToastMsg('Add your favorite SFW Photo.');
            } else {
              global.item = {
                todate1: birthday,
                name: name,
              };
              const prtnrData = {
                firstname: name,
                dateOfbirth: birthday,
                imageUrl: partnerImg,
              };
              addPartner(prtnrData);
            }
          }}
          style={[styles.button, {marginTop: 20}]}>
          <Text style={styles.buttontext}>{`Next`}</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        minimumDate={new Date(moment().subtract(100, 'years'))}
        maximumDate={new Date(moment().subtract(18, 'years'))}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
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
                  checkReadContactsPermission(), setopen(!open);
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
    </SafeAreaView>
  );
};
export default FirstStepAddPartner;
