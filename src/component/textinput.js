import {StyleSheet, TextInput} from 'react-native';
import React, {Component} from 'react';
import font from '../utils/CustomFont';

const Textinput = props => {
  return (
    <TextInput
      {...props}
      maxLength={props.length}
      style={[styles.input, props.tstyle]}
      onChangeText={text => props.onChangeText(text)}
      value={props.value}
      placeholder={props.placeholder}
      placeholderTextColor={props.color}
      secureTextEntry={props.isPassword}
      multiline={props?.multiline}
      numberOfLines={props?.numberOfLines}
      keyboardType={props.keyboardType}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontFamily: font.QuicksandR,
    fontSize: 14,
    padding: 0,
    color: 'black',
  },
});

export default Textinput;
