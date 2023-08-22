//import liraries
import React, { Component, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Backarrow from "../../assets/svg/arrowback"
import font from '../../utils/CustomFont';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const MyComponent = ({ navigation, route }) => {

    const Useremail = route.params.email;
    const [right, setright] = useState("")
    const [code, setCode] = useState("")
    //Let's make sure it's really you. We've just sent
    //a text message with a fresh verification code
    //to the phone number ending in ********2393.
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={{ width: "100%", alignItems: "center", marginTop: 10, justifyContent: "center" }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ position: "absolute", left: 16, }}>
                        <Backarrow />
                    </TouchableOpacity>
                    <Text style={[styles.welcome, { fontSize: 18, alignSelf: "center", marginTop: 0, marginBottom: 0 }]}>Email Verification</Text>
                </View>
                <View style={{ width: '100%', marginTop: "50%", paddingTop: 10, paddingBottom: 10 }}>
                    <Text style={[styles.text, { marginBottom: 20, textAlign: 'left' }]}>{'Enter verification code'}</Text>
                    <View style={{ width: "90%", alignSelf: "center", height: 60, }}>
                        {/* <OtpInputs
                            handleChange={code => setCode1(code)}
                            autofillFromClipboard={false}
                            numberOfInputs={5}
                            inputContainerStyles={styles.code}
                            autoFocus={true}
                            color="black"
                            fontSize={15}
                            clearTextOnFocus={true}
                            autoFocusOnLoad={true}
                            fontWeight={"bold"}
                            textAlign="center"
                            keyboardType="phone-pad"
                        /> */}
                        <OTPInputView 
                            pinCount={5}
                            style={{height: 50}}
                            autoFocusOnLoad
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            codeInputFieldStyle={styles.underlineStyleBase}
                            onCodeFilled={(code) => {
                                setCode(code);
                            }}
                        />
                    </View>
                    <Text style={styles.text}>
                        We have sent the verification code to your provided email, {Useremail} please verify your email to use prtnr app
                    </Text>

                    {right=="" && <TouchableOpacity
                        onPress={ async () => { 
                            try {
                                await fetch('https://prtnr.onrender.com/confirm-verification', {
                                method: 'POST',
                                headers: { Accept: 'application/json',
                                'Content-Type': 'application/json', },
                                body: JSON.stringify({
                                    email: Useremail,
                                    verifCode: code,
                                    }),
                                })
                                .then((response) => response.json())
                                .then((responseData) => {
                                    if (responseData.title == 'true') {
                                        navigation.navigate('Registration', {isVerified: true})
                                    } else {
                                        setright(responseData.message);
                                    }
                                });
                            } catch (error) {
                                console.log(error);
                            }
                        }}
                        style={styles.Verify}
                        >
                        <Text style={styles.very}>Verify</Text>
                    </TouchableOpacity>}
                    <Text
                        style={{ alignSelf: 'center', marginTop: 50, color: 'red', fontSize: 20 }}>
                        {right}
                    </Text>
                    
                </View>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    code: {
        height: 50,
        width: 50,
        borderRadius: 15,
        alignItems: "center",
        alignContent: "center",
        justifyContent: 'center',
        color: "black",
        borderWidth: 2,
        borderColor: "black",
    },

    underlineStyleBase: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: "#000000",
        color: '#000000',
        fontSize: 17,
        borderRadius: 10,
      },
    underlineStyleHighLighted: {
        width: 50,
        height: 50,
        borderWidth: 3,
        borderColor: "#000000",
        color: '#000000',
        fontSize: 17,
        borderRadius: 10,
    },

    text: {
        fontFamily: font.QuicksandR,
        fontSize: 16,
        color: "black",
        alignSelf: "center",
        width: "85%",
        marginTop: 10,
        textAlign: "center"
    },
    welcome: {
        fontFamily: font.QuicksandM,
        fontSize: 20,
        color: "black",
        alignSelf: "center",

    },
    Verify: {
        height: 40,
        width: 190,
        borderRadius: 40,
        backgroundColor: "#000000",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        alignSelf: "center",
        marginTop: 40
    },
    very: {
        fontFamily: font.QuicksandM,
        fontSize: 16,
        color: "white",

    },
});
export default MyComponent;
