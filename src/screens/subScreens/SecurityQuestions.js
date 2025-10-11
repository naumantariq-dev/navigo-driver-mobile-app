import React, {useContext, useEffect, useRef, useState} from 'react';
import PincodeInput from 'react-native-pincode-input';
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
  Switch,
} from 'react-native';

import AppColours from '../../../appStyles/AppColours';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {StackActions, useNavigation} from '@react-navigation/native';
import HorizontalDivider from '../../sharedComponents/HorizontalDivider';
import {AuthContext, AuthProvider} from '../../contextApi/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setSecurityAnswers} from '../../providers-callable/http';

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export default function SecurityQuestions() {
  let {
    user,
    setUser,
    userId,
    setUserId,
    token,
    setToken,
    // error,setError,
    // loading,
    // setLoading,
    login,
  } = useContext(AuthContext);

  const [pob, setPob] = useState(null);
  const [favPet, setFavPet] = useState(null);
  const [dob, setDob] = useState(null);
  const [error, setError] = useState(null);

  const navigator = useNavigation();

    useEffect(() => {
console.log(user,'on questions');
  }, [user]);

  useEffect(() => {

        }, [user]);
    

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
  const Questions = () => {
    return (
      <View
        style={{alignSelf: 'flex-start', marginHorizontal: 20, marginTop: 50}}>
        <Text style={{color: 'black', fontSize: 17, fontWeight: 'bold'}}>
          Set Security Questions
        </Text>
        <View style={{marginHorizontal: 20}}>
          <Text style={{color: 'black', fontSize: 15, marginTop: 20}}>
          Name of your favorite band or singer? 
          </Text>
          <TextInput
            placeholder="Enter Here"
            style={{
              borderWidth: 0.5,
              marginBottom: 10,
              width: '100%',
              marginTop: 2,
              borderRadius: 100,
              paddingLeft: 12,
            }}
            onChangeText={e => {
              setFavPet(e);
              setError('');
            }}
          />
          <Text style={{color: 'black', fontSize: 15, marginTop: 20}}>
          Choose your own phrase atleast two words
          </Text>
          <TextInput
            placeholder="Enter Here"
            style={{
              borderWidth: 0.5,
              marginBottom: 10,
              marginTop: 2,
              width: '100%',
              borderRadius: 100,
              paddingLeft: 12,
            }}
            onChangeText={e => {
              setPob(e);
              setError('');
            }}
          />
          <Text style={{color: 'black', fontSize: 15, marginTop: 20}}>
            What is the name of your first best friend in high school?
          </Text>
          <TextInput
            placeholder="Enter Here"
            style={{
              borderWidth: 0.5,
              marginBottom: 10,
              marginTop: 2,
              width: '100%',
              borderRadius: 100,
              paddingLeft: 12,
            }}
            onChangeText={e => {
              setDob(e);
              setError('');
            }}
          />
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
          {Questions()}
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              backgroundColor: AppColours.AppLogoColor,
              width: '20%',
              marginTop: 20,
              padding: 6,
              marginHorizontal: 50,
              alignItems: 'center',
              borderRadius: 100,
            }}
            onPress={() => {
              if (favPet && dob && pob) {
                const eventData = {
                  email: user.email,
                  answers: [
                    {question: 'your Favourite pet', answer: favPet},
                    {question: 'Your place of birth', answer: dob},
                    {question: 'Your date of birth', answer: pob},
                  ],
                };
                setSecurityAnswers(eventData,token)
                setUser({...user,SecurityQuestions:eventData.answers});
                navigator.dispatch(StackActions.replace('pass'));
                // console.log({...user,SecurityQuestions:eventData.answers});
                // console.log('will navigate==>', eventData);
              } else {
                // console.log('wont navigate');
                setError('Fill all fields to continue');
              }
            }}>
            <Text
              style={{
                color: AppColours.color_0_white_base,
                fontWeight: 'bold',
              }}>
              Next
            </Text>
          </TouchableOpacity>

          {error && (
            <Text
              style={{
                fontSize: 10,
                // paddingLeft: 8,
                textAlign: 'center',
                color: 'red',
              }}>
              {error}
            </Text>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}