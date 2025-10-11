import React, {useContext,useEffect, useState} from 'react';
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
} from 'react-native';

import AppColours from '../../appStyles/AppColours';
import Icon from 'react-native-vector-icons/FontAwesome';
// import App from '../../../App';
import {useNavigation} from '@react-navigation/native';
import Logo from '../assets/icons/Logo.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../contextApi/AuthProvider';

import storage from '@react-native-firebase/storage';

import { setDocUploadStatus, setStoragePath } from '../providers-callable/http';
//import { AuthContext } from '../contextApi/AuthProvider';
//const { user} = useContext(AuthContext);


const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export default function SuccessScreen() {
  const navigator = useNavigation();

  let {user,userdoc,token} = useContext(AuthContext);

  const eventData={
    userId:user.userId,
    docId:user.email,
    links:{}
  }
  const eventDataForDocStatus={
    email:user.email
  }
  const arr=[
    "proofOfIdentity",
    "DBS",
    "bankStatement",
    "profilePhotoIdentity",
    "DLVAPlasticLicense",
    "DLVAElectronicCounterpartCheckCode",
    "insuranceCertificate",
    "insuranceSupportingDocument",
    "MOTTestCertificate",
    "nationalInsuranceNumber",
    "PHV",
    "publicLiabilityInsurance",
    "logBook",
    ]
    async function getDownloadUrl() {
      try {
        arr.forEach(async e=>{
          // let ee=e
          const url = await storage()
          // .ref(storagePath)
          .ref(`users/${user.userId}/${e}`)
          .getDownloadURL();
        console.log('Download URL:', url);
        console.log('e is =>> ',eventData);
        eventData.links[e]=url
        })
        // const url = await storage()
        //   .ref(storagePath)
        //   .getDownloadURL();
        // console.log('Download URL:', url);
        // Now, you can use the 'url' to access the document.
      } catch (error) {
        console.error('Error getting download URL:', error);
      }
    }
    

  useEffect(()=>{
    console.log("user",user)
    console.log("doc",userdoc)
    getDownloadUrl()
  })
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

          <View style={{alignSelf: 'center', width: '50%'}}>
            <Text
              style={{
                textAlign: 'center',
                marginBottom: 10,
                fontWeight: '600',
              }}>
              Thankyou for submitting your document with Navigo
            </Text>
            <Text style={{textAlign: 'center', marginBottom: 10}}>
              Our team will get back to you once they have verified
            </Text>
          </View>
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
              // console.log('sadasd',eventData);
              setStoragePath(eventData,token)
              setDocUploadStatus(eventDataForDocStatus,token)
              navigator.navigate('login');

            }}>
            <Text style={{color: 'white'}}>Back to Sign in</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{ma}}> */}

        {/* </View> */}
      </SafeAreaView>
    </View>
  );
}
