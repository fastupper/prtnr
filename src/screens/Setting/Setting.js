import React, { useEffect, useState } from 'react';
import { Text, Image, SafeAreaView, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import styles from './styles';
//Girish Chauhan

import SwitchToggle from 'react-native-switch-toggle';

const SplashScreen = (navigation, item) => {

    const [on, off] = useState(false);
    const OpneModal = async (onOpen) => {

    }
    return (
        <SafeAreaView style={{ alignItems: "center", flex: 1 }} >


            <View style={[styles.Biometric, { marginTop: 28, }]}>
                <View style={{ width: '70%' }}>
                    <Text style={[styles.Accountdata, { width: '95%', fontSize: 18 }]}>
                        Setup simple authentication with your existing security from your
                        device.
                    </Text>
                </View>
                <View style={{ width: '30%', alignItems: 'center' }}>
                    <SwitchToggle
                        switchOn={on}
                        onPress={() => {
                            off(!on)
                            OpneModal(!on);
                        }}
                        circleColorOff="#f4f3f4"
                        circleColorOn="#767577"
                        backgroundColorOn="#f4f3f4"
                        backgroundColorOff="white"
                        containerStyle={{
                            width: 33,
                            borderRadius: 15,
                            height: 21,
                            borderColor: 'black',
                            borderWidth: 1,
                            padding: 5,
                        }}
                        circleStyle={{
                            width: 9,
                            height: 9,
                            borderRadius: 4.5,
                            borderWidth: 1,
                            borderColor: 'black',
                        }}
                    />
                    <Text style={[styles.Accountdata, { fontSize: 14 }]}>
                        {' '}
                        Tap to turn on
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};
export default SplashScreen;
//    <Text style={styles.nothing}>
//Nothing Here Yet…
//</Text>//