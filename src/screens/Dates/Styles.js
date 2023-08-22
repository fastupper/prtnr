import { StyleSheet } from 'react-native';
import font from '../../utils/CustomFont';
import { wp, hp } from '../../utils/size';

const styles = StyleSheet.create({
  text: {
    fontFamily: font.AkrobatR,
    fontSize: 30,
    color: 'black',
  },
  rediotext: {
    fontFamily: font.AkrobatR,
    fontSize: 22,
    color: 'black',
  },
  date: {
    width: '30%',
    alignItems: 'flex-end',
  },

  text1: {
    fontFamily: font.AkrobatB,
    fontSize: 22,
    color: 'black',
    marginRight: 31,
    alignSelf: 'flex-end',
  },
  text2: {
    fontFamily: font.QuicksandR,
    fontSize: 16,
    color: 'black',
  },
  line: {
    width: '90%',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },

  data: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
  },

  button: {
    width: '90%',
    alignSelf: 'center',
    marginLeft: 25,
    marginTop: 20,
    height: 39,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 9,
  },

  textbutton: {
    fontFamily: font.AkrobatR,
    color: 'white',
    fontSize: 20,
  },

  next: {
    position: 'absolute',
    right: wp(5),
    bottom: hp(8),
    width: wp(33),
    height: hp(5),
    backgroundColor: 'white',
    borderRadius: 30,
    borderColor: '#707070',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  next1: {
    position: 'absolute',
    right: wp(5),
    bottom: hp(3),
    width: '33%',
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

  number: {
    fontFamily: font.AkrobatR,
    fontSize: 24,
    color: 'black',
  },
  textinput: {
    fontFamily: font.AkrobatR,
    fontSize: 22,
    color: 'black',
    padding: 0,
    borderBottomWidth: 1,
    // width: '60%',
  },
  datePicker: {
    // borderBottomWidth: 1,
    width: '30%',
  },
  listText: {
    fontFamily: font.AkrobatSB,
    fontSize: 20,
    color: 'black',
    padding: 0,
    // borderBottomWidth: 1,
  },
  listItem: {
    marginTop: 20,
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    borderColor: 'gray',
  },
  datePickerBtn: {
    position: 'absolute',
    ...StyleSheet.absoluteFill,
  },
});
export default styles;
