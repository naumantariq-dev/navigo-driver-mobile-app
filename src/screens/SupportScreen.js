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
  Linking,
} from 'react-native';

import AppColours from '../../appStyles/AppColours';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import HorizontalDivider from '../sharedComponents/HorizontalDivider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export default function SupportScreen() {
  const phoneNumber = '01392 341120';
  const navigator = useNavigation();
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
          Support
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
  //   const earningsList = () => {
  //     return (
  //       <View
  //         style={{
  //             // backgroundColor: 'pink',
  //           //   height: '9%',
  //           width: '95%',
  //           alignSelf: 'center',
  //           marginTop: 20,
  //           borderWidth: 1,
  //           borderRadius: 15,
  //           height: '15%',
  //           //   padding: 5,
  //           justifyContent: 'center',
  //           // alignItems: 'center',
  //         }}>
  //         <View
  //           style={{
  //             alignSelf: 'center',
  //             width: '95%',
  //             height: '90%',
  //             // backgroundColor: 'red',
  //             justifyContent: 'space-between',
  //           }}>
  //           <View
  //             style={
  //               {
  //                 // alignSelf: 'flex-start',
  //               }
  //             }>
  //             <Text style={{color:'black',fontSize:10,fontWeight:'300'}}>Earned Today</Text>
  //             <Text style={{color:'black',fontSize:15,fontWeight:'600'}}>$200</Text>
  //           </View>
  //           <HorizontalDivider />
  //           <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
  //             <View>
  //               <Text style={{color:'black',fontWeight:'300',fontSize:10}}>Total Trips</Text>
  //               <Text style={{color:'black',fontWeight:'600',fontSize:15}}>13</Text>
  //             </View>
  //             <View>
  //               <Text style={{color:'black',fontWeight:'300',fontSize:10}}>Time Online</Text>
  //               <Text style={{color:'black',fontWeight:'600',fontSize:15}}>8h 10m</Text>
  //             </View>
  //             <View>
  //               <Text style={{color:'black',fontWeight:'300',fontSize:10}}>Total Distance</Text>
  //               <Text style={{color:'black',fontWeight:'600',fontSize:15}}>57 mi</Text>
  //             </View>
  //           </View>
  //         </View>
  //       </View>
  //     );
  //   };
  const supportContainer = () => {
    return (
      <View
        style={{
          //   backgroundColor: 'brown',
          height: '35%',
          marginTop: 20,
          width: '95%',
          alignSelf: 'center',
          justifyContent: 'space-around',
        }}>
        <View
          style={
            {
              // backgroundColor: 'pink'
            }
          }>
          <Text
            style={{
              color: 'black',
              fontSize: 25,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Get in touch with us
          </Text>
          {/* <Text style={{color: '#999696'}}> */}
          <Text style={{color: AppColours.Dark, fontWeight: 'bold'}}>
            Would you like us to answer your queries? Do not hesitate and
            contact us now.
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'rgba(106, 186, 189, 0.25)',
            justifyContent: 'center',
            // alignItems:'center',
            height: 100,
            width: '90%',
            borderRadius: 15,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              //   backgroundColor: 'pink',
              justifyContent: 'space-around',
              width: '50%',
              marginBottom: 10,
            }}
            onPress={() => {
              Linking.openURL(`tel:${phoneNumber}`);
            }}>
            <Feather
              name={'phone-call'}
              color={'white'}
              size={16}
              style={{
                backgroundColor: AppColours.AppBackGroundDefalut,
                borderRadius: 100,
                padding: 5,
              }}
            />
            <Text style={{color: AppColours.Dark, fontWeight: 'bold'}}>
              {phoneNumber}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              //   backgroundColor: 'pink',
              justifyContent: 'space-around',
              width: '50%',
            }}>
            <MaterialCommunityIcons
              name={'hours-24'}
              size={26}
              color={AppColours.AppBackGroundDefalut}
            />
            <Text style={{color: AppColours.Dark, fontWeight: 'bold'}}>
              24/7 Support
            </Text>
          </View>
        </View>
        <View
          style={{
            //   backgroundColor: 'blue',
            alignItems: 'center',
            width: '90%',
          }}>
          <Text style={{color: AppColours.Dark, fontWeight: 'bold'}}>
            You can also leave us a message via email. Our team will get in
            touch with you as soon as possible.
          </Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('mailto:driversupport@navigotaxis.com')
            }>
            <Text
              style={{
                color: AppColours.AppBackGroundDefalut,
                fontWeight: 'bold',
              }}>
              driversupport@navigotaxis.com
            </Text>
          </TouchableOpacity>
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
          {supportContainer()}
        </View>
      </SafeAreaView>
    </View>
  );
}
