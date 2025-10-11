import React, {useEffect, useRef} from 'react';
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

import AppColours from '../../../appStyles/AppColours';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/icons/Logo.svg';

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export default function FpSuccessScreen() {
  const navigator= useNavigation();
//   useEffect(() => {
//     setTimeout(() => {
//         navigator.navigate('newpass')
//     }, 30);
//   }, []);
  
  return (
    <View>
      <SafeAreaView>
        <StatusBar backgroundColor={AppColours.AppBackGroundDefalut} />
        <View style={{backgroundColor:AppColours.AppBackGroundDefalut,height:height}}>
          <View style={{top:height/3}}>
          <View style={{justifyContent:'center',alignItems:'center'}}>
        {/* <Text
              style={{
                color: '#6AB9BF',
                fontSize: 40,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              N A V I G O
            </Text> */}
            <Logo/>
            </View>
            <Text style={{fontSize:15,color:'white',alignSelf:'center', textAlign:'center',width:'50%'}}>Password has been successfully changed</Text>
              <MaterialCommunityIcons name='checkbox-marked-circle-outline' size={50} color={AppColours.color_0_white_base} style={{alignSelf:'center',padding:20}}/>
              <View
              style={{
                backgroundColor: '#6AB9BF',
                width: '15%',
                padding: 2,
                borderRadius: 50,
                alignItems: 'center',
                alignSelf: 'center',
                // top: 50,
              }}>
              <Text
                style={{color: 'white',textAlign:'center'}}
                onPress={() => navigator.navigate('login')}>
Login
              </Text>
            </View>
            </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
