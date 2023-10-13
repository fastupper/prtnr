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
  useWindowDimensions,
  Platform,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import style from './Styles';
import Textinput from '../../component/textinput';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import Backarrow from '../../assets/svg/arrowback';
//Girish Chauhan
import {useToast} from 'react-native-toast-notifications';

import ActivityIndicator from '../../components/ActivityIndicator';
import firebase from '../../api/firebase';
import PartnerStorage from '../../Data/PartnerStorage';

const favorites = [
  {label: 'Favorite Movie', value: 'movie', ans: '', index: 0},
  {label: 'Food they can eat all the time', value: 'food', ans: '', index: 1},
  {label: 'Favorite color', value: 'color', ans: '', index: 2},
  {label: 'Favorite pastime', value: 'pass_time', ans: '', index: 3},
  {label: 'Favorite tv show', value: 'tv_show', ans: '', index: 4},
];

const Detail = ({route, navigation, item}) => {
  let fromHome = route.params && route.params.fromHome ? route.params.fromHome : false;
  let partners = route.params && route.params.partners ? route.params.partners : [];
  const windowHeight = useWindowDimensions().height;
  const [name, setname] = useState('');
  const [Age, setAge] = useState(0);
  const [Sex, setSex] = useState('');
  const [Fill, setfill] = useState('');
  const [isTO, setisTO] = useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [todate, settodate] = useState(null);
  const [img, setImg] = useState('');
  const [open, setopen] = useState();
  const [openImg, setOpenImg] = useState(false);
  const [isLoader, setisLoader] = useState(false);
  const [partnerImg, setpartnerImg] = useState('');
  const [value, setValue] = useState(null);
  const [ans, setAns] = useState('');
  const [eventName, setEventName] = useState('');
  const [dates, setDates] = useState([]);
  const [ageJoke, setAgeJoke] = useState('Young');

  const [items, setItems] = useState(favorites);

  const [selectedItems, setSelectedItems] = useState([]);
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

  const updateAnswer = () => {
    console.log("value", value)
    if (value != null) {
      let temp = selectedItems;
      let index = items.find(i => i.value == value);
      const newItem = {
        value: value,
        ans: ans,
        label: index.label,
        index: index.index,
      };
      temp.push(newItem);
      setSelectedItems(temp);
      setAns('');
      setValue(null);
    }
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

  const updateDates = () => {
    if (eventName == '') {
      showToastMsg('Please Add Event Name.');
    } else if (todate == null) {
      showToastMsg('Please select a date');
    } else {
      let temp = dates;
      temp.push({label: eventName, value: eventName, date: todate});
      setDates(temp);
      settodate(null);
      setEventName('');
    }
  };
  const saveEvent = () => {
    updateDates();
  };

  const addEventType = () => {
    try {
      const prtnrId = partners[0].prtnrRefId;
      //Favorite proccessing
      const aryItmes = selectedItems.filter(i => i.ans !== '');
      let events = [];
      if (aryItmes.length > 0) {
        aryItmes.map((item, index) => {
          const event = {
            eventName: item.label,
            eventAns: item.ans,
          };
          events[index] = event;
        });
      }
      console.log("events", events)
      // Dates processing
      if (eventName != '' && todate != null) {
        let temp = dates;
        temp.push({label: eventName, value: eventName, date: todate});
        setDates(temp);
        settodate(null);
        setEventName('');
      }
      if (dates.length > 0 && events.length > 0 && (partnerImg || img)) {
        //setItems([]);
        setisLoader(true);
        console.log(dates)
        firebase.addEventType(dates, items, partnerImg, prtnrId, result => {
          if (result === 'success') {
            if (fromHome) {
              navigation.navigate('NewHomeScreen');
              showToastMsg('Updated successfully.');
            } else navigation.navigate('Invite', {prtnrId: prtnrId});
          } else {
            showToastMsg('Something went wrong');
          }
          setisLoader(false);
        });
      } else {
        showToastMsg('Please fill all fields');
      }
    } catch (err) {
      console.log(err);
      showToastMsg('Something went wrong during proccessing data');
    }
  };

  useEffect(() => {
    if (fromHome) {
      setImg(partners[0].imageUrl)
      let temp = [];
      partners[0].eventType && partners[0].eventType.map((item, index) => {
        // let val = favorites.find(item => item.label == item.eventName)
        const newItem = {
          ans: item.eventAns,
          label: item.eventName,
          index: index,
          // value: val.value
        }
        temp.push(newItem);
      })
      setSelectedItems(temp);
      let tempp = [];
      partners[0].importantDates.map((item, index) => {
        tempp.push({label: item.label, value: value, date: item.date});
      })
      setDates(tempp);
    }

    const currentYear = new Date().getFullYear();
    setAge(currentYear - parseInt(PartnerStorage.dateOfbirth.slice(-4)));
    if (Age < 20) {
      setAgeJoke('Young');
    } else if (Age > 20 && Age < 50) {
      setAgeJoke('Fantastic');
    } else {
      setAgeJoke('Old');
    }
  }, []);
  return (
    <>
      <ActivityIndicator visible={isLoader} />
      <View style={{flex: 1, maxHeight: windowHeight}}>
        <SafeAreaView />
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
            {!fromHome ? 
              <Text style={style.topTxt}>Adding a prtnr</Text> :
              <Text style={style.topTxt}>Edit a prtnr</Text>
            }
          </TouchableOpacity>
            {!fromHome &&
              <Text style={style.topTxt}>2/3</Text>
            }
          <Text style={style.text1}>prtnr</Text>
        </View>
        <View style={{height: windowHeight - 120}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}>
            {/* <ImageBackground imageStyle={{ resizeMode: "stretch" }} style={{ flex: 1, height: windowHeight, width: "100%" }} source={require('../../assets/otherimage.png')}> */}

            <TouchableOpacity
              onPress={() => {
                setOpenImg(true);
              }}
              style={[style.topBody, {height: windowHeight * 0.3}]}>
              {img ? (
                <Image
                  imageStyle={{resizeMode: 'stretch'}}
                  source={{uri: img}}
                  style={{height: '100%', width: '100%'}}
                />
              ) : (
                <Text style={{color: '#000', opacity: 0.5}}>
                  Add a second photo for {Age} years old({ageJoke}),{' '}
                  {PartnerStorage.firstName}
                </Text>
              )}
            </TouchableOpacity>
            {img && (
              <View
                style={{
                  marginTop: -40,
                  marginBottom: 25,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}>
                <Text style={style.tapImgTxt}>Tap on photo to change</Text>
              </View>
            )}
            <View style={style.favorBody}>
              <View
                style={{
                  borderWidth: 0,
                  // marginTop: 50,
                  // zIndex: 10,
                  // minHeight: hp(50),
                }}>
                <View style={{width: '95%'}}>
                  <Text style={style.eventTitle}>
                    Enter their favorite things that you know of {`\n`}(or kinda
                    remember)
                  </Text>
                  <View style={{marginTop: 10}}>
                    <DropDownPicker
                      zIndex={2}
                      open={open}
                      value={value}
                      items={items.filter(i => i.ans == '')}
                      placeholder="What's their favorite color?"
                      textStyle={{
                        fontSize: 14,
                        padding: 0,
                      }}
                      style={{minHeight: 29}}
                      setOpen={setopen}
                      setValue={setValue}
                      setItems={setItems}
                      listMode="SCROLLVIEW"
                      dropDownDirection="TOP"
                      showArrowIcon={false}
                    />
                  </View>
                  <Textinput
                    placeholder="Type Answer"
                    color="black"
                    tstyle={style.ansInput}
                    onChangeText={setAns}
                    value={ans}
                  />
                </View>

                <View>
                  {!open && (
                    <TouchableOpacity
                      style={[style.addBtn, {width: '80%'}]}
                      onPress={updateAnswer}>
                      <Text style={style.btnText}>Add Favorite</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View style={{marginTop: 20}}>
                  {selectedItems.length > 0 &&
                    selectedItems.map((i, index) => {
                      return (
                        <View key={index} style={style.listItem}>
                          <Text
                            style={[
                              style.listText,
                              {width: '30%'},
                            ]}>{`${i.label}`}</Text>
                          <Text
                            style={[
                              style.listText,
                              {width: '30%'},
                            ]}>{`${i.ans}`}</Text>
                          <Text
                            style={style.removeText}
                            onPress={() => {
                              setSelectedItems([
                                ...selectedItems.slice(0, index),
                                ...selectedItems.slice(index + 1),
                              ]);
                              setItems(favorites);
                            }}>
                            remove
                          </Text>
                        </View>
                      );
                    })}
                </View>
              </View>
            </View>
            <View style={style.favorBody}>
              <View style={{width: '95%'}}>
                <Text style={style.eventTitle}>Important Dates</Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 20,
                  //   borderWidth: 1,
                }}>
                <View style={{width: '60%'}}>
                  <Textinput
                    color={'rgba(0,0,0,0.2)'}
                    placeholder="Our First Kiss"
                    tstyle={style.ansInput}
                    value={eventName}
                    onChangeText={text => setEventName(text)}
                  />
                </View>
                <View onPress={showDatePicker} style={style.datePicker}>
                  <Textinput
                    onPress={() => {
                      showDatePicker(), setisTO(true);
                    }}
                    editable={false}
                    value={todate}
                    color={'#000'}
                    placeholder="When was it?"
                    tstyle={style.ansInput}
                    // onChangeText={text => setMarriage(text)}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      showDatePicker(), setisTO(true);
                    }}
                    style={style.datePickerBtn}
                  />
                </View>

                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
              <TouchableOpacity
                style={[style.addBtn, {width: '40%', marginBottom: 10}]}
                onPress={saveEvent}>
                <Text style={style.btnText}>Add Date</Text>
              </TouchableOpacity>
              <View style={{width: '95%'}}>
                {dates
                  .filter(i => i.ans !== '')
                  .map((i, index) => {
                    return (
                      <View key={index} style={style.listItem}>
                        <Text
                          style={[
                            style.listText,
                            {width: '30%'},
                          ]}>{`${i.label}`}</Text>
                        <Text
                          style={[style.listText, {width: '30%'}]}>{`${moment(
                          i.date,
                        ).format('MMM DD, YYYY')}`}</Text>
                        <Text
                          style={style.removeText}
                          onPress={() => {
                            setDates([
                              ...dates.slice(0, index),
                              ...dates.slice(index + 1),
                            ]);
                          }}>
                          remove
                        </Text>
                      </View>
                    );
                  })}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      <SafeAreaView />

      <View style={{backgroundColor: '#fff', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => addEventType()}
          style={[style.button, {marginTop: 20}]}>
          <Text style={style.buttontext}>{fromHome ? 'Save and Close' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="none"
        transparent={true}
        visible={openImg}
        onRequestClose={() => {
          setOpenImg(!openImg);
        }}>
        <View style={style.Modalview}>
          <View style={style.ModalItem}>
            <TouchableOpacity
              onPress={() => {
                setOpenImg(!openImg);
              }}
              style={style.close}>
              <Image
                imageStyle={{resizeMode: 'stretch'}}
                style={{height: 10, width: 10}}
                source={require('../../assets/close3.png')}
              />
            </TouchableOpacity>

            <View style={style.imgButton}>
              <TouchableOpacity
                onPress={() => {
                  checkReadContactsPermission(), setOpenImg(!openImg);
                }}>
                <Image
                  imageStyle={{resizeMode: 'stretch'}}
                  style={style.Icon}
                  source={require('../../assets/camera.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  checkSTORAGE(), setOpenImg(!openImg);
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
    </>
  );
};
export default Detail;
