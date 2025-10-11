import React, {useContext, useEffect, useState} from 'react';
import {CheckBox} from 'react-native-elements';
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
  Switch,
  ActivityIndicator,
} from 'react-native';

import AppColours from '../../appStyles/AppColours';
import Icon from 'react-native-vector-icons/FontAwesome';
// import App from '../../../App';
import {StackActions, useNavigation} from '@react-navigation/native';
import Logo from '../assets/icons/Logo.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext, AuthProvider} from '../contextApi/AuthProvider';

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export default function ValidatorScreen() {
  let {
    user,
    setUser,
    userId,
    setUserId,
    token,
    setToken,
    error,
    setError,
    loading,
    setLoading,
    login,
    ptm,
    setPtm,
  } = useContext(AuthContext);

  const navigator = useNavigation();
  // const arr = [
  //   'ProofOfIdentity-obj',
  //   'DBS-obj',
  //   'BankStatment-obj',
  //   'Profile-obj',
  //   'DLVAPlasticLicense-obj',
  //   'DLVAElectronicCounterpartCheckCode-obj',
  //   'InsuranceCertificate-obj',
  //   'InsuranceSupportingDocument-obj',
  //   'MOTTestCertificate-obj',
  //   'NationalInsuranceNumber-obj',
  //   'PHV-obj',
  //   'PublicLiabilityInsurance-obj',
  //   'LogBook-obj',
  // ];

  // _retrieveData = async item => {
  //   try {
  //     const value = await AsyncStorage.getItem(item);
  //     if (value !== null) {
  //       // We have data!!
  //       console.log('value for=> ', value);
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };

  const tt = () => {
    // arr.forEach(e => {
    //   _retrieveData(e);
    // });
  };

  //   useEffect(async () => {
  //     const value = await AsyncStorage.getItem(ProofOfIdentity-obj);
  // console.log(value);
  //   }, []);

  return (
    <View>
      <SafeAreaView>
        <StatusBar backgroundColor={AppColours.AppBackGroundDefalut} />
        <View
          style={{justifyContent: 'center', alignItems: 'center', top: 300}}>
          <Logo />
          {loading ? (
            <ActivityIndicator
              size="large"
              color={AppColours.AppBackGroundDefalut}
            />
          ) : (
            <View style={{alignSelf: 'center', width: '90%'}}>
              {error ? (
                <Text
                  style={{
                    textAlign: 'center',
                    marginBottom: 10,
                    fontWeight: '600',
                    color:'red'
                  }}>
                  Creating Account Failed
                </Text>
              ) : (
                <Text
                  style={{
                    textAlign: 'center',
                    marginBottom: 10,
                    fontWeight: '600',
                  }}>
                  Your Account has been created!
                </Text>
              )}
              {error ? (
                <Text style={{textAlign: 'center', marginBottom: 10}}>
                  {error}
                </Text>
              ) : (
                <Text>Click on "Continue" to proceed with account setup.</Text>
              )}
              {error ? (
              <TouchableOpacity
                style={{
                  borderWidth: 0.5,
                  width: '90%',
                  borderRadius: 100,
                  padding: 15,
                  alignSelf: 'center',
                  alignItems: 'center',
                  backgroundColor: AppColours.AppBackGroundDefalut,
                  top: 200,
                }}
                onPress={() => {
                    navigator.dispatch(StackActions.replace('signup'));
                }}>
                <Text style={{color: 'white'}}>Back to signup</Text>
              </TouchableOpacity>
              ):(
                <TouchableOpacity
                style={{
                  borderWidth: 0.5,
                  width: '90%',
                  borderRadius: 100,
                  padding: 15,
                  alignSelf: 'center',
                  alignItems: 'center',
                  backgroundColor: AppColours.AppBackGroundDefalut,
                  top: 200,
                }}
                onPress={() => {
                //   navigator.navigate('doc');
                  navigator.dispatch(StackActions.replace('doc'));
                }}>
                <Text style={{color: 'white'}}>Continue</Text>
              </TouchableOpacity>

              )}
            </View>
          )}
        </View>
        {/* <View style={{ma}}> */}

        {/* </View> */}
      </SafeAreaView>
    </View>
  );
}
