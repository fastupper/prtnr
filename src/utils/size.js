import {Dimensions, Platform} from 'react-native';

const hp = num => (num / 100) * Dimensions.get('window').height;
const wp = num => (num / 100) * Dimensions.get('window').width;

const isIphone = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

export {hp, wp, isIphone, isAndroid};
