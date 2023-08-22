import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../../../utils/colors';
import font from '../../../utils/CustomFont';

const Sections = ({ indexText, ptText, sectionText, onPress }) => {
  const sd =
    'Figure out dinner before they ask about it and tell them it’s taken care of as they are on their way home.';
  const dd = 'Ask them how their day was?';
  return (
    <View style={styles.container}>
      <Text style={styles.indexText}>{indexText}</Text>
      <Text style={styles.ptText}>{ptText}</Text>
      <Text
        style={[
          styles.sectionText,
          {
            marginStart: sectionText.length < 30 ? 0 : '5%',
            textAlign: sectionText.length < 30 ? 'center' : 'left',
          },
        ]}>
        {sectionText}
      </Text>
      <TouchableOpacity style={styles.refreshIcCon} onPress={onPress}>
        <Image
          style={styles.refreshIc}
          resizeMode="contain"
          source={require('../../../assets/ic_refresh.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.blue.default,
    backgroundColor: colors.blue.lightBlue,
    flexDirection: 'row',
    paddingHorizontal: '4%',
    paddingVertical: '4%',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: '2%',
  },
  sectionText: {
    flex: 1,
    // borderWidth: 1,
    // marginStart: '2%',
    fontSize: 18,
    color: colors.black.default,
    fontFamily: font.AkrobatSB,
  },
  ptText: {
    // flex: 1,
    // borderWidth: 1,
    marginTop: '9%',
    fontSize: 16,
    color: colors.black.default,
    opacity: 0.6,
    fontFamily: font.AkrobatSB,
  },
  indexText: {
    // borderWidth: 1,
    textAlign: 'center',
    fontSize: 50,
    color: colors.black.default,
    opacity: 0.5,
    fontFamily: font.AkrobatSB,
  },
  refreshIcCon: {
    marginStart: '4%',
    // padding: '2%',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshIc: {
    width: 17,
    height: 17,
  },
});

export default Sections;
