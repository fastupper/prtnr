import {StyleSheet} from 'react-native';
import font from '../../utils/CustomFont';
const styles = StyleSheet.create({
  text: {
    fontFamily: font.AkrobatR,
    fontSize: 30,
    color: 'black',
  },
  text1: {
    fontFamily: font.AkrobatB,
    fontSize: 22,
    color: 'black',
    marginRight: 31,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  Add: {
    width: 143,
    height: 91,
    backgroundColor: 'white',
    borderRadius: 9,
    borderColor: '#707070',
    marginTop: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    fontFamily: font.AkrobatR,
    fontSize: 30,
    color: '#707070',
  },
  skipText: {
    color: '#134634',
    marginLeft: '5%',
    position: 'absolute',
    bottom: '2%',
    fontSize: 18,
    fontFamily: font.AkrobatSB,
  },
});
export default styles;
