import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const configuration = async () => {
  GoogleSignin.configure({
    webClientId:
      '243216815010-2ljcmh1qv82e69c0e756jf730290req4.apps.googleusercontent.com',
    forceCodeForRefreshToken: true,
    //offlineAccess:true,
  });
};
const _signIn = async () => {};
const _signOut = async callback => {
  //setGettingLoginStatus(true);
  // Remove user session from the device.
  const userInfo = await GoogleSignin.signInSilently();
  if (userInfo != null) {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut().then(() => {
        callback(true);
      });
      // Removing user Info

      //   setUserInfo(null);
    } catch (error) {
      callback(false);
    }
  } else {
    callback(false);
  }

  //setGettingLoginStatus(false);
};
export default {
  configuration,
  _signOut,
};
