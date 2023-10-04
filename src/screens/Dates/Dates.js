/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  Text,
  Image,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import style from './Styles';
import Textinput from '../../component/textinput';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import Arrowwhite from '../../assets/svg/arrowwhite';
import Backarrow from '../../assets/svg/arrowback';
import styles from './Styles';

import {useToast} from 'react-native-toast-notifications';
import firebase from '../../api/firebase';
import ActivityIndicator from '../../components/ActivityIndicator';
import {async} from '@firebase/util';
import PartnerStorage from '../../Data/PartnerStorage';

const SplashScreen = ({navigation}) => {
  const windowHeight = useWindowDimensions().height;
  const [todate, settodate] = useState('Date Title');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTO, setisTO] = useState(true);
  const [Fill, setfill] = useState('');
  const [Marriage, setMarriage] = useState('');
  const [birthday, setbirthday] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState(null);
  const [items, setItems] = useState([]);

  const [isLoader, setisLoader] = useState(false);

  const Toast = useToast();

  // const [items, setItems] = useState([
  //   {label: 'Birthday', value: 'Birthday', date: new Date()},
  // ]);
  const handleConfirm = date => {
    // console.warn('A date has been picked: ', date);
    //setDate(date);
    if (isTO) {
      const format = 'DDMMMYYYY';

      const dt = moment(date).format('MMM-DD-YYYY');
      setDate(dt);
    }
    hideDatePicker();
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const updateDates = () => {
    if (eventName == '') {
      showToastMsg('Please Add Event Name.');
    } else if (date == null) {
      showToastMsg('Please select a date');
    } else {
      let temp = items;
      temp.push({label: eventName, value: eventName, date: date});
      setItems(temp);
      setDate(null);
      setEventName('');
    }
  };
  const saveEvent = () => {
    updateDates();
  };
  const addDates = async () => {
    try {
      if (eventName != '' && date != null) {
        let temp = items;
        temp.push({label: eventName, value: eventName, date: date});
        setItems(temp);
        setDate(null);
        setEventName('');
      }
      if (items.length > 0) {
        //setItems([]);
        const prtnrId = PartnerStorage.partnerRefId;
        setisLoader(true);
        firebase.importantDates(items, prtnrId, result => {
          setisLoader(false);
          navigation.navigate('Invite', {prtnrId: prtnrId});
        });
      }
    } catch (error) {}
  };
  //Girish Chauhan...
  const showToastMsg = (
    msg = 'Something went wrong...',
    position = 'center',
  ) => {
    Toast.hideAll();
    Toast.show(msg, {
      type: 'normal',
      placement: 'center',
      duration: 2000,
      offset: 30,
      animationType: 'slide-in | zoom-in',
    });
  };
  return (
    <>
      <ActivityIndicator visible={isLoader} />
      <SafeAreaView style={{flex: 1}}>
        {/* <ImageBackground imageStyle={{ resizeMode: "stretch" }} style={{ flex: 1, height: windowHeight, width: "100%" }} source={require('../../assets/otherimage.png')}> */}

        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView>
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

            <View style={{width: '100%', marginTop: '5%'}}>
              <View style={{width: '80%', marginLeft: 31, marginTop: 10}}>
                <Text style={style.text}>4.</Text>
                <Text style={style.text}>Important Dates</Text>
                <Text style={[style.text2, {width: '65%'}]}>
                  Hey, we know you aren’t going to remember.
                </Text>

                <View
                  style={{
                    marginTop: '15%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    //   borderWidth: 1,
                  }}>
                  <View style={{width: '60%'}}>
                    <Text style={{color: '#000'}}>
                      Write the Name of the Event
                    </Text>
                    <Textinput
                      color={'rgba(0,0,0,0.2)'}
                      placeholder="Our First Kiss"
                      tstyle={style.textinput}
                      value={eventName}
                      onChangeText={text => setEventName(text)}
                    />
                  </View>
                  <View onPress={showDatePicker} style={styles.datePicker}>
                    <Text style={{color: '#000'}}>When is it?</Text>
                    <Textinput
                      onPress={() => {
                        showDatePicker(), setisTO(true);
                      }}
                      editable={false}
                      value={date}
                      color={'rgba(0,0,0,0.2)'}
                      placeholder="Pick Date"
                      tstyle={style.textinput}
                      // onChangeText={text => setMarriage(text)}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        showDatePicker(), setisTO(true);
                      }}
                      style={styles.datePickerBtn}
                    />
                  </View>
                </View>

                {/* <Pressable style={styles.addBtn}>
                <Text style={styles.btnText}>Add Another Favorite</Text>
              </Pressable>

              <View
                style={{
                  borderWidth: 0.5,
                  marginTop: '10%',
                  marginBottom: '20%',
                }}
              /> */}

                <Pressable
                  onPress={saveEvent}
                  style={[styles.addBtn, {width: '50%'}]}>
                  <Text style={styles.btnText}>Save Event</Text>
                </Pressable>

                {items
                  .filter(i => i.ans !== '')
                  .map((i, index) => {
                    return (
                      <View key={index} style={styles.listItem}>
                        <Text style={styles.listText}>{`${i.label} :  ${moment(
                          i.date,
                        ).format('MMM-DD-YYYY')}`}</Text>
                      </View>
                    );
                  })}
              </View>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>
          </KeyboardAvoidingView>
          <Text
            style={[
              style.rediotext,
              {
                marginLeft: 20,
                position: 'absolute',
                bottom: 30,
                color: 'white',
                width: '30%',
              },
            ]}>
            {Fill}
          </Text>

          {/* <View style={{height: '30%', marginTop: windowHeight / 8}}>
          <TouchableOpacity
            onPress={() => {
              // if (
              //   Marriage == null ||
              //   birthday == null ||
              //   todate == 'Date Title' ||
              //   value == null
              // ) {
              //   setfill('Please fill all the details');
              // } else {
              navigation.navigate('Invite');
              // navigation.navigate('NewHomeScreen');
              // }
            }}
            style={style.next}>
            <Text style={[style.text, {fontSize: 23, color: '#707070'}]}>
              Almost there
            </Text>
          </TouchableOpacity>
        </View> */}
        </ScrollView>

        <TouchableOpacity
          onPress={() => {
            // if (
            //   Marriage == null ||
            //   birthday == null ||
            //   todate == 'Date Title' ||
            //   value == null
            // ) {
            //   setfill('Please fill all the details');
            // } else {
            // navigation.navigate('Invite');
            addDates();
            // navigation.navigate('NewHomeScreen');
            // }
          }}
          style={style.next1}>
          <Text style={[style.text, {fontSize: 23, color: 'black'}]}>
            Next
          </Text>
        </TouchableOpacity>

        {/* </ImageBackground> */}
      </SafeAreaView>
    </>
  );
};
export default SplashScreen;
