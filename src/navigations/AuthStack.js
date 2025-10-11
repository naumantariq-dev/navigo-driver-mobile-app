import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import CreatePassword from '../screens/subScreens/CreatePassword';
import DocUploadScreen from '../screens/subScreens/DocUploadScreen';
import SuccessScreen from '../utilis/SuccessScreen';
import ForgotPassword from '../utilis/forgotPassword/ForgotPassword';
import ConfirmationCodeScreen from '../utilis/forgotPassword/ConfirmationCodeScreen';
import FpLoader from '../utilis/forgotPassword/FpLoader';
import NewPasswordScreen from '../utilis/forgotPassword/NewPasswordScreen';
import FpSuccessScreen from '../utilis/forgotPassword/FpSuccessScreen';

import HomeScreen from '../screens/HomeScreen';
import RideScreen from '../screens/RideScreen.js';
import EarningScreen from '../screens/EarningScreen.js';
import PaymentMethod from '../screens/PaymentMethod';
import NotificationsScreen from '../screens/NotificationsScreen';
import SupportScreen from '../screens/SupportScreen';
import TermsAndConditions from '../screens/TermsAndConditions';
import FaqScreen from '../screens/Faqs';
import ProfileSettingsScreen from '../screens/ProfileSettings';

const Stack = createNativeStackNavigator();
//bridge
export default function AuthStack() {
  return (
    
      <Stack.Navigator>
        <Stack.Screen
          name="splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="signup"
          component={SignupScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="createpass"
          component={CreatePassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="doc"
          component={DocUploadScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ss"
          component={SuccessScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="fp"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="confcode"
          component={ConfirmationCodeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="fploader"
          component={FpLoader}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="newpass"
          component={NewPasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="fpsuccess"
          component={FpSuccessScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="tnc"
          component={TermsAndConditions}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
  );
}

// export default MainNavigator();
