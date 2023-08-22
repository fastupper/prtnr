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
    marginTop: 10,
    marginRight: 31,
    alignSelf: 'flex-end',
  },
  line: {
    width: '100%',
    borderBottomWidth: 1,
    marginTop: 22,
    borderColor: '#707070',
  },

  Icon: {
    height: 50,
    width: 50,
  },

  close: {
    alignSelf: 'flex-end',
    right: 10,
    top: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: 20,
    width: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },

  button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // alignSelf:"center"
  },

  next: {
    width: '40%',
    height: 43,
    backgroundColor: 'white',
    borderRadius: 40,
    borderColor: '#707070',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rediotext: {
    fontFamily: font.AkrobatR,
    fontSize: 22,
    color: 'black',
  },

  ModalItem: {
    height: 100,
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 15,
    marginBottom: 30,
    justifyContent: 'center',
  },

  Modalview: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  textinput: {
    fontFamily: font.AkrobatR,
    fontSize: 20,
    color: 'black',
    paddingHorizontal: 1,
    paddingBottom: 10,
  },

  Add: {
    width: '47%',
    // width: 150,
    height: 105,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#707070',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
