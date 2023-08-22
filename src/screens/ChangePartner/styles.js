import { StyleSheet } from 'react-native';
import font from '../../utils/CustomFont';
import { wp, hp, isIphone } from '../../utils/size';

const styles = StyleSheet.create({
  image: {
    height: hp(100),
    width: wp(100),
    resizeMode: 'cover',
  },
  backBtn: {
    position: 'absolute',
    top: isIphone ? hp(5) : hp(3),
    // backgroundColor: 'red',
    padding: wp(3),
  },
  ic_back: {
    height: wp(6),
    width: wp(6),
    resizeMode: 'contain',

  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    // right: 0,
    // left: 0,
    // height: hp(40),
    alignSelf: 'center',
  },
  upIcon: {
    height: wp(12),
    width: wp(12),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  nameText: {
    fontSize: 45,
    fontFamily: font.AkrobatR,
    color: '#fff',
    alignSelf: 'center',
    marginVertical: hp(1),
  },
  noPartnerText: {
    fontSize: 18,
    fontFamily: font.AkrobatR,
    alignSelf: 'center',
    color: '#000',
  },
  chooseBtn: {
    backgroundColor: '#fff',
    width: wp(50),
    height: hp(4),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginVertical: hp(5),
  },
  plusIcon: {
    height: hp(4),
    width: hp(4),
    tintColor: '#fff',

  },
  plusBtn: {
    height: hp(4),
    width: hp(4),
    borderWidth: 2,
    // padding: 5,
    borderRadius: 50,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginStart: wp(5),
    marginVertical: hp(5),
  },
  btnText: {
    fontFamily: font.AkrobatSB,
    fontSize: 20,
    color: '#000',
  },
});
export default styles;
