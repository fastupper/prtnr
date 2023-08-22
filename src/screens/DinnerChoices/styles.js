import { StyleSheet, Platform } from 'react-native';
import font from '../../utils/CustomFont';
import { wp, hp, isIphone } from '../../utils/size';

const styles = StyleSheet.create({
  upperHalf: {
    // borderWidth: 1,
    width: wp(100),
    height: hp(50),
    resizeMode: 'cover',
    // transform: [{skewY: '20deg'}],
  },
  lowerHalf: {
    // borderWidth: 1,
    width: wp(100),
    height: hp(50),
    resizeMode: 'cover',
    // resizeMode: 'stretch',
  },
  swiperView: {

    height: hp(10),//10
    width: wp(104), //+ 100
    transform: [{ skewY: '-10deg' }], //-10deg
    backgroundColor: '#fff',
    position: 'absolute',
    top: hp(45),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    borderWidth: 1,
    marginLeft: -7, //extra
    marginStart: -8 //extra added


  },
  swipeIcons: {
    height: hp(6),
    width: hp(2),
    resizeMode: 'contain',
    // borderWidth: 1,
  },
  swipeText: {
    fontFamily: font.AkrobatSB,
    fontSize: 24,
    maxWidth: wp(80),
    color: '#707070',
  },
  backBtn: {
    position: 'absolute',
    top: hp(5),
    padding: wp(5),
  },
  backIcon: {
    // tintColor: 'red',
    height: wp(5),
    width: wp(3),
    resizeMode: 'contain',
  },
  selectButton: {
    height: hp(5),
    width: wp(50),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: hp(5),
    alignSelf: 'center',
    borderRadius: 30,
  },
  selectBtn: {
    fontFamily: font.AkrobatSB,
    fontSize: 20,
    color: '#000',

  },

  modalBase: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInnerContainer: {
    width: wp(90),
    padding: wp(5),
    backgroundColor: '#fff',
    shadow: {
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        android: {
          elevation: 5,
        },
      }),
    },
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: hp(3.5),
  },
  iconStyle: {
    marginTop: hp(0.5),
    width: wp(8),
    height: wp(7),
    resizeMode: 'contain',
    // borderWidth: 1,
  },
  vSeparator: {
    borderWidth: 1,
    marginHorizontal: wp(3),
  },
  modalText: {
    fontFamily: font.AkrobatSB,
    fontSize: 18,
    maxWidth: wp(65),
    color: '#707070',
    // borderWidth: 1,
    // flex: 1,
  },
  textInput: {
    fontFamily: font.AkrobatSB,
    fontSize: 18,
    flex: 1,
    borderBottomWidth: 1,
    // borderWidth: 1,
  },
  sendBtn: {
    borderWidth: 1,
    paddingVertical: 7,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    borderRadius: 30,
    backgroundColor: '#000',
    marginTop: hp(2),
    marginBottom: hp(3),
  },
  btnText: {
    fontFamily: font.AkrobatSB,
    fontSize: 18,
    color: '#fff',
  },
  hiddenBtn: {
    position: 'absolute',
    ...StyleSheet.absoluteFill,
  },
});
export default styles;
