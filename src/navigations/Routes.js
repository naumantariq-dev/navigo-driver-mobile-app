import React, {useContext, useEffect, useState} from 'react';
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
import {AuthContext} from '../contextApi/AuthProvider';
import AuthStack from './AuthStack';
import Appstack from './AppStack';

const Stack = createNativeStackNavigator();
//bridge
export default function Routes() {
  let {user, setUser, online, isOnline} = useContext(AuthContext);

    return user ? <Appstack /> : <AuthStack />;
    }

// export default MainNavigator();
