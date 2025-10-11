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
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/icons/Logo.svg';


const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export default function FpLoader() {
  const navigator= useNavigation();
  useEffect(() => {
    setTimeout(() => {
        navigator.navigate('newpass')
    }, 3000);
  }, []);
  
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
            </Text>
             */}
             <Logo/>
            </View>
            <Text style={{fontSize:15,color:'white',alignSelf:'center'}}>Authenticating</Text>
            {/* <View style={{backgroundColor:'#6AB9BF',top:10, padding:20, width:"95%",alignSelf:'center', borderRadius:10}}>
              <View style={{backgroundColor:'white',borderRadius:100}}>
                <TextInput placeholder='type your email' style={{paddingLeft:25}}/>
              </View>
            </View> */}
            {/* <View style={{backgroundColor:'#6AB9BF', width:"15%",borderRadius:50,alignItems:'center',alignSelf:'center',top:50}}>
              <Text style={{color:'white'}} onPress={()=>navigator.navigate('confcode')}>Submit</Text>
            </View> */}
            </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
