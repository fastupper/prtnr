/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Modal, View, Text, Image, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {wp} from '../utils/size';
import colors from '../utils/colors';
import font from '../utils/CustomFont';

const UserProfileModal = ({user, visible, onClose, onAccept, onDecline}) => {
  const {email, profileImg, firstname, lastname, phone, dateOfbirth} = user;
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="none"
      transparent={true}>
      <View style={styles.container}>
        <View style={styles.modelView}>
          <View style={styles.contentView}>
            <Image source={{uri: profileImg}} style={styles.image} />
            <Text
              style={[
                styles.text,
                {
                  paddingTop: wp(5),
                },
              ]}>
              <Text style={{fontWeight: 'bold'}}>Name:</Text>{' '}
              {firstname + ' ' + lastname}
            </Text>
            <Text
              style={[
                styles.text,
                {
                  paddingTop: wp(2),
                },
              ]}>
              <Text style={{fontWeight: 'bold'}}>Phone:</Text> {phone}
            </Text>
            <Text
              style={[
                styles.text,
                {
                  paddingTop: wp(2),
                },
              ]}>
              <Text style={{fontWeight: 'bold'}}>DOB:</Text> {dateOfbirth}
            </Text>
            <Text
              style={[
                styles.text,
                {
                  paddingTop: wp(2),
                },
              ]}>
              <Text style={{fontWeight: 'bold'}}>Email:</Text> {email}
            </Text>
          </View>
          <View style={{flexDirection: 'row', height: 55, margin: 10}}>
            <Button
              mode="contained"
              onPress={onDecline}
              style={styles.button}
              labelStyle={styles.buttonLabel}>
              Decline
            </Button>
            <Button
              mode="contained"
              onPress={onAccept}
              style={[
                styles.button,
                {
                  marginLeft: 10,
                },
              ]}
              labelStyle={styles.buttonLabel}>
              Accept
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modelView: {
    alignItems: 'center',
    height: '45%',
    width: '95%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'space-between',
  },
  contentView: {
    //alignItems: 'center',
    paddingTop: wp(10),
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  text: {
    color: colors.white.default,
    fontSize: wp(4),
    fontFamily: font.QuicksandM,
    //textAlign:'justify'
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.blue.default,
  },
  buttonLabel: {
    fontFamily: font.QuicksandB,
    color: colors.black.default,
    fontWeight: 'bold',
    fontSize: wp(3.8),
  },
});

export default UserProfileModal;
