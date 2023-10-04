import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import colors from '../../../utils/colors';
import font from '../../../utils/CustomFont';

const gestures = {
  1: [
    'Take a walk together',
    'Cook a meal together',
    'Write a love letter',
    'Have a picnic',
    'Watch a movie together',
    'Listen to music together',
    'Make a scrapbook',
    'Stargaze together',
    'Visit a museum',
    'Go for a bike ride',
    'Read a book together',
    'Have a game night',
    'Take a day trip',
    'Dance together',
    'Plant a tree together',
    'Share a dessert',
    'Watch the sunset',
    'Visit a park',
    'Go for a swim',
    'Cuddle and talk',
  ],
  2: [
    'Book a weekend getaway',
    'Take a dance class',
    'Visit a theme park',
    'Plan a surprise date',
    'Attend a concert',
    'Explore a new city',
    'Go on a hiking trip',
    'Visit a winery',
    'Go to a spa',
    'Take a cooking class',
    'Book a fancy dinner',
    'Go horseback riding',
    'Visit an art gallery',
    'Go for a boat ride',
    'Attend a live show',
    'Go to a zoo or aquarium',
    'Take a pottery class',
    'Go to a beach resort',
    'Visit a historical site',
    'Have a themed movie night',
  ],
  3: [
    'Book a vacation abroad',
    'Renew your wedding vows',
    'Buy a special gift',
    'Plan a surprise party',
    'Attend a luxury retreat',
    'Go on a cruise',
    'Book a helicopter ride',
    'Go on a safari',
    'Attend a major event or festival',
    'Visit a castle',
    'Go on a hot air balloon ride',
    'Go scuba diving',
    'Take a painting class',
    'Book a mountain cabin',
    'Go on a road trip',
    'Stay in a luxury hotel',
    'Visit an exotic island',
    'Go skiing or snowboarding',
    'Go to a Broadway show',
    'Rent a luxury car for a day',
  ],
};

const Sections = ({
  indexText,
  ptText,
  onGesturePress,
  backgroundColor,
  status,
}) => {
  const [currentGesture, setCurrentGesture] = useState(
    getRandomGesture(indexText),
  );

  function getRandomGesture(value) {
    const gesturesList = gestures[value];
    return gesturesList[Math.floor(Math.random() * gesturesList.length)];
  }

  const handlePress = () => {
    onGesturePress(indexText);
    setCurrentGesture(getRandomGesture(indexText));
  };
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <Text style={styles.indexText}>{indexText}</Text>
      <Text style={styles.ptText}>{ptText}</Text>
      <Text
        style={[
          styles.sectionText,
          {
            marginStart: currentGesture.length < 30 ? 0 : '5%',
            textAlign: currentGesture.length < 30 ? 'center' : 'left',
          },
        ]}>
        {currentGesture}
      </Text>
      <TouchableOpacity
        style={styles.refreshIcCon}
        onPress={handlePress}
        disabled={status}>
        <Image
          style={[styles.refreshIc, {opacity: status ? 0.6 : 1}]}
          resizeMode="contain"
          source={require('../../../assets/ic_reload.png')}
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
    fontSize: 18,
    color: colors.black.default,
    fontFamily: font.AkrobatSB,
  },
  ptText: {
    marginTop: '9%',
    fontSize: 16,
    color: colors.black.default,
    opacity: 0.6,
    fontFamily: font.AkrobatSB,
  },
  indexText: {
    textAlign: 'center',
    fontSize: 50,
    color: colors.black.default,
    opacity: 0.5,
    fontFamily: font.AkrobatSB,
  },
  refreshIcCon: {
    marginStart: '4%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshIc: {
    width: 20,
    height: 20,
  },
});

export default Sections;
