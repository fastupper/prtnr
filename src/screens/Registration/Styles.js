import { StyleSheet } from 'react-native';
import font from '../../utils/CustomFont';
const styles = StyleSheet.create({
  welcome: {
    width: 380,
    height: 40,
    fontSize: 22,
    marginLeft: 20,
    fontFamily: font.OpenSansM,
    marginTop: 1,
    color: '#000000',
  },

  Account: {
    fontFamily: font.QuicksandM,
    color: '#000000',
    fontSize: 20,
  },

  Accountdata: {
    fontFamily: font.QuicksandR,
    color: '#000000',
    fontSize: 18,
  },

  very: {
    fontFamily: font.QuicksandR,
    fontSize: 14,
    color: 'white',
  },

  line: {
    width: '100%',
    marginTop: 25,
    borderBottomWidth: 1,
  },

  date: {
    width: '30%',
    alignItems: 'flex-end',
  },

  Biometric: {
    marginHorizontal: 20,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'space-between',
  },

  setup: {
    marginTop: 2,
    marginHorizontal: 20,
    width: 338,
  },

  Bdate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },

  buttontext: {
    color: 'white',
    fontSize: 23,
    fontFamily: font.AkrobatR,
  },

  button: {
    width: '90%',
    height: 45,
    borderRadius: 40,
    backgroundColor: 'black',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  Verify: {
    height: 32,
    width: '100%',
    borderRadius: 40,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 35,
  },
  profile: {
    // backgroundColor: '#E8E8E8',
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: 'center',
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  profileImage: {
    height: 98,
    width: 98,
    resizeMode: 'cover',
  },
  imageContainer: {
    height: 98,
    width: 98,
    // borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderRadius: 49,
    marginTop: 10,
    backgroundColor: '#E8E8E8',
    overflow: 'hidden',
    marginRight: 24,
    backgroundColor: '#DDEEF8'
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

  button2: {
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

  stepBtn: {
    color: '#252323',
    fontSize: 19,
    fontFamily: font.OpenSansB
  },

  stepBtnDisable: {
    opacity: 0.25,
  },

  formCard: {
    borderColor: '#000000',
    borderWidth: 0.5,
    margin: 25,
    elevation: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },

  underlineStyleHighLighted: {
    width: 51,
    height: 72,
    borderWidth: 3,
    borderColor: "#000000",
    color: '#000000',
    fontSize: 27,
    // borderRadius: 10,
  },

  underlineStyleBase: {
    width: 51,
    height: 72,
    borderWidth: 2,
    borderColor: "#000000",
    color: '#000000',
    fontSize: 27,
    // borderRadius: 10,
  },
  
  dropdown1BtnStyle: {
    flex: 1,
    height: 28,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },

  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },

  infoStepBack: {
    backgroundColor: '#BAC7D5',
    width: '100%',
    height: 258,
    zIndex: -1,
    position: 'absolute',
    bottom: 0
  },
  
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left', fontSize: 16, fontFamily: font.QuicksandM, paddingBottom: 3, marginLeft: 2},

  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},

  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},

  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left', fontSize: 16, fontFamily: font.QuicksandM, padding:0, margin: 0},

});
export default styles;
