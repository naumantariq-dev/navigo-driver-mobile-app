import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Button,
  // View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import AppColours from '../../appStyles/AppColours';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, StackActions} from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';
import Logo from '../assets/icons/Logo.svg';
import {AuthContext} from '../contextApi/AuthProvider';
import { getCities } from '../providers-callable/http';





const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export default function SplashScreen() {
  let {user,setUser, online, isOnline, logout, token, userId,error,cities,setCities} =
    useContext(AuthContext);
  const navigator = useNavigation();
  const[dismount,setDismount]=useState(false)
  useEffect(() => {
    //   setTimeout(() => {
    //       navigator.navigate('login')
    //   }, 3000);
    // }, []);

    const currentTimestamp = Date.parse(new Date())
    console.log('asdasdasd=>>',currentTimestamp); 

    setTimeout(async () => {
      // if (error!== 'That email address is already in use!' || error !=='That email address is invalid!') {
        const data = await getCities();
        setCities(data.data)
        // console.log(cities);
        try {
          // // const unSub = Auth().onAuthStateChanged(async user => {
          //   const router = user ? 'home' : 'login';
          //   // unSub();
          //   navigator.dispatch(StackActions.replace(router));

          if (user && user.isProved) {
            navigator.dispatch(StackActions.replace('home'));
          } else if (user && !user.isProved) {
            navigator.dispatch(StackActions.replace('vs'));
          } else {
            const response = await logout();
            if (response) {
              console.log('logging out');
            }
            navigator.dispatch(StackActions.replace('login'));
          }





          //   // if (user && token) {
          //   //   unSub();
          //   //   // navigator,dispatch(StackActions.replace('home'))
          //   //   console.log('here=> home');
          //   // }else{
          //   //   unSub();
          //   //   // navigator,dispatch(StackActions.replace('home'))
          //   //   console.log('here=> login');
          //   // }
          //  // console.log('going from splash too', router);
          // });
        } catch (error) {
          console.log('error at splash=>', error);
          navigator.dispatch(StackActions.replace('login'));
        }
      //// }
    }, 3000
  // }, 3000000
    
    );
  }, []);

  return (
    <View>
      <SafeAreaView>
        <StatusBar backgroundColor={AppColours.AppBackGroundDefalut} />
        <View
          style={{
            backgroundColor: AppColours.color_0_white_base,
            height: height,
          }}>
          <View style={{top: height / 2.5}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Logo />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
