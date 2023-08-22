import { BackHandler } from "react-native";
import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";

const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true });

const CallCheckBiomatrics = async (callback) => {

    rnBiometrics.isSensorAvailable()
        .then((resultObject) => {
            const { available, biometryType } = resultObject

            if (available && biometryType === BiometryTypes.TouchID) {
                console.log('TouchID is supported')
            } else if (available && biometryType === BiometryTypes.FaceID) {
                console.log('FaceID is supported')
            } else if (available && biometryType === BiometryTypes.Biometrics) {

                callback(resultObject);

            } else {
                //console.log('Biometrics not supported');
                callback('notSupport');
            }

        })

}
const CallAuthBiomatrics = async (callback) => {

    try {
        const { success } = await rnBiometrics.simplePrompt({ promptMessage: 'Authentication required...' });
        if (success) {
            callback(true);
        }
        else {
            callback(false);
        }
    } catch (error) {
        callback(error);
    }
}
const CreateBioAuthKey = async () => {


}
export default {
    CallCheckBiomatrics,
    CallAuthBiomatrics,
    CreateBioAuthKey,
}