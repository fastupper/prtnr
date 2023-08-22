import React, { useState } from 'react';
import { Text, SafeAreaView, View, Image, FlatList, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import styles from './Styles';
import Profilerow from '../../component/Profilerow';
import * as Animatable from 'react-native-animatable'



const SplashScreen = ({ navigation, route }) => {
    const windowHeight = useWindowDimensions().height;
    const { right } = route.params;
    const [open, setopen] = useState(false)
    const [loader, setLoader] = useState(false)
    const [data, setdata] = useState([
        { index: 0, text: "Ask them how their day was?" },
        { index: 1, text: "Figure out dinner before they ask about it and tell them it’s taken care of as they are on their way home." },
        { index: 2, text: "Write a note and leave it in their coat pocket and let them know that they are very special to you and your life wouldn't be the same without them. You could probably write something better than that but I'm just saying." },
        { index: 3, text: "Send a random text message" },
        { index: 4, text: "Figure out dinner before they ask about it and tell them it’s taken care of as they are on their way home." },
        { index: 5, text: "Send a random text message" },
        { index: 6, text: "Write a note and leave it in their coat pocket and let them know that they are very special to you and your life wouldn't be the same without them. You could probably write something better than that but I'm just saying." },
    ])

    const data1 = [
        { index: 0, text: "Ask them how their day was?" },
        { index: 1, text: "Figure out dinner before they ask about it and tell them it’s taken care of as they are on their way home." },
        { index: 2, text: "Write a note and leave it in their coat pocket and let them know that they are very special to you and your life wouldn't be the same without them. You could probably write something better than that but I'm just saying." },
        { index: 3, text: "Send a random text message" },
        { index: 4, text: "Figure out dinner before they ask about it and tell them it’s taken care of as they are on their way home." },
        { index: 5, text: "Send a random text message" },
        { index: 6, text: "Write a note and leave it in their coat pocket and let them know that they are very special to you and your life wouldn't be the same without them. You could probably write something better than that but I'm just saying." },
    ]

    const renderList = ({ item, index }) =>
    (
        <View>
            <Profilerow item={item}
                delete={(index) => {
                    setLoader(true)
                    setdata(data.filter(item1 => item1.index != index))
                    setTimeout(() => { setLoader(false) }, 1)
                }}
                changetask={(i) => {
                    setLoader(true)
                    var temp = data
                    temp[index] = { index: i, text: data1[Math.floor(Math.random() * 7)].text }
                    setdata(temp)
                    setTimeout(() => { setLoader(false) }, 1)

                }}
                index={index}
                right={right}
            />
            {index == "0" ?
                <Text style={styles.note}>Don’t like the suggestion just swipe to the left and change it</Text>
                :
                null
            }
        </View>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

            <ScrollView style={{ flex: 1 }}>

                <View style={{ backgroundColor: "white" }}>

                    <Text style={styles.text1}>prtnr</Text>

                    <View style={{ alignSelf: "center", alignItems: "center", width: 120 }}>
                        <Image style={styles.img} imageStyle={{ resizeMode: "stretch" }} source={require('../../assets/profile.png')}></Image>
                        <Text style={styles.text}>Susan</Text>
                        <Text style={[styles.text, { position: "absolute", right: 0, bottom: 22 }]}>23.7</Text>
                    </View>

                    <View style={{ width: "100%", alignSelf: "center", marginTop: 20 }}>

                        <View style={{ width: "90%", flexDirection: "row", alignItems: "center", alignSelf: "center", justifyContent: "space-between" }}>
                            <Text style={styles.text}>TTD - 0/6</Text>
                            <Text style={styles.text}>Feb 04 2022</Text>
                        </View>

                        {
                            loader ? null :

                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={data}
                                    renderItem={renderList}
                                    keyExtractor={item => item.image}
                                />
                        }
                    </View>

                </View>



            </ScrollView>

            <View style={{ position: "absolute", left: right != "right" ? 30 : null, right: right != "right" ? null : 30, bottom: 50 }}>
                {open == true ?
                    <View>
                        <Animatable.View animation={open == true ? "swing" : "slideOutDown"} >
                            <TouchableOpacity
                                onPress={() => { navigation.navigate("Photos") }}
                                style={{ marginTop: 20 }}>
                                <Image style={styles.button} imageStyle={{ resizeMode: "stretch" }} source={require('../../assets/setting.png')}></Image>
                                <Text style={[styles.buttontext, { top: 16 }]}>Change prtner</Text>
                            </TouchableOpacity>
                        </Animatable.View>

                        <Animatable.View animation={open == true ? "swing" : "slideOutDown"} >
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Tabs")}
                                style={{ marginTop: 20 }}>
                                <Image style={styles.button} imageStyle={{ resizeMode: "stretch" }} source={require('../../assets/setting.png')}></Image>
                                <Text style={[styles.buttontext, { top: 26 }]}>Settings</Text>
                            </TouchableOpacity>
                        </Animatable.View>

                        <Animatable.View animation={open == true ? "swing" : "slideOutDown"} >
                            <TouchableOpacity
                                onPress={() => { }}
                                style={{ marginTop: 20 }}>
                                <Image style={styles.button} imageStyle={{ resizeMode: "stretch" }} source={require('../../assets/setting.png')}></Image>
                                <Text style={[styles.buttontext, { top: 26 }]}>Library</Text>
                            </TouchableOpacity>
                        </Animatable.View>

                        <Animatable.View animation={open == true ? "swing" : "slideOutDown"}>
                            <TouchableOpacity style={{ marginTop: 20 }}>
                                <Image style={styles.button} imageStyle={{ resizeMode: "stretch" }} source={require('../../assets/setting.png')}></Image>
                                <Text style={[styles.buttontext, { top: 16 }]}>Community</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                    </View>
                    :
                    null
                }
                <TouchableOpacity
                    onPress={() => {
                        setopen(!open)
                    }}
                    style={{ marginTop: 20 }}>
                    <Image style={styles.button} imageStyle={{ resieMode: "stretch" }} source={require('../../assets/setting.png')}></Image>
                    <Text style={[styles.buttontext, { top: 26 }]}>Nav</Text>
                </TouchableOpacity>

            </View>


        </SafeAreaView>
    );
};
export default SplashScreen;