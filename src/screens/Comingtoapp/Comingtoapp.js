import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import style from './Styles';
import Arrowwhite from "../../assets/svg/arrowwhite"
const SplashScreen = ({ navigation, route }) => {
    const name = route.params.contactName;
    const windowHeight = useWindowDimensions().height;
    const [right, setright] = useState("")
    const [open, setopen] = useState(false)
    const Hand = async () => {
        const result = await AsyncStorage.getItem("Hand")
        console.log("Hand:", result)
        setright(result)
    }
    useEffect(() => {
        Hand()
    })
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground imageStyle={{ resizeMode: "stretch" }} style={{ flex: 1, height: windowHeight, width: "100%" }} source={require('../../assets/otherimage.png')}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <KeyboardAvoidingView>
                        <View style={{ flexDirection: "row", marginTop: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack("")}
                                style={{ marginLeft: 15, }}>
                                <Arrowwhite />
                            </TouchableOpacity>
                            <Text style={style.text1}>prtnr</Text>
                        </View>
                        <View style={{ width: "100%", marginTop: windowHeight / 11 }}>
                            <View style={{ width: "80%", marginLeft: 31, marginTop: 20 }}>
                                <Text style={style.text}>Hi@({name})</Text>
                                <Text style={style.text}>Guess who’s coming the app</Text>
                                <View style={{ marginTop: 15 }}>
                                    <Text style={style.text2}>
                                        So you just got an invite from someone that cares about you. They want to connect and build the communication in your relationship and make everybody happy. Or something like that but it requires you to be there as well. Connect the link below to sign up and create account and connect with your partner ({name} )                                   </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => { navigation.navigate('NewHomeScreen', { right: right }) }}
                                style={style.button}>
                                <Text style={style.textbutton}>Connect and Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};
export default SplashScreen;