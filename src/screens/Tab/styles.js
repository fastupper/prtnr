import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import font from '../../utils/CustomFont';
import { hp, wp } from '../../utils/size';
const styles = StyleSheet.create({
  text1: {
    alignSelf: 'flex-end',
    color: colors.black.default,
    fontSize: 22,
    fontFamily: font.AkrobatB,
    marginRight: 31,

  },
  tabtext: {
    fontFamily: font.AkrobatR,
    fontSize: 26,
    color: 'black',
  },
  headerView: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(4),
  },
  backBtnBox: {
    // position: 'absolute',
    paddingHorizontal: wp(5),
    // top: hp(5),
    flexDirection: 'row',
    marginBottom: hp(3),
    // borderWidth: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  backIcon: {
    tintColor: '#000',
    width: wp(5),
    height: wp(5),
    resizeMode: 'contain',
  },
  nameText: {
    fontFamily: font.AkrobatSB,
    fontSize: 16,
    color: '#000',
    marginLeft: 5,
  },
});
export default styles;
