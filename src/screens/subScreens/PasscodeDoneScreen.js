import React, {useContext, useEffect, useRef, useState} from 'react';
import PincodeInput from "react-native-pincode-input";
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
  ScrollView,
  Modal,
  Switch
} from 'react-native';

import AppColours from '../../../appStyles/AppColours';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import HorizontalDivider from '../../sharedComponents/HorizontalDivider';
import { AuthContext, AuthProvider } from '../../contextApi/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export default function PasscodeDoneScreen() {

  const navigator = useNavigation();

  useEffect(()=>
  {
    retrieveData()

  })
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('passcode'); // Replace 'key' with the actual key
      if (value !== null) {
        // Data found
        console.log('Retrieved data:', value);
      } else {
        // Data not found
        console.log('No data found');
      }
    } catch (error) {
      // Error retrieving data
      console.error('Error retrieving data:', error);
    }
  };
  const renderHeaders = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: AppColours.AppLogoColor,
          height: '15%',
          justifyContent: 'space-evenly',
        }}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 35,
            textAlign: 'center',
            color: 'black',
            fontWeight: 'bold',
          }}>
          Security
        </Text>
        <Ionicons
          name="arrow-back"
          size={25}
          color={'black'}
          style={{
            alignSelf: 'center',
            backgroundColor: 'white',
            borderRadius: 100,
          }}
          onPress={() => {
          
        navigator.navigate('home');
          }}
        />
      </View>
    );
  };

    const Info=()=>{

        
      
    return(
  <View>
   
   <Text style={{color:'black',alignSelf:'center',marginVertical:50}}>Successfully Done   </Text>
   
    </View>)
  }

  return (
    <View>
      <SafeAreaView>
        <StatusBar backgroundColor={'#FFFFFF'} />
        <View style={{backgroundColor: '#FFFFFF', height: height}}>
          {renderHeaders()}
          {Info()}
         
        </View>
      </SafeAreaView>
    </View>
  );
}
