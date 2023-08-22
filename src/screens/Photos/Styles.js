//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import font from '../../utils/CustomFont';


const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "white"
    },
    Pluse: {
        color: "#707070",
        fontFamily: font.AkrobatR,
        fontSize: 70
    },
    mainview: {
        height: "75%",
        width: "85%",
        backgroundColor: "#e7e7e4",
        marginTop: 20,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    connection: {
        marginLeft: 30,
        marginTop: 10,
        justifyContent: "center",
        width: "50%"
    },
    text: {
        fontFamily: font.AkrobatR,
        fontSize: 25,
        color: "black", textAlign: "left"
    },
    add: {
        marginTop: 20,
        marginLeft: 30,
        height: 91,
        backgroundColor: "white",
        width: "40%",
        borderWidth: 1.5,
        borderColor: "black",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    close: {
        marginLeft: 30,
        marginTop: 20,
        height: 37,
        backgroundColor: "white",
        width: "40%",
        borderRadius: 15,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    closetext: {
        fontFamily: font.AkrobatR
        , fontSize: 20,
        color: "#707070",
    },
    nav: {
        fontFamily: font.AkrobatR,
        fontSize: 20,
        color: "black",
    }
});

export default styles;
