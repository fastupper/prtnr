import { StyleSheet } from 'react-native'
import font from '../../utils/CustomFont';
const styles = StyleSheet.create({
    view: {
        height: '100%',
        width: '100%',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        position: 'absolute'

    },

    button: {
        borderRadius: 5,
        height: 36,
        backgroundColor: '#000CFF',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:"center",
        width: '80%'
    },

    buttontext: {
        color: 'black',
        fontSize: 18,
        fontFamily:font.AkrobatB
    },

    close: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: 36,
        width: 36,
        marginVertical: 30,
        borderRadius: 30
    },

    start: {
        color: 'white',
        fontSize: 10,
        position: 'absolute',
        bottom: 30,
        fontFamily:font.AkrobatR
    },

    prtnr: {
        backgroundColor: 'white',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: 47,
        width: '100%',
        marginBottom: 50
    },

    prtnrtext: {
        fontFamily:font.AkrobatB,
        color: 'black',
        fontSize: 24,
        marginRight: 20
    }



})
export default styles;