//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import font from '../../utils/CustomFont';

const styles = StyleSheet.create({
    nothing: {
        fontSize: 20,
        fontFamily: font.AkrobatSB,
        color: "black",
        alignSelf: "center",
        justifyContent: "center",
        width: "30%",
        textAlign: "center"
    },
    Accountdata: {
        fontFamily: font.QuicksandR,
        color: '#000000',
        fontSize: 18,
    },
    Biometric: {
        marginHorizontal: 20,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        justifyContent: 'space-between',
    },

});

export default styles;
