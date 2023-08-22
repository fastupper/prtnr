import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';
const Stack = createNativeStackNavigator();

const AuthNavigation = props => {
  return (
    <Stack.Navigator
      screenOptions={{animationEnabled: false, headerShown: false}}>
      <Stack.Screen
        screenOptions={{animationEnabled: false, headerShown: false}}
        name="Login"
        component={Login}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
