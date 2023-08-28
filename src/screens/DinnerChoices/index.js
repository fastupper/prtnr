import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  Modal,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import Swiper from 'react-native-swiper';
import { wp, hp } from '../../utils/size';
import FastImage from 'react-native-fast-image';
import GestureRecognizer from 'react-native-swipe-gestures';
import firebase from '../../api/firebase';
import UserStorage from '../../Data/UserStorage';
import { useIsFocused } from '@react-navigation/native';
import ChoosedPrtnr from '../../Data/ChoosedPrtnr';
import ActivityIndicator from '../../components/ActivityIndicator';
import { useToast } from 'react-native-toast-notifications';

const DinnerChoices = ({ navigation }) => {
  // const partner_1 = require('../../assets/pic_2.png');
  // const partner_2 = require('../../assets/pic_3.png');

  const partner_1 = '';
  const partner_2 = '';

  const [choiceModalVisible, setChoiceModalVisible] = useState(false);

  const [question, setQuestion] = useState('');
  const [top, setTop] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [listing, setListing] = useState([]);
  const [current, setCurrent] = useState(0);
  const [partnerGmail, setPartnerGmail] = useState(0);

  const [questionsent, setIsQuestionSent] = useState(false);

  //Girish
  const [userRefId, setIsUserRefId] = useState('');
  const [prtnrRefId, setIsPrtnrRefId] = useState('');
  const [selectBtn, setIsSelectBtn] = useState('Select');

  const [isLoader, setisLoader] = useState(false);
  const [prtnrImage, setPrtnrImage] = useState('');
  const [isPartner, setIsPartners] = useState(false);
  const isFocused = useIsFocused();
  const [userImage, setIsUserImage] = useState('');


  const Toast = useToast();
  const ontSelectPress = () => {

    navigation.goBack();
    // if (listing.length < 1 || current === 0) {
    //   alert('Please select one choice to proceed');
    // } else {
    //   navigation.goBack();
    // }
  };

  const getPartners = async () => {
    setisLoader(true);
    firebase.getPartnersData(UserStorage.userRefId, (response) => {
      if (response != null && response.length > 0) {
        setIsPartners(true);
        // console.log('prtnrdata',response)
        const prtnimg = response[0]['imageUrl'];
        setPrtnrImage(prtnimg);
        // console.log("==>", response)
        const prtnrID = response[0]['prtnrRefId'];
        setIsPrtnrRefId(prtnrID);
        setPartnerGmail(response[0]['partnerGmail']);
        setIsUserRefId(UserStorage.userRefId);
        setIsUserImage(UserStorage.imgUrl);
      }
      else {
        showToastMsg('You have no partner added...')
        setIsPartners(false);
      }
      setisLoader(false);
    })
  }
  useEffect(() => {
    getPartners();
    return function cleanup() {
    }
  }, [isFocused])
  const onSendPress = () => {

    if (isPartner) {

      let error = '';
      if (question.trim() == '') {
        error = 'Please add some question to continue';
        setQuestion('');
      } else if (top.trim() == '') {
        error = 'Please add top answer to continue';
        setTop('');
      } else if (second.trim() == '') {
        error = 'Please add second answer to continue';
        setSecond('');
      } else if (third.trim() == '') {
        error = 'Please add third answer to continue';
        setThird('');
      }
      if (error === '') {
        let arr = [`${question} (3 Choices)`, top, second, third];
        setListing(arr);
        setChoiceModalVisible(false);
        dinnerdata = {
          question: question,
          topAnswer: top,
          secondAnswer: second,
          thirdAnswer: third,
          userRefId: userRefId,
          partnerGmail: partnerGmail
        }
        setisLoader(true);
        firebase.DinnerChoices(dinnerdata, (response) => {
          if (response === 'success') {
            showToastMsg('Successfully quetion sent');
            setIsSelectBtn('done');
          }
          else {
            showToastMsg('Something went wrong...');
          }
          setisLoader(false);
        })
      } else {
        alert(error);
      }
    }

  };
  const onSwipe = direction => {

    if (direction == 'DOWN') {
      setCurrent(current == 3 ? 0 : current + 1);
    } else if (direction == 'UP') {
      setCurrent(current == 0 ? 3 : current - 1);
    }
  };
  const ontDonePress = () => {
    setQuestion('');
    setTop('');
    setSecond('');
    setThird('');

    navigation.goBack();
  }
  const _renderQuestionSent = () => {
    return (
      <Modal visible={Quesent} transparent={true}>
        <View style={styles.modalBase}>
          <TouchableOpacity onPress={ontDonePress} style={styles.selectButton}>
            <Text style={styles.selectBtn}>{selectBtn}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
  const _renderChoiceModal = () => {
    return (
      <Modal visible={choiceModalVisible} transparent={true}>
        <View style={styles.modalBase}>
          <Pressable
            onPress={() => setChoiceModalVisible(false)}
            style={styles.hiddenBtn}
          />
          <View style={styles.modalInnerContainer}>
            <View style={styles.rowContainer}>
              <Image
                style={styles.iconStyle}
                source={require('../../assets/menu_tick.png')}
              />
              <View style={styles.vSeparator} />
              <Text style={styles.modalText}>
                List your top 3 choices for this question (from your best to
                worst), and send it off.
              </Text>
              <TouchableOpacity
                onPress={() => setChoiceModalVisible(false)}
                style={{
                  height: 25, width: 25,
                  alignItems: 'flex-end',
                  marginHorizontal: 5
                }}>
                <Image
                  imageStyle={{ resizeMode: 'stretch' }}
                  style={{
                    height: 15, width: 15,
                  }}
                  source={require('../../assets/close3.png')}
                />
              </TouchableOpacity>

            </View>
            <View style={{ borderWidth: 0, paddingRight: wp(5) }}>
              <Text
                style={[
                  styles.modalText,
                  { marginBottom: hp(4), marginTop: hp(2) },
                ]}>
                What’s the question?
              </Text>
              <TextInput
                value={question}
                onChangeText={setQuestion}
                style={[styles.textInput, { marginBottom: hp(2.5), flex: 0 }]}
              />
              <View style={styles.rowContainer}>
                <Text style={[styles.modalText, { marginHorizontal: wp(3) }]}>
                  Top
                </Text>
                <TextInput
                  value={top}
                  onChangeText={setTop}
                  style={styles.textInput}
                />
              </View>
              <View style={styles.rowContainer}>
                <Text style={[styles.modalText, { marginHorizontal: wp(3) }]}>
                  2nd
                </Text>
                <TextInput
                  value={second}
                  onChangeText={setSecond}
                  style={styles.textInput}
                />
              </View>
              <View style={styles.rowContainer}>
                <Text style={[styles.modalText, { marginHorizontal: wp(3) }]}>
                  3rd
                </Text>
                <TextInput
                  value={third}
                  onChangeText={setThird}
                  style={styles.textInput}
                />
              </View>
              <Pressable onPress={onSendPress} style={styles.sendBtn}>
                <Text style={styles.btnText}>Send</Text>
              </Pressable>
            </View>
            <View />
          </View>
        </View>
      </Modal>
    );
  };
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  //Girish Chauhan...
  const showToastMsg = (msg = 'Something went wrong...', duration1 = 2000) => {
    Toast.hideAll();
    Toast.show(msg, {
      type: "normal",
      placement: "center",
      duration: duration1,
      offset: 30,
      animationType: "slide-in | zoom-in",
    });
  }
  return (
    <>
      <ActivityIndicator visible={isLoader} />
      <View stylele={{ flex: 1 }} >

        <GestureRecognizer
          onSwipeUp={() => onSwipe('UP')}
          onSwipeDown={() => onSwipe('DOWN')}
          config={config}>
          <FastImage style={styles.upperHalf}
            source={!isPartner ? partner_1 : {
              uri: prtnrImage,
              headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.normal
            }
            } />
          <FastImage style={styles.lowerHalf} source={{
            uri: userImage,
            headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.normal
          }} />
          {isPartner ? <Pressable
            style={styles.swiperView}
            onPress={() => setChoiceModalVisible(true)}>
            <Image
              style={styles.swipeIcons}
              source={require('../../assets/ic_up_down.png')}
            />
            <Text numberOfLines={2} style={styles.swipeText}>
              {listing.length < 1
                ? `What's for Dinner (3 Choices)`
                : listing[current]}
            </Text>
            <Image
              style={styles.swipeIcons}
              source={require('../../assets/ic_up_down.png')}
            />
          </Pressable> : <View />}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Image
              style={isPartner ? styles.backIcon : [styles.backIcon, { tintColor: '#000' }]}
              source={require('../../assets/ic_back.png')}
            />
          </TouchableOpacity>
          {isPartner ? <TouchableOpacity onPress={ontSelectPress} style={styles.selectButton}>
            <Text style={styles.selectBtn}>{selectBtn}</Text>
          </TouchableOpacity> : <View />}

        </GestureRecognizer>
        {_renderChoiceModal()}
        {/* {_renderQuestionSent()} */}
      </View>

    </>
  );
};

export default DinnerChoices;

// if (response[0]['secondimageUrl'] !== '' && response[0]['secondimageUrl'] !== undefined) {
        //   const sImg = response[0]['secondimageUrl'];
        //   setIsprtnrsecondImage(sImg);
        // }
        // else {
        //   const scndImg = UserStorage.imgUrl;
        //   setIsprtnrsecondImage(scndImg);
        // }