import React, { useEffect, useState } from 'react';
import { Text, Image, SafeAreaView, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import styles from "./styles";

const SplashScreen = ({ navigation, item }) => {

    const [isShow, issetShow] = useState(false);
    const [isPrivacy, setisPrivacy] = useState(false);
    const [isWhat, setisWhat] = useState(false);
    //setshow("1")
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={{}}>
                <Text onPress={() => { issetShow(!isShow); setisPrivacy(false); setisWhat(false) }} style={[styles.text, { marginTop: 28, }]}>Terms and Conditions</Text>
                {isShow == true ?
                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.text2}>
                            Dolor repellendus illo. Tempore consectetur molestias porro excepturi recusandae officiis ducimus consectetur. Veritatis et impedit in veritatis. Mollitia cum sed voluptatum laborum temporibus. Voluptas et quis hic eos ea et quibusdam eaque. Odit quia inventore et.
                        </Text>
                        <Text style={[styles.text2, { marginTop: 20 }]}>
                            Et recusandae officiis est fugit omnis. Ea eligendi totam ratione est eligendi quam nobis vero. Rerum voluptas ipsam odit incidunt. Qui et placeat officia voluptate amet voluptate. Et tempora aut.
                        </Text>
                        <Text style={[styles.text2, { marginTop: 20 }]}>
                            Inventore sed similique quasi ab dignissimos. Numquam et ipsam est id cupiditate est exercitationem velit. Consequatur facilis omnis ea ut quia earum minima aut. Est rerum delectus ad tempora velit saepe et tempore. out-of-the-box reinvent web services next-generation seize platforms Terms and Conditions
                        </Text>
                        <Text style={[styles.text2, { marginTop: 20 }]}>
                            Et recusandae officiis est fugit omnis. Ea eligendi totam ratione est eligendi quam nobis vero. Rerum voluptas ipsam odit incidunt. Qui et placeat officia voluptate amet voluptate. Et tempora aut.
                        </Text>
                    </View>
                    :
                    null
                }
                <Text onPress={() => { setisPrivacy(!isPrivacy); issetShow(false); setisWhat(false) }} style={styles.text}>Privacy Policy</Text>
                {isPrivacy == true ?
                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.text2}>
                            Dolor repellendus illo. Tempore consectetur molestias porro excepturi recusandae officiis ducimus consectetur. Veritatis et impedit in veritatis. Mollitia cum sed voluptatum laborum temporibus. Voluptas et quis hic eos ea et quibusdam eaque. Odit quia inventore et.
                        </Text>
                        <Text style={[styles.text2, { marginTop: 20 }]}>
                            Et recusandae officiis est fugit omnis. Ea eligendi totam ratione est eligendi quam nobis vero. Rerum voluptas ipsam odit incidunt. Qui et placeat officia voluptate amet voluptate. Et tempora aut.
                        </Text>
                        <Text style={[styles.text2, { marginTop: 20 }]}>
                            Inventore sed similique quasi ab dignissimos. Numquam et ipsam est id cupiditate est exercitationem velit. Consequatur facilis omnis ea ut quia earum minima aut. Est rerum delectus ad tempora velit saepe et tempore. out-of-the-box reinvent web services next-generation seize platforms Terms and Conditions
                        </Text>
                        <Text style={[styles.text2, { marginTop: 20 }]}>
                            Et recusandae officiis est fugit omnis. Ea eligendi totam ratione est eligendi quam nobis vero. Rerum voluptas ipsam odit incidunt. Qui et placeat officia voluptate amet voluptate. Et tempora aut.                        </Text>
                    </View>
                    :
                    null
                }
                <Text onPress={() => { setisWhat(!isWhat); setisPrivacy(false); issetShow(false) }} style={styles.text}>What we stand for</Text>
                {isWhat == true ?
                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.text2}>
                            Dolor repellendus illo. Tempore consectetur molestias porro excepturi recusandae officiis ducimus consectetur. Veritatis et impedit in veritatis. Mollitia cum sed voluptatum laborum temporibus. Voluptas et quis hic eos ea et quibusdam eaque. Odit quia inventore et.
                        </Text>
                        <Text style={[styles.text2, { marginTop: 20 }]}>
                            Et recusandae officiis est fugit omnis. Ea eligendi totam ratione est eligendi quam nobis vero. Rerum voluptas ipsam odit incidunt. Qui et placeat officia voluptate amet voluptate. Et tempora aut.
                        </Text>
                        <Text style={[styles.text2, { marginTop: 20 }]}>
                            Inventore sed similique quasi ab dignissimos. Numquam et ipsam est id cupiditate est exercitationem velit. Consequatur facilis omnis ea ut quia earum minima aut. Est rerum delectus ad tempora velit saepe et tempore. out-of-the-box reinvent web services next-generation seize platforms Terms and Conditions
                        </Text>
                        <Text style={[styles.text2, { marginTop: 20 }]}>
                            Et recusandae officiis est fugit omnis. Ea eligendi totam ratione est eligendi quam nobis vero. Rerum voluptas ipsam odit incidunt. Qui et placeat officia voluptate amet voluptate. Et tempora aut.
                        </Text>
                    </View>
                    :
                    null
                }
            </View>
        </SafeAreaView>
    );
};
export default SplashScreen;