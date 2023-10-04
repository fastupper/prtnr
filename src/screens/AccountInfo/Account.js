import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Modal,
  PermissionsAndroid,
  TextInput,
  ScrollView,
} from 'react-native';
import moment from 'moment';
// import PhoneInput from 'react-native-phone-input';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import firebase from '../../api/firebase';
import ActivityIndicator from '../../components/ActivityIndicator';

import styles from './styles';
import font from '../../utils/CustomFont';
import CopyIcon from '../../components/CopyIcon';
//Girish Chauhan

const AccountInfoScreen = (navigation, item) => {
  const [img, setImg] = useState('');
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setphone] = useState('');
  const [name, setname] = useState('');
  const [lastname, setlastname] = useState('');
  const [birthday, setBirthday] = useState('Birth Date');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTO, setisTO] = useState(true);
  const [isLoader, setisLoader] = useState(true);
  const [userId, setUserId] = useState('');
  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  // const phoneInput = useRef < PhoneInput > null;

  useEffect(() => {
    firebase.getUserId().then(res => {
      if (res) {
        firebase.getRegisteredUser(res.email, async response => {
          if (response.data === 'true') {
            setname(response.firstName);
            setlastname(response.lastName);
            setphone(response.phone);
            setEmail(response.email);
            setImg(response.profileImg);
            setUserId(response.userRefId);
            setBirthday(response.birthday);
          }
          setisLoader(false);
        });
      }
    });
  }, []);

  const uploadImage = async filename => {
    if (!filename) return;
    // setisLoader(true);
    firebase.uploadImage('Registration', filename, result => {
      if (result == 'error') {
        showToastMsg('Image uploading is faild...');
      } else {
        showToastMsg('uploaded successfully...');
        setProfileImg(result);
        setIsprfileImg(true);
      }
      // setisLoader(false);
    });
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
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

  const updateProfile = async () => {
    const updateInfo = {
      phone: phone,
      birthday: birthday,
      image: img,
      userId: userId,
    };
    firebase.updateUserInfo(updateInfo, response => {
      console.log('updated------------------------->');
    });
  };

  return (
    <ScrollView>
      <ActivityIndicator visible={isLoader} />
      <View style={[styles.Biometric, {width: '100%', marginTop: 28}]}>
        <View
          style={[
            styles.Accountdata,
            {
              width: '95%',
              fontSize: 18,
              justifyContent: 'space-between',
              display: 'flex',
              flexDirection: 'row',
            },
          ]}>
          <View>
            <View style={styles.imageContainer}>
              <TouchableOpacity
                onPress={() => {
                  setOpen(true);
                }}>
                {img == '' ? (
                  <Text style={[styles.profile]}>Add a Photo</Text>
                ) : (
                  <Image
                    imageStyle={{resizeMode: 'stretch'}}
                    source={{uri: img}}
                    style={styles.profileImage}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={{alignItems: 'flex-end', marginTop: 10}}>
            <Text
              style={{
                fontSize: 24,
                color: '#000000',
                marginTop: 15,
                fontFamily: font.QuicksandM,
              }}>
              @{(name + lastname).toLowerCase()}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: '#000000',
                fontFamily: font.QuicksandM,
                display: 'flex',
                alignItems: 'center',
              }}>
              <Text>User ID: {userId.slice(0, 12).toUpperCase()} </Text>
              <View style={{marginLeft: 5}}>
                <CopyIcon />
              </View>
            </Text>
            <Text style={{fontSize: 13, fontFamily: font.QuicksandM}}>
              <Text style={{color: '#1E628D'}}>Google</Text>
              <Text style={{color: '#000000'}}>(social connected)</Text>
            </Text>
          </View>
        </View>

        <Modal
          animationType="none"
          transparent={true}
          visible={open}
          onRequestClose={() => {
            setOpen(!open);
          }}>
          <View style={styles.Modalview}>
            <View style={styles.ModalItem}>
              <TouchableOpacity
                onPress={() => {
                  setOpen(!open);
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
                    checkOpenCameraPermission(), setOpen(!open);
                  }}>
                  <Image
                    imageStyle={{resizeMode: 'stretch'}}
                    style={styles.Icon}
                    source={require('../../assets/camera.png')}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    checkSTORAGE(), setOpen(!open);
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
      </View>
      <View style={{width: '100%', marginTop: 20}}>
        <View style={styles.line}>
          <TextInput
            name="name"
            value={name}
            autoCorrect={false}
            autoCapitalize="words"
            placeholder="First"
            color="black"
            tstyle={{width: '90%'}}
            style={{padding: 0}}
            onChangeText={text => setname(text)}
          />
        </View>
        <View style={[styles.line, {marginBottom: 5}]}>
          <TextInput
            name="lastname"
            value={lastname}
            autoCorrect={false}
            autoCapitalize="words"
            placeholder="Last"
            color="black"
            tstyle={{width: '90%'}}
            onChangeText={text => setlastname(text)}
            style={{padding: 0}}
          />
        </View>

        <View style={[styles.line, {marginBottom: 5}]}>
          <Text style={{paddingBottom: 5, color: 'grey'}}>{email}</Text>
        </View>
        <View style={[styles.line]}>
          <Text style={{paddingBottom: 5, color: 'grey'}}>{birthday}</Text>
        </View>
        <View style={[styles.line, {marginBottom: 20}]}>
          <TextInput
            name="phone"
            placeholder="Phone number"
            keyboardType="phone-pad"
            color="black"
            tstyle={{width: '90%'}}
            value={phone}
            onChangeText={text => {
              // let num = text.replace('.', '');
              // if (isNaN(num)) {
              //   console.log('is not a number');
              // } else {
              setphone(text);
              // }
            }}
            style={{padding: 0}}
          />
          {/* <PhoneInput
            //  style={styles.phoneInput}
            initialValue={phone}
            initialCountry="us"
            onChangeText={text => {
              setphone(text);
            }}
            withShadow
            autoFocus
          /> */}
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              updateProfile();
            }}
            style={[styles.button, {marginBottom: 40}]}>
            <Text style={styles.buttontext}>{`Update`}</Text>
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
      </View>
    </ScrollView>
  );
};
export default AccountInfoScreen;
