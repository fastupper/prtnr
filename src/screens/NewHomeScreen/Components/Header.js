import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import colors from '../../../utils/colors';
import strings from '../../../utils/strings';
import font from '../../../utils/CustomFont';
import firebase from '../../../api/firebase';
import localStorage from '../../../api/localStorage';

const Header = ({ onProfilePress }) => {

  const [imgUrl, setProfileImage] = useState('');

  const fetchUserData = async () => {

    localStorage.getUserFromlocal((userValue) => {
      setProfileImage(userValue.profileImg);
    })
  }
  useEffect(() => {
    fetchUserData();
  }, [])
  const ProfileImg = () => {

    const src = imgUrl ? imgUrl : 'src';
    if (src === 'src') {
      return (
        <Image
          imageStyle={{ resizeMode: 'contain' }}
          source={require('../../../assets/profile.png')}
          style={[styles.profileImage, {}]}></Image>

      );
    }
    else {
      return (
        <Image
          imageStyle={{ resizeMode: 'contain' }}
          source={{ uri: src }}
          style={[styles.profileImage, {}]}></Image>

      )
    }

  }
  return (
    <View style={[styles.container,]}>
      <TouchableOpacity onPress={onProfilePress} style={styles.profileView}>
        {/* <Image
          style={styles.profileImage}
          resizeMode="contain"
          source={require('../../../assets/profile.png')}
        /> */}
        <ProfileImg />
      </TouchableOpacity>
      <Text style={styles.profileText}>{strings.Me}</Text>
      <Text style={styles.prtnrText}>{strings.PRTNR}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    marginTop: '2%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileView: {
    // width: 28,
    // height: 28,
    borderRadius: 14,
    // borderWidth: 1,
  },
  profileText: {
    marginStart: 8,
    flex: 1,
    color: colors.black.default,
    fontSize: 16,
    fontFamily: font.AkrobatSB,
  },
  prtnrText: {
    color: colors.black.default,
    fontSize: 22,
    fontFamily: font.AkrobatB,
  },
  profileImage: {
    height: 28,
    width: 28,
    borderRadius: 14,

  },
});

export default Header;
