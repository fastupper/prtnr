/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import Contact from 'react-native-contacts';
import {
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
import Backarrow from '../../assets/svg/arrowback';
import ActivityIndicator from '../../components/ActivityIndicator';
import style from './Styles';
import ListItem from './ListItem';
import axios from 'axios';
import localStorage from '../../api/localStorage';
import {Backend_api_endpoint} from '../../utils/config';
import {useToast} from 'react-native-toast-notifications';
import PartnerStorage from '../../Data/PartnerStorage';

const SplashScreen = ({navigation, item, route}) => {
  const windowHeight = useWindowDimensions().height;
  const [right, setright] = useState('');
  const [open, setopen] = useState(false);
  const [isContact, setIsContactList] = useState(false);
  const [contacts, setIsContacts] = useState([]);
  const [selectedContact, setIsSelectedContact] = useState('');
  const [selectedContactNumber, setIsSelectedContactNumber] = useState('');
  const [localUser, setLocalUser] = useState('');
  const Toast = useToast();
  const [invited, setInvited] = useState(false);
  const [btnTxt, setBtnTxt] = useState('Go Solo for Now');
  const [isLoader, setIsLoader] = useState(false);

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
  }, []);

  useEffect(() => {
    if (!invited && selectedContact) {
      setBtnTxt('Send invite and add prtnr');
    } else setBtnTxt('Go Solo for Now');
  }, [invited, selectedContact]);

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
    const givenName = contact.displayName
      ? contact.displayName
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

  const onConfirm = () => {
    setIsLoader(true);
    axios
      .post(`${Backend_api_endpoint}/sendInvitation`, {
        from: localUser.phone,
        to: selectedContactNumber,
      })
      .then(responseData => {
        if (responseData.data.success) {
          setInvited(true);
          setIsLoader(false);
          showToastMsg(`Sent invitation link to ${selectedContact}.`);
        } else {
          showToastMsg('Failed to send invitation.');
        }
        console.log(responseData.data);
      })
      .catch(error => {
        console.log(error);
        showToastMsg('Error:', error);
        if (flag) setIsLoading(false);
      });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ActivityIndicator visible={isLoader} />

      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack('')}
          style={{marginLeft: 15, display: 'flex', flexDirection: 'row'}}>
          <Backarrow />
          <Text style={style.topTxt}>Addig a prtnr</Text>
        </TouchableOpacity>
        <Text style={style.topTxt}>3/3</Text>
        <Text style={style.text1}>prtnr</Text>
      </View>
      <View style={{height: windowHeight - 130}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1, paddingBottom: 50}}>
          <View style={[style.topBody, {height: windowHeight * 0.4}]}>
            {PartnerStorage.secondImageURL ? (
              <Image
                imageStyle={{resizeMode: 'stretch'}}
                source={{uri: PartnerStorage.secondImageURL}}
                style={{height: '100%', width: '100%'}}
              />
            ) : (
              <Text>Second photo of partner</Text>
            )}
          </View>
          <View style={style.inviteBody}>
            <View style={{width: '80%', marginLeft: 31, marginTop: 20}}>
              <Text style={style.text}>Try it.. you might like it</Text>

              <View>
                <Text style={style.text2}>
                  Our app can be used solo so you can do better.. and you know
                  need to do better. So start out by yourself for now and try
                  some new things. You can always add them later.
                </Text>
              </View>
              <Text style={[style.text, {marginTop: 20}]}>
                Invite them to the party?
              </Text>

              <View>
                <Text style={style.text2}>
                  Send your other an invite so they can connect
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                opencontactForm();
              }}
              style={style.button}>
              <Text style={style.textbutton}>Contact List</Text>
            </TouchableOpacity>

            <ContactsList />
          </View>

          {open ? (
            <View style={{width: '80%', marginLeft: 31, marginTop: 16}}>
              <Text style={style.text2}>Selected: </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <Text style={style.contactName}>{selectedContact}</Text>
                <Text style={style.contactNumber}>{selectedContactNumber}</Text>
                <Text
                  style={style.remove}
                  onPress={() => {
                    setopen(false);
                    setIsSelectedContact('');
                    setIsSelectedContactNumber('');
                    setInvited(false);
                  }}>
                  remove
                </Text>
              </View>
            </View>
          ) : (
            <View />
          )}
        </ScrollView>
      </View>
      <View style={style.bottomBody}>
        <TouchableOpacity
          onPress={() => {
            {
              selectedContact && !invited
                ? Alert.alert(
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
                              onConfirm();
                            } catch (error) {
                              console.log(error);
                            }
                          }
                        },
                      },
                    ],
                    {cancelable: false},
                  )
                : navigation.navigate('NewHomeScreen', {right: right});
            }
          }}
          style={style.next}>
          <Text style={style.bottomTxt}>{btnTxt}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default SplashScreen;
