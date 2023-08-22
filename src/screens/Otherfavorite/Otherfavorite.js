import React, { useEffect, useState } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  useWindowDimensions,
} from 'react-native';
import style from './Styles';
import Textinput from '../../component/textinput';
// import Arrowwhite from '../../assets/svg/arrowwhite';
import Backarrow from '../../assets/svg/arrowback';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './Styles';
import { wp, hp } from '../../utils/size';

//Girish Chauhan
import PartnerStorage from '../../Data/PartnerStorage';
import { useToast } from 'react-native-toast-notifications';
import firebase from '../../api/firebase';
import ActivityIndicator from '../../components/ActivityIndicator';

const SplashScreen = ({ navigation, route }) => {
  const windowHeight = useWindowDimensions().height;
  const [Food, setFood] = useState();
  const [Color, setcolor] = useState();
  const [Movie, setMovie] = useState();
  const [Pastime, setpastime] = useState();
  const [show, setshow] = useState();
  const [ans, setAns] = useState('');
  const [value, setValue] = useState(null);
  const [Fill, setfill] = useState();
  const [open, setOpen] = useState();

  const [isLoader, setisLoader] = useState(false);
  const Toast = useToast();

  const [items, setItems] = useState([
    { label: 'Favorite Movie', value: 'movie', ans: '', index: 0 },
    { label: 'Food they can eat all the time', value: 'food', ans: '', index: 1 },
    { label: 'Favorite color', value: 'color', ans: '', index: 2 },
    { label: 'Favorite pastime', value: 'pass_time', ans: '', index: 3 },
    { label: 'Favorite tv show', value: 'tv_show', ans: '', index: 4 },
  ]);
  const updateAnswer = () => {

    if (value != null) {
      let temp = items;
      let index = temp.findIndex(i => i.value == value);
      temp[index].ans = ans;
      setItems(temp);
      setAns('');
      setValue(null);
    }
  };
  const addEventType = () => {
    updateAnswer();
    const aryItmes = items.filter(i => i.ans !== '');
    if (aryItmes.length > 0) {
      const prtnrId = PartnerStorage.partnerRefId;
      const events = [];
      aryItmes.map((item, index) => {
        const event = {
          eventName: item.label,
          eventAns: item.ans
        }
        events[index] = event;
      })
      if (events.length > 0) {
        setisLoader(true);
        firebase.addEventType(events, prtnrId, (result) => {
          if (result === 'success') {
            navigation.navigate('Dates');
          }
          else {
            showToastMsg('something went wrong...');
          }
          setisLoader(false);
        })
      }
    }
    else {
      showToastMsg('Select the event type and answer it.');
    }
    // if (value != null) {

    //   if (ans != '') {
    //     // updateAnswer();
    //     // navigation.navigate('Dates');
    //     const prtnrId = PartnerStorage.partnerRefId;
    //     const eventData = {
    //       evenName: value,
    //       eventAns: ans
    //     }

    //     if (addEventType != null){

    //     }
    //     setisLoader(true)
    //     firebase.addEventType(eventData, prtnrId, (result) => {

    //       console.log('result:', result);
    //       setisLoader(false);
    //     })
    //   }
    //   else {
    //     showToastMsg('give the selected event answer')
    //   }
    // }
    // else {
    //   showToastMsg('Please select event type.');
    // }


  }
  //Girish Chauhan...
  const showToastMsg = (msg = 'Something went wrong...', position = 'center') => {
    Toast.hideAll();
    Toast.show(msg, {
      type: "normal",
      placement: "center",
      duration: 2000,
      offset: 30,
      animationType: "slide-in | zoom-in",
    });

  }
  return (
    <>
      <ActivityIndicator visible={isLoader} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {/* <ImageBackground imageStyle={{ resizeMode: "stretch" }} style={{ justifyContent: "space-between", height: windowHeight, width: "100%" }} source={require('../../assets/otherimage.png')}> */}

          <ScrollView showsVerticalScrollIndicator={false} >
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
                  style={{ marginLeft: 15 }}>
                  <Backarrow />
                </TouchableOpacity>
                <Text style={style.text1}>prtnr</Text>
              </View>

              <View
                style={{
                  // marginLeft: 31,
                  width: '90%',
                  marginTop: '8%',
                  alignSelf: 'center',
                }}>
                <Text style={style.text}>3.</Text>
                <Text style={[style.text, { width: '90%' }]}>
                  Enter their favorite things that you know of
                </Text>
                <View
                  style={{
                    borderWidth: 0,
                    marginTop: 50,
                    zIndex: 10,
                    minHeight: hp(50),

                  }}>
                  <View style={{ maxWidth: '100%' }}>
                    <DropDownPicker
                      zIndex={2}
                      open={open}
                      value={value}
                      items={items.filter(i => i.ans == '')}
                      placeholder="Event type"
                      placeholderStyle={style.number}
                      setOpen={setOpen}
                      setValue={setValue}
                      setItems={setItems}
                      listMode="SCROLLVIEW"
                    // dropDownDirection="TOP"
                    />
                    <Textinput
                      placeholder="Type Answer"
                      color="black"
                      tstyle={style.ansInput}
                      onChangeText={setAns}
                      value={ans}
                    />
                  </View>

                  {!open && (
                    <TouchableOpacity style={styles.addBtn} onPress={updateAnswer}>
                      <Text style={styles.btnText}>Add Another Favorite</Text>
                    </TouchableOpacity>
                  )}
                  {items
                    .filter(i => i.ans !== '')
                    .map((i, index) => {
                      return (
                        <View key={index} style={styles.listItem}>
                          <Text style={styles.listText}>{`Q:  ${i.label}`}</Text>
                          <Text style={styles.listText}>{`Ans:  ${i.ans}`}</Text>
                        </View>
                      );
                    })}
                </View>
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
          </ScrollView>

          {/* </ImageBackground> */}
          <TouchableOpacity
            onPress={() => {
              if (
                false
                // Food == null ||
                // Color == null ||
                // show == null ||
                // Pastime == null ||
                // Movie == null
              ) {
                setfill('please fill all the details.');
              } else {
                addEventType();
              }
            }}
            style={style.next}>
            <Text style={[style.text, { fontSize: 23, color: '#707070' }]}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

    </>
  );
};
export default SplashScreen;
