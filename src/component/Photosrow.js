import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import font from '../utils/CustomFont';



const SplashScreen = (props) => {

    return (
        <View style={{ width: "100%", flex: 1, marginBottom: 10, marginLeft: 30, alignItems: "center", flexDirection: "row", }}>

            < TouchableOpacity
                onPress={() => {props.onPress(props.index)}}
                style={{ width: "40%" }}>
                <Image source={props.item.image} style={{ width: "100%", height: 91, borderWidth: props.selecte == props.index ?5 : 0, borderRadius: 10, borderColor: "white" }} />
            </TouchableOpacity>



            {
                props.selecte == props.index ?
                    <TouchableOpacity style={{ borderRadius: 20, marginLeft: "15%", height: 37, width: "20%", backgroundColor: "black", alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 20, color: "white", fontFamily: font.AkrobatR, textAlign: "center", }}>
                            select
                        </Text>
                    </TouchableOpacity>
                    :
                    null
            }

        </View >
    )

}
export default SplashScreen