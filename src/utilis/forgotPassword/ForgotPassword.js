import React, {useRef, useState, useContext} from 'react';
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
  Keyboard
} from 'react-native';

import AppColours from '../../../appStyles/AppColours';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StackActions, useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');
import Logo from '../../assets/icons/Logo.svg';
import {AuthContext} from '../../contextApi/AuthProvider';

export default function ForgotPassword() {
  let {
    forgetPassword,
    token,
    setToken,
    setUser,
    //  loading,
    // setLoading
  } = useContext(AuthContext);

  const navigator = useNavigation();
  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = () => {
    // forgetPassword()
    Keyboard.dismiss()
    auth().sendPasswordResetEmail(email)
      .then( (user)=> {
        console.log(user);
        alert('Please check your email...')
      }).catch(function (e) {
        console.log(e)
        if (e.code === 'auth/user-not-found') {
          setError('No user found with this email address.');
        } 
      })
    // navigator.dispatch(StackActions.replace());
    console.log('done');
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
              <Logo />
              <Text style={{fontSize: 30, color: 'white'}}>Reset Password</Text>
            </View>
            <View
              style={{
                backgroundColor: '#6AB9BF',
                top: 10,
                padding: 20,
                width: '95%',
                alignSelf: 'center',
                borderRadius: 10,
              }}>
              <View style={{backgroundColor: 'white', borderRadius: 100}}>
                <TextInput
                  placeholder="type your email"
                  placeholderTextColor={'#BDBDBD'}
                  autoCapitalize="none"
                  style={{paddingLeft: 25}}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                  value={email}
                  onChangeText={value => {
                    setEmail(value);
                    console.log(value);
                    setError(null);
                  }}
                />
              </View>
            </View>
            <TouchableOpacity
              style={{
                // display:'flex',
                backgroundColor: '#6AB9BF',
                width: '15%',
                borderRadius: 50,
                alignItems: 'center',
                alignSelf: 'center',
                top: 50,
              }}
              onPress={() => {
                //  navigator.navigate('confcode')
                if (email !== null || '') {
                  // navigator.dispatch(StackActions.replace('confcode'))
                  console.log('heheheh');
                  handleSubmit()
                } else {
                  setError('Enter your registered email to proceed');
                }
              }}
              >
              <Text
                style={{color: 'white'}}>
                Submit
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
        </View>
      </SafeAreaView>
    </View>
  );
}
