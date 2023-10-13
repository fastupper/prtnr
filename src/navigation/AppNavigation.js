import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Registration from '../screens/Registration/Registration';
import Login from '../screens/Login/Login';
import Addpartner from '../screens/Addpartner/Addpartner';
import Otherprofile1 from '../screens/Otherprofile1/Otherprofile1';
import Otherdetails from '../screens/Otherdetails/Otherdetails';
import Otherfavorite from '../screens/Otherfavorite/Otherfavorite';
import Dates from '../screens/Dates/Dates';
import Invite from '../screens/Invite/Invite';
import Profile from '../screens/Profile/Profile';
import Tabs from '../screens/Tab/Tabs';
import Photos from '../screens/Photos/Photos';
import Otp from '../screens/Otp/Otp';
import Comingtoapp from '../screens/Comingtoapp/Comingtoapp';
import Otherdetailschek from '../screens/Otherdetailschek/Otherdetailschek';
import NewHomeScreen from '../screens/NewHomeScreen/NewHomeScreen';
import ChangePartner from '../screens/ChangePartner';
import DinnerChoices from '../screens/DinnerChoices';
import Placeholder from '../screens/Placeholder/Placeholder';
import Setting from '../screens/Setting/Setting';

const Stack = createNativeStackNavigator();
const MyComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="NewHomeScreen"
        screenOptions={{animationEnabled: false, headerShown: false}}>
        <Stack.Screen
          screenOptions={{animationEnabled: false, headerShown: false}}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          screenOptions={{animationEnabled: false, headerShown: false}}
          name="Setting"
          component={Setting}
        />
        <Stack.Screen
          screenOptions={{animationEnabled: false, headerShown: false}}
          name="Registration"
          component={Registration}
        />
        <Stack.Screen
          screenOptions={{animationEnabled: false, headerShown: false}}
          name="Addpartner"
          component={Addpartner}
        />
        <Stack.Screen
          screenOptions={{animationEnabled: false, headerShown: false}}
          name="Otherprofile1"
          component={Otherprofile1}
        />
        <Stack.Screen
          screenOptions={{animationEnabled: false, headerShown: false}}
          name="Otherdetails"
          component={Otherdetails}
        />
        <Stack.Screen
          screenOptions={{animationEnabled: false, headerShown: false}}
          name="Otherfavorite"
          component={Otherfavorite}
        />
        <Stack.Screen
          screenOptions={{animationEnabled: false, headerShown: false}}
          name="Dates"
          component={Dates}
        />
        <Stack.Screen
          screenOptions={{animationEnabled: false, headerShown: false}}
          name="Invite"
          component={Invite}
        />
        <Stack.Screen
          screenOptions={{animationEnabled: false, headerShown: false}}
          name="Profile"
          component={Profile}
        />
        <Stack.Screen
          screenOptions={{animationEnabled: false, headerShown: false}}
          name="ChangePartner"
          component={ChangePartner}
        />
        <Stack.Screen
          screenOptions={{animationEnabled: false, headerShown: false}}
          name="DinnerChoices"
          component={DinnerChoices}
        />
        <Stack.Screen
          screenOptions={{animationEnabled: false, headerShown: false}}
          name="Tabs"
          component={Tabs}
        />
        <Stack.Screen
          screenOptions={{animationEnabled: false, headerShown: false}}
          name="Photos"
          component={Photos}
        />
        <Stack.Screen
          screenOptions={{animationEnabled: false, headerShown: false}}
          name="Otp"
          component={Otp}
        />
        <Stack.Screen
          screenOptions={{animationEnabled: false, headerShown: false}}
          name="Comingtoapp"
          component={Comingtoapp}
        />
        <Stack.Screen
          screenOptions={{animationEnabled: false, headerShown: false}}
          name="Otherdetailschek"
          component={Otherdetailschek}
        />
        <Stack.Screen
          screenOptions={{animationEnabled: false, headerShown: false}}
          name="NewHomeScreen"
          component={NewHomeScreen}
        />
        <Stack.Screen
          screenOptions={{animationEnabled: false, headerShown: false}}
          name="Placeholder"
          component={Placeholder}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyComponent;
