import { StyleSheet } from 'react-native'
import font from '../../utils/CustomFont';
const styles = StyleSheet.create({
    text: {
        fontFamily: font.AkrobatSB,
        fontSize: 18,
        color: "black"
    },
    text1: {
        fontFamily: font.AkrobatR,
        fontSize: 22,
        color: "black",
        marginTop: 11,
        marginRight: 31,
        alignSelf: "flex-end"
    },
    text2: {
        fontFamily: font.AkrobatR,
        fontSize: 18,
        color: "black"
    },
    img: {
        height: 82,
        width: 82,
        borderRadius: 41,
        alignSelf: "center",
        borderWidth: 1,
        borderColor: "black"

    },
    button: {
        alignSelf: "center",
    },

    buttontext: {
        textAlign: "center",
        width: 63,
        fontFamily: font.AkrobatR,
        fontSize: 20,
        color: "#707070",
        position: "absolute",
        left: 5
    },
    note: {
        fontFamily: font.AkrobatSB,
        fontSize: 10,
        color: "black",
        alignSelf: "center",
        marginTop: 5
    }


})
export default styles;