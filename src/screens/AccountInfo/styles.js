//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import font from '../../utils/CustomFont';

const styles = StyleSheet.create({
  nothing: {
    fontSize: 20,
    fontFamily: font.AkrobatSB,
    color: 'black',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '30%',
    textAlign: 'center',
  },

  Accountdata: {
    fontFamily: font.QuicksandR,
    color: '#000000',
    fontSize: 18,
  },

  button: {
    width: '90%',
    height: 35,
    borderRadius: 40,
    backgroundColor: '#707070',
    alignItems: 'center',
    marginTop: 30,
  },
  buttontext: {
    color: 'white',
    fontSize: 18,
    fontFamily: font.AkrobatR,
    paddingTop: 6,
  },
  line: {
    width: '100%',
    marginTop: 30,
    borderBottomWidth: 1,
  },

  //   phoneInput: {
  //     borderWidth: 1,
  //     borderRadius: 25,
  //     width: 250,
  //     height: 50,
  //     padding: 5,
  // },

  Biometric: {
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    height: 126,
    width: 126,
    // borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderRadius: 63,
    marginTop: 5,
    backgroundColor: '#E8E8E8',
    overflow: 'hidden',
    marginRight: 24,
  },
  profile: {
    // backgroundColor: '#E8E8E8',
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: 'center',
    fontSize: 18,
    resizeMode: 'contain',
  },
  profileImage: {
    height: 130,
    width: 130,
    resizeMode: 'cover',
  },
  Modalview: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  ModalItem: {
    height: 100,
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 15,
    marginBottom: 30,
    justifyContent: 'center',
  },
  close: {
    alignSelf: 'flex-end',
    right: 10,
    top: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: 20,
    width: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },

  button2: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // alignSelf:"center"
  },
  Icon: {
    height: 50,
    width: 50,
  },
});

export default styles;
