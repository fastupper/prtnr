import { StyleSheet } from 'react-native';
import font from '../../utils/CustomFont';
import { wp, hp } from '../../utils/size';

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
    alignSelf: 'flex-end',
  },
  line: {
    width: '100%',
    borderBottomWidth: 1,
    marginTop: 22,
  },
  Add: {
    width: '40%',
    height: 103,
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: '#707070',
    marginTop: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  next: {
    position: 'absolute',
    right: wp(5),
    bottom: hp(3),
    // width: '33%',
    width: wp(33),
    height: hp(5),
    backgroundColor: 'white',
    borderRadius: 30,
    borderColor: '#707070',
    borderWidth: 1,
    // marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    // marginRight: 20,
  },

  plus: {
    fontFamily: font.AkrobatR,
    fontSize: 30,
    color: '#707070',
  },

  textinput: {
    fontFamily: font.AkrobatR,
    fontSize: 20,
    color: 'black',
    padding: 0,
    marginTop: 5,
  },
  ansInput: {
    fontFamily: font.AkrobatR,
    fontSize: 20,
    color: 'black',
    padding: 0,
    marginTop: '10%',
    borderBottomWidth: 1,
    // maxWidth: '90%',
  },
  listText: {
    fontFamily: font.AkrobatR,
    fontSize: 20,
    color: 'black',
    padding: 0,
    // marginTop: '10%',
    // borderBottomWidth: 1,
  },
  addBtn: {
    width: '70%',
    height: hp(5),

    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '10%',
    borderRadius: 40,
    backgroundColor: '#D0EAEF',
    zIndex: 1,
  },
  btnText: {
    fontFamily: font.QuicksandM,
    fontSize: 16,
    color: 'black',
  },

  rediotext: {
    fontFamily: font.AkrobatR,
    fontSize: 22,
    color: 'black',
  },
  listItem: {
    marginTop: 20,
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    borderColor: 'gray',

  },
});
export default styles;
