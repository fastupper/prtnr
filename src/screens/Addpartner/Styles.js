import { StyleSheet, Dimensions } from 'react-native';
import font from '../../utils/CustomFont';
const windowheight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  head: {
    fontFamily: font.AkrobatB,
    fontSize: 22,
    color: 'black',
  },
  profile: {
    height: 96,
    width: 96,
    borderRadius: 48,
    borderWidth: 1,
    marginHorizontal: 21,
    borderColor: 'black',
  },
  info: {
    fontFamily: font.QuicksandR,
    color: 'white',
    fontSize: 18,
  },
  button: {
    padding: 5,
    width: '78%',
    backgroundColor: 'black',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  buttontext: {
    fontSize: 14,
    fontFamily: font.QuicksandR,
    color: 'white',
  },

  touchableview1: {
    backgroundColor: 'white',
    width: '95%',
    alignSelf: 'center',
    height: windowheight / 2.5,
  },

  popup: {
    fontFamily: font.QuicksandR,
    fontSize: 18,
    color: 'black',
    marginBottom: 20,
    marginTop: 5,
    marginHorizontal: 20,
  },
  imageview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -10,
  },
  nextBtn: {
    backgroundColor: 'white',
    width: '70%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: '20%',
  },
  btnText: {
    fontFamily: font.AkrobatSB,
    fontSize: 20,
    color: '#000',
  },
});

export default styles;
