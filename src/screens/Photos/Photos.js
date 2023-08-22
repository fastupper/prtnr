import React, { useState } from 'react';
import { Text, ImageBackground, SafeAreaView, View, TouchableOpacity, FlatList } from 'react-native';
import styles from './Styles';
import Photosrow from "../../component/Photosrow"



const SplashScreen = ({ navigation, item }) => {
    const [selecte, setSelected] = useState("")
    const [data, setdata] = useState([
        { image: require('../../assets/profile.png') },
        { image: require('../../assets/profile.png') },
        { image: require('../../assets/profile.png') },
        { image: require('../../assets/profile.png') },
        { image: require('../../assets/profile.png') },
        { image: require('../../assets/profile.png') },
        { image: require('../../assets/profile.png') },
        { image: require('../../assets/profile.png') },
        { image: require('../../assets/profile.png') },
        { image: require('../../assets/profile.png') },
    ])
    const renderList = ({ item, index }) =>
    (

        <Photosrow item={item} selecte={selecte}
            onPress={(item) => {
                setSelected(index)
            }}

            index={index}
        />

    )

    const Add = () => {
        setdata(oldArray => [{ image: require('../../assets/add.png') }, ...oldArray]);
    }


    return (
        <SafeAreaView style={styles.containercontainer}>

            <View>

                <View style={styles.mainview}>
                    <View style={styles.connection}>
                        <Text
                            style={styles.text}>Connection selection</Text>
                    </View>

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={renderList}
                        keyExtractor={item => item.id}
                    />


                    <TouchableOpacity
                        onPress={() => Add()}
                        style={styles.add}>
                        <Text style={styles.Pluse}>+
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => { navigation.goBack() }}
                        style={styles.close}>
                        <Text
                            style={styles.closetext}>Close</Text>
                    </TouchableOpacity>

                </View>

                <View style={{ height: "30%", }}>
                    <TouchableOpacity style={{ marginLeft: 21, marginTop: 20, width: 80 }}>
                        <ImageBackground source={require('../../assets/Ellipse.png')} style={{ height: 60, width: 80, alignItems: "center", justifyContent: "center", }}>
                            <Text
                                style={styles.nav}>nav</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>

            </View>

        </SafeAreaView>
    );
};
export default SplashScreen;