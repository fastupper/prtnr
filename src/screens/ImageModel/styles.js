import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    Icon: {
        height: 50,
        width: 50,
    },
    button: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // alignSelf:"center"
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
});
export default styles;