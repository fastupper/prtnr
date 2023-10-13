import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import styles from './styles';
import firebase from '../../api/firebase';
//Girish Chauhan
import {useToast} from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Setting = () => {
  const navigation = useNavigation();
  const [points, setPoints] = useState(0);
  const [joke, setJoke] = useState('');
  const [userId, setUserId] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const Toast = useToast();

  const showToastMsg = (msg = 'Something went wrong...') => {
    Toast.hideAll();
    Toast.show(msg, {
      type: 'normal',
      placement: 'bottom',
      duration: 2000,
      offset: 30,
      animationType: 'slide-in | zoom-in',
    });
  };
  const enableBiometrics = async () => {
    firebase.enableBio(userId).then(res => {
      if (res) {
        showToastMsg('Biometrics is enabled');
      } else {
        showToastMsg('Failed biometrics enable');
      }
    });
    console.log('enable biometric', userId);
  };

  const savePoints = async () => {
    if (points > 10) {
      setJoke(
        'Whoa, whoa. Slow down buddy. \n You going to make them think you did do it',
      );
      setTimeout(() => setJoke(''), 2000);
    } else {
      const userInfo = {
        userId: userId,
        tasks: points,
      };
      firebase.AddTaskPoints(userInfo).then(res => {
        if (res) {
          setJoke('Points Saved');
          setTimeout(() => setJoke(''), 500);
        } else {
          showToastMsg('Failed to save task points');
        }
      });
    }
  };

  const deleteAccount = async () => {
    firebase.deleteAccount(userId).then(async res => {
      if (res) {
        await AsyncStorage.setItem('REGISTRATION', 'logout');
        showToastMsg('Successfully Removed');
        navigation.navigate('Login');
      } else {
        showToastMsg('Failed to remove account');
      }
    });
  };

  useEffect(() => {
    firebase.getUserId().then(res => {
      if (res) {
        firebase.getRegisteredUser(res.email, async response => {
          if (response.data === 'true') {
            setUserId(res.userRefId);
            setIsEnabled(response.isBiometric);
            setPoints(response.taskPoints);
          }
        });
      }
    });
  }, []);
  return (
    <SafeAreaView style={{alignItems: 'center'}}>
      <Text style={styles.Accountdata}>Biometric</Text>
      <TouchableOpacity
        onPress={() => {
          enableBiometrics();
        }}
        style={[
          isEnabled ? styles.disabledBtn : styles.button,
          {marginBottom: 20, marginTop: 10},
        ]}
        disabled={isEnabled}>
        <Text style={styles.buttontext}>{`Enable Biometrics`}</Text>
      </TouchableOpacity>
      <Text style={styles.Accountdata}>Daily Task Points</Text>

      <View style={styles.line}>
        <TextInput
          name="points"
          value={points}
          autoCorrect={false}
          autoCapitalize="words"
          textAlign="center"
          color="black"
          style={styles.pointTxt}
          onChangeText={point => setPoints(point)}
        />
        <TouchableOpacity
          onPress={() => {
            savePoints();
          }}
          style={[styles.button, {width: '60%'}]}>
          <Text style={styles.buttontext}>{`Save Daily Task Points`}</Text>
        </TouchableOpacity>
      </View>
      {joke && <Text style={styles.jokeTxt}>{joke}</Text>}
      <Text style={styles.Accountdata}>Delete Account</Text>
      <TouchableOpacity
        onPress={() => {
          deleteAccount();
        }}
        style={[styles.button, {width: '100%', marginTop: 10}]}>
        <Text style={styles.buttontext}>{`Remove and Delete account`}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Setting;
