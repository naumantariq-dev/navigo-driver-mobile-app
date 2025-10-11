import React, {useRef, useState, useEffect, useContext} from 'react';
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
  BackHandler,
  ActivityIndicator,
  Linking,
  ToastAndroid,
} from 'react-native';

import AppColours from '../../appStyles/AppColours';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StackActions, useIsFocused, useNavigation} from '@react-navigation/native';

import Logo from '../assets/icons/Logo.svg';
import Car from '../assets/icons/Car.svg';
import {AuthContext} from '../contextApi/AuthProvider';
import auth from '@react-native-firebase/auth';
import { getDriver } from '../providers-callable/http';



const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export default function LoginScreen() {
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
  const navigator = useNavigation();
  const [passwordVisibilty, setPasswordVisibilty] = useState(false);
  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState(null);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);


  // const isFocused = useIsFocused();

  // useEffect(() => {
  //   const handleBackPress = () => {
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

  //   return () => {
  //     backHandler.remove();
  //   };
  // }, [isFocused]);

// useEffect(()=>{
//   console.log('logger',email);
//   console.log('logger',password);
// })


  const handlePasswordVisibilty = () => {
    if (passwordVisibilty == false) {
      setPasswordVisibilty(true);
    } else {
      setPasswordVisibilty(false);
    }
    console.log('state is=>>', passwordVisibilty);
  };
  const renderHeader = () => {
    return (
      <>
        <View
          style={{
            backgroundColor: AppColours.AppBackGroundDefalut,
            height: height / 3.3,
            justifyContent: 'center',
          }}>
          <View
            style={{
              // backgroundColor: 'brown',
              height: height / 3.9,
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                // backgroundColor: 'pink',
                width: 200,
                alignSelf: 'center',
                // top: 60,
              }}>
              <Text
                style={{
                  color: AppColours.color_0_white_lightest,
                  fontSize: 25,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Welcome to Navigo Driver
              </Text>
            </View>
            <View
              style={{
                // backgroundColor: 'green'
                alignItems: 'center',
              }}>
              <Logo />
            </View>
          </View>
        </View>
        <View
          style={{
            // backgroundColor:'pink',
            alignItems: 'center',
            marginRight:19
          }}>
          <Car />
        </View>
      </>
    );
  };
  const renderCredenialsInput = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleEmailSubmit = () => {
      passwordRef.current.focus();
      console.log('email is=>', email);
    };

    const handlePasswordSubmit = () => {
      // Perform any action or submit the form
      console.log('email is=>', email);
    };
    return (
      <View
        style={{
          width: width - 30,
          alignSelf: 'center',
          // backgroundColor: 'pink',
          // top:10
        }}>
        <View
          style={{
            // backgroundColor: 'pink',
            flexDirection: 'row',
          }}>
          <TextInput
            ref={emailRef}
            placeholder="Enter your email"
            placeholderTextColor={'#BDBDBD'}
            autoCapitalize="none"
            style={{
              // backgroundColor: 'brown',
              width: '100%',
              borderBottomWidth: 1,
              // marginBottom: 20,
              marginTop: 20,
            }}
            returnKeyType="next"
            onSubmitEditing={handleEmailSubmit}
            blurOnSubmit={false}
            value={email}
            onChangeText={value => {
              setEmail(value);
              setError(null);
            }}
          />
        </View>
        <View
          style={{
            // backgroundColor: 'pink',
            flexDirection: 'row',
            width: '100%',
            borderBottomWidth: 1,
            marginBottom: 10,
            marginTop: 10,
          }}>
          <TextInput
            ref={passwordRef}
            placeholder="Enter your password"
            secureTextEntry={!passwordVisibilty}
            autoCapitalize="none"
            placeholderTextColor={'#BDBDBD'}
            style={{
              // backgroundColor: 'brown',
              width: '95%',
              // borderBottomWidth: 1,
              // marginBottom: 10,
            }}
            returnKeyType="done"
            onSubmitEditing={handlePasswordSubmit}
            value={password}
            onChangeText={value => {
              setPassword(value);
              setError(null);
            }}
          />
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              // backgroundColor:'pink',
            }}
            onPress={() => {
              handlePasswordVisibilty();
            }}>
            {!passwordVisibilty ? (
              <Ionicons
                name="ios-eye-off-outline"
                size={15}
                style={{alignSelf: 'center'}}
              />
            ) : (
              <Ionicons
                name="ios-eye-outline"
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
        <TouchableOpacity onPress={() => navigator.navigate('fp')}>
          {error && (
            <View
              style={{
                paddingLeft: 8,
                // backgroundColor: 'pink',
                justifyContent: 'flex-start',
              }}>
              <Text
                style={{
                  fontSize: 10,
                  // paddingLeft: 8,
                  textAlign: 'center',
                  color: 'red',
                }}>
                {error.message ? error.message : error.toString()}
              </Text>
            </View>
          )}

          <Text style={{fontSize: 12, paddingLeft: 10}}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
    );
  };
  function errorFormatter(message) {
    return setError(message.slice(message.indexOf(' ')));
  }

  const androidToaster = (msg) => {
    ToastAndroid.showWithGravity(
msg,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const handleLogin = async () => {
    try {
      setLoading(true)
      // const loginStatus = await auth().signInWithEmailAndPassword(
      //   email,
      //   password,
      // );
      // console.log(loginStatus);
      // if (loginStatus) {
      //   // navigator.navigate('splash')
      //   auth().onAuthStateChanged(async user => {
      //     console.log('user is=>', user);
          

      //     if (user) {
      //       const jwtToken = await user.getIdToken();
      //       setToken(jwtToken);
      //       setUserId(user.uid);
      //       const eventData={
      //         email:email
      //       }
      //       console.log('during login==>',eventData);
      //       const data=await getDriver(eventData,token)
      //       console.log('req=>>',data.data)
      //       if (user.email==data.data.email) {
      //         console.log('logged in data=>',data);
      //         setUser(data.data)
      //         setLoading(false)
      //         // navigator.dispatch(StackActions.replace('splash'));
      //       }else{
      //           ToastAndroid.showWithGravity(
      //             'Login failed try again',
      //             ToastAndroid.SHORT,
      //             ToastAndroid.CENTER,
      //           );
            
      //       }
      //     } else {
      //       setLoading(false)
      //       console.log('this is bug');
      //     }
      //   });
      // } else {
      //   setLoading(false)
      //   console.log('error during login');
      // }
      if (email!==null && password !== null) {
        const checker=await login(email,password);
        console.log('checker is ==>',checker);
        if (checker==true) {
          console.log('yay');
          androidToaster('Validating Credentials, please wait..')
          setLoading(false)
              navigator.dispatch(StackActions.replace('splash'));

        } else {
          console.log('nay');
          androidToaster('Wrong email or password, try agian')
          setLoading(false)
        }
      }else{

      }
    } catch (error) {
      console.log('err in catch login=>', error);
      errorFormatter(error?.message ? error?.message : error);
      setLoading(false)
    }
  };
  const renderOprButtons = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          height: 100,
          // backgroundColor: 'white',
          justifyContent: 'space-evenly',
        }}>
           {/* <TouchableOpacity
          style={{
            backgroundColor: AppColours.AppBackGroundDefalut,
            width: 90,
            justifyContent: 'center',
            alignItems: 'center',
            height: 35,
            borderRadius: 100,
          }}
          onPress={googleSignin}>
          <Text style={{color: AppColours.color_0_white_base}}>Sign in google</Text>
        </TouchableOpacity>
         */}
        <TouchableOpacity
          style={{
            backgroundColor: AppColours.AppBackGroundDefalut,
            width: 90,
            justifyContent: 'center',
            alignItems: 'center',
            height: 35,
            borderRadius: 100,
          }}
          disabled={loading}
          onPress={async () => {
            // setUser({email: email, password: password});
            if (email && password !== null) {
              // login(email ,password)
              // navigator.navigate('splash');
              await handleLogin();
            } else {
              setError('Enter credentials to proceed');
              setLoading(false)
            }
          }}>
            {loading ? <ActivityIndicator color={AppColours.color_0_white_base} /> :
          <Text style={{color: AppColours.color_0_white_base}}>Sign in</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: AppColours.AppBackGroundDefalut,
            width: 90,
            justifyContent: 'center',
            alignItems: 'center',
            height: 35,
            borderRadius: 100,
          }}
          onPress={() => navigator.navigate('signup')}>
          {/* // onPress={() => navigator.navigate('vs')}> */}

<Text style={{color: AppColours.color_0_white_base}}>Sign up</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderFooter = () => {
    return (
      <>
        <View
          style={{
            alignItems: 'flex-end',
          }}>
          <View
            style={
              {
                // backgroundColor: 'green'
                marginRight:20
              }
            }>
            <Text
              style={{
                color: '#1A3A6E',
                fontWeight: '100',
              }}
              onPress={()=>{
                Linking.openURL('https://www.navigotaxis.com/terms-and-conditions/');
              }}
              >
              T&Cs
            </Text>
            <Text
              style={{
                color: '#1A3A6E',
                fontWeight: '100',
              }}
              onPress={()=>{
                Linking.openURL('https://www.navigotaxis.com/privacy-policy/');
              }}
              >
              Privacy Policy
            </Text>
          </View>
        </View>
        <View style={{alignSelf: 'center'}}>
          {/* <Icon name="fire" height={100}/> */}
        </View>
      </>
    );
  };
  return (
    <View>
      <SafeAreaView>
        <StatusBar backgroundColor={AppColours.AppBackGroundDefalut} />
        <ScrollView>
          {renderHeader()}
          <View
            style={{
              // backgroundColor: 'pink',
              height: '100%',
            }}>
            {/* <View style={{height:10}} />*/}
            {renderCredenialsInput()}
            {renderOprButtons()}
            {renderFooter()}
            {/* <Ionicons name='ios-eye-outline' size={50} style={{backgroundColor:'pink'}}/> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
