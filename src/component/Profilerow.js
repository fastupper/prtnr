import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import font from '../utils/CustomFont';
import { SwipeItem, SwipeButtonsContainer, SwipeProvider } from 'react-native-swipe-item';



const RenderList = (props) => {

    const leftButton = (
        <SwipeButtonsContainer >
       
            <TouchableOpacity
                onPress={() => {
                  props.changetask()  

                }}
                style={{
                    flexDirection: 'column',
                    justifyContent: "center",
                    alignSelf: "center",
                    width: 70,
                    backgroundColor: "white",
                    borderRadius: 5,
                    paddingVertical: props.item.text.length <= 55 ? 15 : props.item.text.length >= 55 && props.item.text.length <= 130 ? 35 : 55,
                    borderColor: "#707070",
                    borderWidth: 1,
                    marginLeft:12
                }}
            >
                <Text style={{ fontFamily: font.AkrobatSB, fontSize: 12, color: "black", textAlign: "center" }} >Change</Text>
            </TouchableOpacity>
        </SwipeButtonsContainer>
    )

    const rightButton = (
        <SwipeButtonsContainer
        >
            <TouchableOpacity
                onPress={() => props.delete(props.item.index)}
                style={{
                    flexDirection: 'column',
                    justifyContent: "center",
                    alignSelf: "center",
                    width: 70,
                    backgroundColor: "white",
                    borderRadius: 5,
                    paddingVertical: props.item.text.length <= 55 ? 10 : props.item.text.length >= 55 && props.item.text.length <= 130 ? 30 : 50,
                    borderColor: "#707070",
                    borderWidth: 1,
                    marginRight:12
                }}
            >
                <Text style={{ fontFamily: font.AkrobatSB, fontSize: 12, color: "black", textAlign: "center" }} >Completed</Text>
            </TouchableOpacity>
        </SwipeButtonsContainer>
    )

    return (
        <SwipeProvider style={{ flex: 1 }}>

            <View style={{
                justifyContent: "center", flex: 1,
                marginBottom: props.index == 6 ? 70 : 0, marginTop: 10
            }}>

                <SwipeItem
                    style={{ alignItems: "center" }}
                    swipeContainerStyle={{
                        backgroundColor: '#ffffff',
                        borderRadius: 25
                    }}
                    rightButtons={rightButton}
                    leftButtons={leftButton}
                >
                    <View style={{
                        flexDirection: "row",alignSelf:"center",
                        alignItems: "center", width: "90%", borderWidth: 1, borderRadius: 5, borderColor: "#707070",
                    }}>
                        <Text style={{ height: "100%", borderLeftWidth: 20, borderLeftColor: props.item.text.length <= 55 ? "#CCA027" : props.item.text.length >= 55 && props.item.text.length <= 130 ? "#D0CDCD" : "#E8AF15" }} ></Text>

                        <Text style={{ fontFamily: font.AkrobatSB, width: "85%", fontSize: 18, color: "black", margin: 10 }}>{props.item.text}</Text>
                    </View>

                </SwipeItem>

            </View>



        </SwipeProvider>
    );
};



export default RenderList