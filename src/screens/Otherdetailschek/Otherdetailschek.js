import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import style from './Styles';
import Textinput from '../../component/textinput';
import { RadioButton } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import Arrowwhite from '../../assets/svg/arrowwhite';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation, item }) => {
  const windowHeight = useWindowDimensions().height;
  const windowWidth = useWindowDimensions().height;
  const [right, setright] = useState('');
  const [checked, setChecked] = React.useState();
  const [name, setname] = useState();
  const [Age, setAge] = useState();
  const [Sex, setSex] = useState();
  const [Fill, setfill] = useState('');
  const [isTO, setisTO] = useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [todate, settodate] = useState('Their Birthdate');
  const [img, setImg] = useState('');
  const [open, setopen] = useState(false);
  const Hand = async () => {
    const result = await AsyncStorage.getItem('Hand');

    setright(result);
  };

  useEffect(() => {
    Hand();
  });

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    if (isTO) {
      settodate(moment(date).format('ll'));
    }
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

      }
    });
  };

  const imageGalleryLaunch = () => {
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
      } else {
        console.log(granted);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const checkSTORAGE = async () => {
    const result = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (result == true) {
      imageGalleryLaunch();
    }
    if (result == false) {
      requestStorage();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ImageBackground
        imageStyle={{ resizeMode: 'stretch' }}
        style={{ flex: 1, height: windowHeight, width: '100%' }}
        source={require('../../assets/otherimage.png')}>
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
              style={{ marginLeft: 15 }}>
              <Arrowwhite />
            </TouchableOpacity>
            <Text style={style.text1}>prtnr</Text>
          </View>
          <KeyboardAvoidingView style={{ marginLeft: 31 }}>
            <View
              style={{
                width: '70%',
                backgroundColor: 'transparent',
                marginTop: 55,
              }}>
              <Text style={style.text}>2.</Text>
              <Text style={style.text}>Enter their details</Text>

              <View style={[style.line]}>
                <Textinput
                  value={name}
                  placeholder="First Name"
                  color="black"
                  tstyle={style.textinput}
                  onChangeText={text => setname(text)}
                />
              </View>

              <View style={[style.line]}>
                <Textinput
                  value={Age}
                  placeholder="Age (optional)"
                  keyboardType="numeric"
                  color="black"
                  tstyle={style.textinput}
                  onChangeText={text => setAge(text)}
                />
              </View>

              <View style={[style.line]}>
                <Textinput
                  value={Sex}
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

              <View style={{ marginTop: 22 }}>
                <Text style={style.text}>Relationship Type</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 1,
                    }}>
                    <RadioButton
                      value="first"
                      status={checked === 'first' ? 'checked' : 'unchecked'}
                      onPress={() => setChecked('first')}
                    />
                    <Text style={style.rediotext}>Plutonic</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 16,
                    }}>
                    <RadioButton
                      value="secound"
                      status={checked === 'secound' ? 'checked' : 'unchecked'}
                      onPress={() => setChecked('secound')}
                    />
                    <Text style={style.rediotext}>Intimate</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 26, width: '85%' }}>
              <Text style={style.text}>Add Photo</Text>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <TouchableOpacity
                  onPress={() => {
                    setopen(true);
                  }}
                  style={[style.Add, { backgroundColor: 'white' }]}>
                  {img == '' ? (
                    <Image
                      imageStyle={{ resizeMode: 'stretch' }}
                      style={[style.Icon, { height: 25, width: 25 }]}
                      source={require('../../assets/camera.png')}
                    />
                  ) : (
                    <Image
                      imageStyle={{ resizeMode: 'stretch' }}
                      source={{ uri: img }}
                      style={{ height: '100%', width: '100%' }}
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
                      imageStyle={{ resizeMode: 'stretch' }}
                      style={{ height: 10, width: 10 }}
                      source={require('../../assets/close3.png')}
                    />
                  </TouchableOpacity>

                  <View style={style.button}>
                    <TouchableOpacity
                      onPress={() => {
                        checkReadContactsPermission(), setopen(!open);
                      }}>
                      <Image
                        imageStyle={{ resizeMode: 'stretch' }}
                        style={style.Icon}
                        source={require('../../assets/camera.png')}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        checkSTORAGE(), setopen(!open);
                      }}>
                      <Image
                        imageStyle={{ resizeMode: 'stretch' }}
                        style={style.Icon}
                        source={require('../../assets/gallery.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </KeyboardAvoidingView>

          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 40,
              marginTop: 78,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => {
                // if (name == null || todate == "Their Birthdate") {
                //     setfill("please fill all the details.")
                // } else {
                navigation.navigate('Profile', { right: right });
                // }
              }}
              style={[style.next, { alignSelf: 'center' }]}>
              <Text style={[style.text, { fontSize: 23, color: '#707070' }]}>
                Confirm and start
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default SplashScreen;
