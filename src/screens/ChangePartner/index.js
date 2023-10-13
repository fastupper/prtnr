import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import styles from './styles';
import {wp, hp} from '../../utils/size';
import FastImageView from '../../components/FastImageView';
import firebase from '../../api/firebase';
import UserStorage from '../../Data/UserStorage';
import ActivityIndicator from '../../components/ActivityIndicator';
import localStorage from '../../api/localStorage';
import {useIsFocused} from '@react-navigation/native';
import ChoosedPrtnr from '../../Data/ChoosedPrtnr';

const ChangePartner = ({navigation}) => {
  const isFocused = useIsFocused();
  const listRef = useRef(null);
  const [cIndex, setCIndex] = useState(0);
  // const [partners, setPartners] = useState([
  //   require('../../assets/pic_1.png'),
  //   require('../../assets/pic_2.png'),
  //   require('../../assets/pic_3.png'),
  //   require('../../assets/pic_4.png'),
  //   require('../../assets/pic_5.png'),
  // ]);

  //Girish Chauhan
  const [partners, setPartners] = useState([]);
  const [isPartner, setIsPartners] = useState(true);
  const [isLoader, setisLoader] = useState(false);
  const [prtnrName, setPartnername] = useState('');
  const [isWait, setIsWating] = useState('Please wait...');
  const getPartners = async () => {
    try {
      setisLoader(true);
      firebase.getAllPartnersData(UserStorage.userRefId, response => {
        if (response != null && response.length > 0) {
          setIsPartners(false);
          setPartnername(response[0].firstname);
          setPartners(response);
        } else {
          setIsWating('Please add partner...');
          setIsPartners(true);
        }
        setisLoader(false);
      });
    } catch (error) {
      setisLoader(false);
    }
  };
  useEffect(() => {
    getPartners();
    return function cleanup() {};
  }, [isFocused]);
  const scrollUp = () => {
    if (cIndex > 0) {
      listRef.current.scrollToIndex({index: cIndex - 1});
      if (cIndex < partners.length) {
        setPartnername(partners[cIndex - 1].firstname);
      }
      setCIndex(cIndex - 1);
    }
  };
  const scrollDown = () => {
    if (cIndex < partners.length - 1) {
      listRef.current.scrollToIndex({index: cIndex + 1});
      if (cIndex < partners.length) {
        setPartnername(partners[cIndex + 1].firstname);
      }
      setCIndex(cIndex + 1);
    }
  };
  const onScrollEnd = e => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;
    let pageNum = Math.floor(contentOffset.y / viewSize.height);

    const index = Math.floor(
      Math.floor(e.nativeEvent.contentOffset.y) /
        Math.floor(e.nativeEvent.layoutMeasurement.height),
    );
    setCIndex(index);

    if (pageNum < partners.length) {
      setPartnername(partners[index].firstname);
    }
  };
  const choosePartner = async () => {
    if (cIndex < partners.length) {
      const prtnr = partners[cIndex];
      const selected = true;
      const prtnrRefId = prtnr.prtnrRefId;
      ChoosedPrtnr.partnerRefId = prtnrRefId;
      try {
        setisLoader(true);
        firebase.partnerChoosed(selected, prtnrRefId, response => {
          if (response === 'success') {
            navigation.goBack();
          }
          setisLoader(false);
        });
      } catch (error) {
        setisLoader(false);
      }
      //
      // localStorage.setPartnerTolocal(prtnr).then(() => {
      //   navigation.goBack();
      // });
    }
  };
  const {height, width} = Dimensions.get('window');
  return (
    <>
      <ActivityIndicator visible={isLoader} />
      <View style={{flex: 1}}>
        {isPartner && (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => navigation.navigate('Otherdetails')}>
              <Text style={styles.noPartnerText}>{isWait}</Text>
            </TouchableOpacity>
          </View>
        )}
        <FlatList
          ref={listRef}
          onMomentumScrollEnd={onScrollEnd}
          pagingEnabled
          data={partners}
          renderItem={({item}) => {
            return <FastImageView item={item} isLocal={isPartner} />;
          }}
          snapToAlignment="start"
          decelerationRate={'fast'}
          snapToInterval={Dimensions.get('window').height}
        />
        <View style={styles.bottomContainer}>
          <TouchableOpacity disabled={cIndex == 0} onPress={scrollUp}>
            <Image
              style={[styles.upIcon, cIndex == 0 && {opacity: 0}]}
              source={require('../../assets/ic_up.png')}
            />
          </TouchableOpacity>
          <Text style={styles.nameText}>{prtnrName}</Text>
          {!isPartner && (
            <TouchableOpacity
              disabled={cIndex == partners.length - 1}
              onPress={scrollDown}>
              <Image
                style={[
                  styles.upIcon,
                  cIndex == partners.length - 1 && {opacity: 0},
                ]}
                source={require('../../assets/ic_down.png')}
              />
            </TouchableOpacity>
          )}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {!isPartner && (
              <TouchableOpacity
                onPress={() => choosePartner()}
                style={[
                  styles.chooseBtn,
                  (cIndex == 0 || cIndex == partners.length - 1) && {
                    width: wp(35),
                  },
                ]}>
                <Text style={styles.btnText}>Choose</Text>
              </TouchableOpacity>
            )}
            {(cIndex == 0 || cIndex == partners.length - 1) && (
              <TouchableOpacity
                onPress={() => navigation.navigate('Otherprofile1')}
                //style={styles.plusBtn}
                style={
                  !isPartner
                    ? styles.plusBtn
                    : [styles.plusBtn, {borderColor: '#000'}]
                }>
                <Image
                  style={
                    !isPartner
                      ? styles.plusIcon
                      : [styles.plusIcon, {tintColor: '#000'}]
                  }
                  source={require('../../assets/plusB.png')}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Image
            style={
              !isPartner
                ? styles.ic_back
                : [styles.ic_back, {tintColor: '#000'}]
            }
            source={require('../../assets/ic_back.png')}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
export default ChangePartner;
