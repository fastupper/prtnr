/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import Contact from 'react-native-contacts';
import SendSMS from 'react-native-sms';
import {nanoid} from 'nanoid';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  View,
  PermissionsAndroid,
  FlatList,
  Alert,
} from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import style from './Styles';
import Arrowwhite from '../../assets/svg/arrowwhite';
import ListItem from './ListItem';
import axios from 'axios';
import localStorage from '../../api/localStorage';
import firebase from '../../api/firebase';

const SplashScreen = ({navigation, item, route}) => {
  const {prtnrId} = route.params;
  const windowHeight = useWindowDimensions().height;
  const windowWidth = useWindowDimensions().width;
  const [right, setright] = useState('');
  const [open, setopen] = useState(false);
  const [isContact, setIsContactList] = useState(false);
  const [contacts, setIsContacts] = useState([]);
  const [selectedContact, setIsSelectedContact] = useState('');
  const [selectedContactNumber, setIsSelectedContactNumber] = useState('');
  const [localUser, setLocalUser] = useState('');

  const Hand = async () => {
    try {
      const result = await AsyncStorage.getItem('Hand');
      setright(result);
    } catch (error) {}
  };

  const fetchUserdataFromlocal = async () => {
    localStorage.getUserFromlocal(userResult => {
      if (userResult !== 'error') {
        setLocalUser(userResult);
      }
    });
  };

  useEffect(() => {
    Hand();
    fetchUserdataFromlocal();
    /* firebase.getInvitePartner(prtnrId, response => {
      setLocalUser(response);
      console.log('==getPartnersData222==', response);
    }); */
  }, []);

  const contactListClose = () => {
    setIsContactList(!isContact);
  };

  const opencontactForm = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(res => {
      if (res == 'granted') {
        Contact.getAll()
          .then(contacts => {
            const sortArray = [...contacts].sort(
              (a, b) => a.givenName - b.givenName,
            );
            setIsContacts(sortArray);
            setIsContactList(!isContact);
          })
          .catch(e => {
            console.log('error', e);
          });
      }
    });
  };

  const openContact = contact => {
    const givenName = contact.givenName
      ? contact.givenName
      : contact.familyName;
    if (givenName != '') {
      setIsSelectedContact(givenName);
      console.log('===Contact===', contact);
      setIsSelectedContactNumber(contact.phoneNumbers[0].number);
    }
    setIsContactList(!isContact);
    setopen(true);
  };

  const ContactsList = () => {
    return (
      <Modal animationType="none" transparent={true} visible={isContact}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              margin: 20,
              padding: 10,
              borderRadius: 20,
            }}>
            <TouchableOpacity
              onPress={() => contactListClose()}
              style={[style.close, {position: 'relative'}]}>
              <Image
                imageStyle={{resizeMode: 'cover'}}
                style={{height: 10, width: 10}}
                source={require('../../assets/close3.png')}
              />
            </TouchableOpacity>
            <Text
              style={{
                padding: 25,
                fontSize: 16,
                textAlign: 'center',
                color: '#000',
              }}>
              Send your other an invite so they can connect and work on this
              relationship thing together.
            </Text>
            <FlatList
              style={{}}
              data={contacts}
              renderItem={contact => {
                return (
                  <ListItem
                    key={contact.item.recordID}
                    item={contact.item}
                    onPress={openContact}
                  />
                );
              }}
              keyExtractor={item => item.recordID}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const createDynamicLink = async invitationCode => {
    const link = await dynamicLinks().buildLink({
      link: `https://prtnr.page.link/${localUser.userRefId}`,
      domainUriPrefix: 'https://prtnr.page.link',
      android: {
        packageName: 'com.prtnr.app',
      },
      ios: {
        bundleId: 'com.prtnr.bundle',
      },
      social: {
        title: 'Join My App!',
        descriptionText: 'Use this link to join my app.',
      },
      navigation: {
        forcedRedirectEnabled: true,
      },
      parameters: {
        // Add custom parameters here
        invitationCode: invitationCode,
      },
    });

    console.log('Dynamic link created:', link);
    return link;
  };

  // const buildLink = async () => {
  //   const data = JSON.stringify({
  //     dynamicLinkInfo: {
  //       domainUriPrefix: 'https://prtnr.page.link',
  //       link: `https://prtnr.page.link/${localUser.userRefId}`,
  //       androidInfo: {
  //         androidPackageName: 'com.prtnr.app',
  //       },
  //     },
  //   });
  //   var config = {
  //     method: 'post',
  //     url: 'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyAFJLSFjkMgLHjSiltBoBGuXG0Z8-dvuYI',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     data: data,
  //   };
  //   console.log('build link');
  //   let link = await axios(config)
  //     .then()
  //     .catch(err => console.log(err));

  //   console.log(link);
  //   if (link.status === 200) {
  //     return link.data.shortLink;
  //   }
  // };

  const onConfirm = link => {
    /* let data = new FormData();
    data.append(
      'Body',
      `Hey! Your partner sends you an invitation link: ${link}`,
    );
    data.append('From', '+18334150810');
    data.append('To', `+91${selectedContactNumber}`);
    let config = {
      method: 'post',
      url: `https://api.twilio.com/2010-04-01/Accounts/AC98e75a5f4db5087b221b9e8d70168209/Messages.json`,
      headers: {
        Authorization:
          'Basic QUM5OGU3NWE1ZjRkYjUwODdiMjIxYjllOGQ3MDE2ODIwOTozNDZhNjZiMGMyZjRjZDZjYWRkZGI3NmMxZDY1NjU2Ng==',
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        if (response.data.error_code === null) {
          navigation.navigate('NewHomeScreen', {right: right});
        }
      })
      .catch(function (error) {
        console.log(error);
      }); */
    /* twilioClient.messages
      .create({
        body: `Hey! Your partner sends you an invitation link: ${link}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: selectedContactNumber,
      })
      .then(message => console.log(`Message sent with ID: ${message.sid}`))
      .catch(error =>
        console.error(`Failed to send message: ${error.message}`),
      ); */
    console.log(selectedContactNumber);
    SendSMS.send(
      {
        body: `Hey! Your partner sends you an invitation link:`,
        recipients: [selectedContactNumber],
        successTypes: ['sent', 'queued'],
        allowAndroidSendWithoutReadPermission: true,
      },
      (completed, cancelled, error) => {
        console.log(
          'SMS Callback: completed: ' +
            completed +
            ' cancelled: ' +
            cancelled +
            'error: ' +
            error,
        );
      },
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        imageStyle={{resizeMode: 'stretch'}}
        // style={{flex: 1, height: '100%', width: '100%'}}
        style={{flex: 1, height: windowHeight, width: windowWidth}}
        source={require('../../assets/otherimage.png')}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => navigation.goBack('')}
                style={{marginLeft: 15}}>
                <Arrowwhite />
              </TouchableOpacity>
              <Text style={style.text1}>prtnr</Text>
            </View>
            <View style={{width: '100%', marginTop: windowHeight / 11}}>
              <View style={{width: '80%', marginLeft: 31, marginTop: 20}}>
                <Text style={style.text}>5.</Text>
                <Text style={style.text}>Invite them</Text>
                <Text style={style.text2}>What’s more fun than one…guess?</Text>

                <View style={{marginTop: 15}}>
                  <Text style={style.text2}>
                    Send your other an invite so they can connect and work on
                    this relationship thing together.
                  </Text>
                  <Text style={[style.text2, {marginTop: 20}]}>
                    Our app can be used solo so you can do better.. and you know
                    you need to do better. It’s also pretty great work on this
                    with your partner. It’s up to you.
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  //setopen(true);
                  opencontactForm();
                }}
                style={style.button}>
                <Text style={style.textbutton}>Contact List</Text>
              </TouchableOpacity>

              {open ? (
                <View style={{width: '80%', marginLeft: 31, marginTop: 16}}>
                  <Text style={style.text2}>You selected: </Text>
                  <Text style={[style.text2, {marginTop: 10}]}>
                    {selectedContact}
                  </Text>
                </View>
              ) : (
                // <TouchableOpacity
                //   style={{ marginLeft: 31, marginTop: 16 }}
                //   onPress={() => {
                //     navigation.navigate('Profile', { right: right });
                //   }}>
                //   <Text style={style.text2}>Skip for now</Text>
                // </TouchableOpacity>
                <View />
              )}
              {open ? (
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate('Comingtoapp', { contactName: selectedContact });
                    Alert.alert(
                      'prtnr',
                      'Do you want to send invitation link to  ' +
                        `${selectedContact}`,
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {
                          text: 'Confirm',
                          onPress: async () => {
                            if (localUser) {
                              try {
                                const invitationCode = nanoid();
                                const shareUrl = await createDynamicLink(
                                  invitationCode,
                                );
                                onConfirm(shareUrl);
                                console.log("shareUrl===>", shareUrl);
                              } catch (error) {
                                console.log(error);
                              }
                            }
                            //navigation.navigate('NewHomeScreen', { right: right })
                          },
                        },
                      ],
                      {cancelable: false},
                    );
                  }}
                  style={[style.button, {marginBottom: 30}]}>
                  <Text style={style.textbutton}>Confirm and Send Invite</Text>
                </TouchableOpacity>
              ) : null}
              <ContactsList />
            </View>
          </KeyboardAvoidingView>

          <View
            style={{
              height: '30%',
              marginTop: open ? 60 : windowHeight / 5,
              marginBottom: windowHeight / 20,
            }}>
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {open ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Profile', { right: right });
                  }}>
                  <Text
                    style={[
                      style.textbutton,
                      { marginLeft: 20, alignSelf: 'flex-end' },
                    ]}>
                    Skip for now
                  </Text>
                </TouchableOpacity>
              ) : (
                <View></View>
              )}
            </View> */}
          </View>
        </ScrollView>
      </ImageBackground>
      <TouchableOpacity
        onPress={() => {
          //navigation.push('NewHomeScreen', { right: right });
          navigation.navigate('NewHomeScreen', {right: right});
          // navigation.navigate('Profile', {right: right});
        }}
        style={[style.next]}>
        <Text
          style={[
            style.text,
            {textAlign: 'center', fontSize: 22, color: '#707070'},
          ]}>
          Finish adding prtnr
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default SplashScreen;

//const givenName = `${contact.givenName} ${contact.familyName}`
