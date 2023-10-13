import {StyleSheet} from 'react-native';
import font from '../../utils/CustomFont';
import {wp, hp} from '../../utils/size';

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
  topTxt: {
    fontFamily: font.AkrobatSB,
    fontSize: 18,
    color: 'black',
    marginLeft: 10,
  },
  topBody: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#707070',
    backgroundColor: '#ffffff',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  favorBody: {
    borderWidth: 1,
    borderRadius: 24,
    borderColor: '#707070',
    backgroundColor: '#ffffff',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    alignItems: 'center',
    display: 'flex',
  },
  ansInput: {
    fontFamily: font.QuicksandM,
    fontSize: 14,
    color: '#0A284A',
    borderBottomWidth: 1,
    marginTop: 15,
  },
  addBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 40,
    backgroundColor: '#D0EAEF',
    height: 40,
    zIndex: 1,
  },
  dropdownContainer: {
    padding: 0,
  },
  event: {
    // borderColor: '#0A284A',
  },
  eventDropDown: {
    borderColor: '#0A284A',
    paddingTop: 0,
    paddingBottom: 0,
  },
  eventTitle: {
    marginTop: 10,
    color: 'black',
    fontSize: 20,
    fontFamily: font.AkrobatR,
  },
  btnText: {
    fontFamily: font.QuicksandM,
    fontSize: 16,
    color: 'black',
  },
  listText: {
    fontFamily: font.QuicksandM,
    fontSize: 12,
    color: 'black',
    padding: 0,
  },
  removeText: {
    fontFamily: font.QuicksandR,
    fontSize: 10,
    color: 'black',
    padding: 0,
  },
  listItem: {
    borderColor: 'gray',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  datePicker: {
    // borderBottomWidth: 1,
    width: '30%',
  },
  datePickerBtn: {
    position: 'absolute',
    ...StyleSheet.absoluteFill,
  },
  buttontext: {
    color: '#fff',
    fontSize: 23,
    fontFamily: font.AkrobatR,
    paddingTop: 6,
  },
  button: {
    width: '90%',
    height: 43,
    borderRadius: 40,
    backgroundColor: '#000',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
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

  imgButton: {
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
  tapImgTxt: {
    fontFamily: font.QuicksandM,
    fontSize: 14,
    color: '#fff',
  },
});
export default styles;
