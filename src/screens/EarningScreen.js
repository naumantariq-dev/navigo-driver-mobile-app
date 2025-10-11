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
  ScrollView,
} from 'react-native';

import AppColours from '../../appStyles/AppColours';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation,useRoute} from '@react-navigation/native';
import HorizontalDivider from '../sharedComponents/HorizontalDivider';
import Pound from '../assets/icons/Pound.svg';

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export default function EarningScreen() {
  const navigator = useNavigation();
  const route = useRoute();

  
  const Earning = route.params?.totalEarning || 0;
  const onlineTime = route.params?.onlineTime || 0;
  const distanceCovered=route.params?.distanceCovered || 0;

  useEffect(() => {
    // setTimeout(() => {
    //     navigator.navigate('newpass')
    // }, 3000);
  }, []);
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
          Earnings
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
  const earningsList = () => {
    return (
      <View
        style={{
          //   backgroundColor: 'pink',
          //   height: '9%',
          width: '95%',
          alignSelf: 'center',
          marginTop: 20,
          //borderWidth: 1,
         borderRadius: 15,
          height: '15%',
          //   padding: 5,
          justifyContent: 'center',
          backgroundColor: '#f8f9fa',
          elevation:3,
          // alignItems: 'center',
        }}>
        <View
          style={{
            alignSelf: 'center',
            width: '95%',
            height: '90%',
            // backgroundColor: 'red',
            justifyContent: 'space-between',
          }}>
          <View
            style={
              {
                // alignSelf: 'flex-start',
              }
            }>
            <Text style={{color:'black',fontSize:10,fontWeight:'300'}}>Earned Today</Text>
            <View style={{flexDirection: 'column'}}>
           
            <View
                style={{
                  // left: 200,
                  flexDirection: 'row',
                  // backgroundColor: 'pink',
                  alignItems: 'center',
                }}>
                <Pound style={{color:'gray'}} />
                <Text style={{color:'black',fontSize:15,fontWeight:'600'}}>{Earning}</Text>
              </View>
          </View>
           
          </View>
          <HorizontalDivider />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            
            <View>
              <Text style={{color:'black',fontWeight:'300',fontSize:10}}>Time Online</Text>
              <Text style={{color:'black',fontWeight:'600',fontSize:12}}>{onlineTime}</Text>
            </View>
            <View>
              <Text style={{color:'black',fontWeight:'300',fontSize:10}}>Total Distance</Text>
              {distanceCovered?(
              <Text style={{color:'black',fontWeight:'600',fontSize:12}}>{distanceCovered.toFixed(2)} miles</Text>
            ):(
              <Text style={{color:'black',fontWeight:'600',fontSize:12}}>0 miles</Text>
            
            )}
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      <SafeAreaView>
        <StatusBar backgroundColor={'#FFFFFF'} />
        <View style={{backgroundColor: '#FFFFFF', height: height}}>
          {renderHeaders()}
          {earningsList()}
        </View>
      </SafeAreaView>
    </View>
  );
}
