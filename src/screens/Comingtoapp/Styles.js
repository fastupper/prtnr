import { StyleSheet } from 'react-native'
import font from '../../utils/CustomFont';
const styles = StyleSheet.create({
    text: {
        fontFamily: font.AkrobatR,
        fontSize: 30,
        color: "black"
    },
    text1: {
        fontFamily: font.AkrobatB,
        fontSize: 22,
        color: "black",
        marginRight: 31,
        alignSelf: "flex-end"
    },
    text2: {
        fontFamily: font.AkrobatR,
        fontSize: 18,
        color: "black"

    },

    button: {
        width: "90%",
        alignSelf: "center",
        marginTop: 20,
        height: 58,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        borderRadius: 9
    },

    textbutton: {
        fontFamily: font.AkrobatR,
        color: "white",
        fontSize: 20

    },

    next: {
        width: "33%",
        height: 91,
        backgroundColor: "white",
        borderRadius: 10,
        borderColor: "#707070",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-end",
        marginRight: 20,
    },


})
export default styles;