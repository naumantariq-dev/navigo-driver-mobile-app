import React, {useRef, useState} from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Logo from '../../assets/icons/Logo.svg';

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export default function NewPasswordScreen() {
  const navigator = useNavigation();
  const [confirmnewPasswordVisibilty, setConfirmnewPasswordVisibilty] = useState(false);
  const [newPasswordVisibilty, setNewPasswordVisibilty] = useState(false);
  const handlenewPasswordVisibilty = () => {
    if (newPasswordVisibilty == false) {
      setNewPasswordVisibilty(true);
    } else {
      setNewPasswordVisibilty(false);
    }
    console.log('state is=>>', newPasswordVisibilty);
  };
  const handleConfirmPasswordVisibilty = () => {
    if (confirmnewPasswordVisibilty == false) {
      setConfirmnewPasswordVisibilty(true);
    } else {
        setConfirmnewPasswordVisibilty(false);
    }
    console.log('state is=>>', newPasswordVisibilty);
  };
  return (
    <View>
      <SafeAreaView>
        <StatusBar backgroundColor={AppColours.AppBackGroundDefalut} />
        <View
          style={{
            backgroundColor: AppColours.AppBackGroundDefalut,
            height: height,
          }}>
          <View style={{top: height / 4}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              {/* <Text
                style={{
                  color: '#6AB9BF',
                  fontSize: 50,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                N A V I G O
              </Text> */}
              <Logo/>
              <Text style={{fontSize: 20, color: 'white'}}>
                Change password
              </Text>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                top: 10,
                padding: 20,
                width: '90%',
                alignSelf: 'center',
                borderRadius: 10,
              }}>
              {/* <View style={{backgroundColor:'white',borderRadius:100}}> */}
              <Text
                style={{
                  color: AppColours.color_0_white_base,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                }}>
                Enter New Password
              </Text>
              <View
                style={{
                  paddingLeft: 25,
                  marginBottom: 10,
                  backgroundColor: 'white',
                  borderRadius: 100,
                  flexDirection: 'row',
                }}>
                <TextInput
                  secureTextEntry={!newPasswordVisibilty}
                  style={{
                    //   paddingLeft: 25,
                    //   marginBottom: 10,
                    //   backgroundColor: 'pink',
                    width: '90%',
                    //   borderRadius: 100,
                  }}
                />
                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                    // backgroundColor:'pink',
                  }}
                  onPress={() => {
                    handlenewPasswordVisibilty();
                  }}>
                  {!newPasswordVisibilty ? (
                    <Ionicons
                      name="ios-eye-outline"
                      size={15}
                      style={{alignSelf: 'center'}}
                    />
                  ) : (
                    <Ionicons
                      name="ios-eye-off-outline"
                      size={15}
                      style={{
                        // alignSelf: 'center',
                        // backgroundColor:'red',
                        margin: 0,
                      }}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  color: AppColours.color_0_white_base,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                }}>
                Confirm New Password
              </Text>
              <View
                style={{
                  paddingLeft: 25,
                  marginBottom: 10,
                  backgroundColor: 'white',
                  borderRadius: 100,
                  flexDirection: 'row',
                }}>
                <TextInput
                  secureTextEntry={!confirmnewPasswordVisibilty}
                  style={{
                    //   paddingLeft: 25,
                    //   marginBottom: 10,
                    //   backgroundColor: 'pink',
                    width: '90%',
                    //   borderRadius: 100,
                  }}
                />
                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                    // backgroundColor:'pink',
                  }}
                  onPress={() => {
                    handleConfirmPasswordVisibilty();
                  }}>
                  {!confirmnewPasswordVisibilty ? (
                    <Ionicons
                      name="ios-eye-outline"
                      size={15}
                      style={{alignSelf: 'center'}}
                    />
                  ) : (
                    <Ionicons
                      name="ios-eye-off-outline"
                      size={15}
                      style={{
                        // alignSelf: 'center',
                        // backgroundColor:'red',
                        margin: 0,
                      }}
                    />
                  )}
                </TouchableOpacity>
              </View>

              {/* </View> */}
            </View>
            <View
              style={{
                backgroundColor: '#6AB9BF',
                // width: '40%'
                padding: 10,
                borderRadius: 50,
                alignItems: 'center',
                alignSelf: 'center',
                top: 50,
              }}>
              <Text
                style={{color: 'white'}}
                onPress={() => navigator.navigate('fpsuccess')}>
                Reset Password
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
