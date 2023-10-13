//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import font from '../../utils/CustomFont';

const styles = StyleSheet.create({
  Accountdata: {
    fontFamily: font.AkrobatSB,
    color: '#000000',
    fontSize: 20,
    width: '100%',
    fontSize: 18,
    marginTop: 15,
  },
  button: {
    width: '100%',
    height: 35,
    borderRadius: 40,
    backgroundColor: '#021910',
    alignItems: 'center',
  },
  disabledBtn: {
    width: '100%',
    height: 35,
    borderRadius: 40,
    backgroundColor: '#707070',
    alignItems: 'center',
  },
  buttontext: {
    color: 'white',
    fontSize: 18,
    fontFamily: font.AkrobatSB,
    paddingTop: 6,
  },
  line: {
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  pointTxt: {
    fontSize: 18,
    fontFamily: font.AkrobatSB,
    borderWidth: 1,
    borderColor: '#707070',
    height: 35,
    width: 74,
    padding: 0,
    lineHeight: 35,
    textAlign: 'center',
  },
  jokeTxt: {
    fontFamily: font.AkrobatSB,
    color: '#000000',
    fontSize: 16,
    width: '100%',
    fontSize: 18,
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default styles;
