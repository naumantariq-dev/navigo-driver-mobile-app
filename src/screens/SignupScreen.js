import React, {useState, useRef, useContext} from 'react';
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
  Keyboard,
  ToastAndroid,
} from 'react-native';

import AppColours from '../../appStyles/AppColours';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StackActions, useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../contextApi/AuthProvider';
import auth from '@react-native-firebase/auth';
import GoogleIcon from '../assets/icons/Google.svg';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  forGoogleSigningOperations,
  setUserData,
} from '../providers-callable/http';

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export default function SignupScreen() {
  GoogleSignin.configure({
    webClientId:
      '864608395746-mgu26rcs616f8fa6137sp44g5s08gk8j.apps.googleusercontent.com',
  });

  let {
    register,
    token,
    setToken,
    setUser,
    cities
    //  loading,
    // setLoading
  } = useContext(AuthContext);
  const navigator = useNavigation();

  const [isChecked, setIsChecked] = useState(false);

  // const cities = ['London', 'Bristol', 'Plymouth', 'Taunton', 'Southampton'];
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCityED, setSelectedCityED] = useState('');
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phno, setPhno] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //   const test=async (val)=>{
  //     const jsonValue = JSON.stringify(val);
  // await AsyncStorage.setItem('@UserVals', jsonValue);
  // }
  //   const storeData = async (key, value) => {
  //     try {
  //       // const jsonValue = JSON.stringify(value);
  //       // await AsyncStorage.setItem('@UserVals', jsonValue);
  //       await AsyncStorage.setItem(key, value);
  //       console.log('vals stored');
  //     } catch (e) {
  //       console.log('error storing data locally=>', e);
  //     }
  //   };

  // const googleSignin = async () => {
  //   try {
  //     setLoading(true);
  //     await GoogleSignin.hasPlayServices();
  //     await GoogleSignin.signOut().then(() => {
  //       console.log('is logging out');
  //     });
  //     const userInfo = await GoogleSignin.signIn();
  //     //setState({ userInfo });
  //     console.log('hereeee is userinfooo ', userInfo);
  //     console.log('email', userInfo.user.email);
  //     const {idToken} = userInfo;
  //     // setIsUserSignedIn(true);
  //     const providers = await auth().fetchSignInMethodsForEmail(
  //       userInfo.user.email,
  //     );
  //     console.log('providers', providers);
  //     // if (providers.length > 1) {
  //     //   console.log('Account already exist');
  //     if (providers.includes('password')) {
  //       console.log('Email/Password account already exists');
  //       setLoading(false);
  //     }
  //     // if (providers.includes('google.com')) {
  //     //   console.log('Email/Password account already exists google');
  //     // }
  //     else {
  //       const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  //       return auth()
  //         .signInWithCredential(googleCredential)
  //         .then(async res => {
  //           console.log('here is res=>>',res);
  //           const eventData = {
  //             firstName: res.additionalUserInfo.profile.given_name,
  //             lastName: res.additionalUserInfo.profile.family_name,
  //             displayName: res.user.displayName,
  //             email: res.user.email,
  //             signinMethod: 'Google',
  //             CreatedDate: Date.now(),
  //             isVerified: false,
  //             isActive: false,
  //             userId: res.user.uid,
  //             photoUrl: res.user.photoURL,
  //             lastActiveLocation: {
  //               // latitude: 24.9143,
  //               // longitude: 67.1272,
  //               // latitudeDelta: 0.0035,
  //               // longitudeDelta:0.0035,
  //             },
  //           };
  //           setToken(userInfo?.idToken);
  //           const data = await forGoogleSigningOperations(
  //             eventData,
  //             userInfo?.idToken,
  //           );
  //           console.log('ggogle waly ka data hai?=>', data.data);
  //           setUser(data.data);
  //           navigator.navigate('splash');
  //           setLoading(false);
  //         });
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       console.log('error', error);
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //       console.log('error', error);
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //       console.log('error', error);
  //     } else {
  //       // some other error happened
  //       console.log('error', error);
  //     }
  //   }
  // };

  const googleSignin = async () => {
    try {
      setError(null);
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut().then(() => {
        console.log('is logging out');
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('hereeee is userinfooo ', userInfo);
      console.log('email', userInfo.user.email);
      const {idToken} = userInfo;
      const providers = await auth().fetchSignInMethodsForEmail(
        userInfo.user.email,
      );
      console.log('providers', providers);

      if (providers.includes('password')) {
        console.log('Email/Password account already exists');
        setError('Account already exists');
      } else {
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const res = await auth().signInWithCredential(googleCredential);
        console.log('here is res=>>', res);
        const eventData = {
          firstName: res.additionalUserInfo.profile.given_name,
          lastName: res.additionalUserInfo.profile.family_name,
          displayName: res.user.displayName,
          email: res.user.email,
          signinMethod: 'Google', 
          forum:'App',
          createdAt: Date.now().toString(),
          isLive: false,
          isProved: false,
          // phno:'Enter your phone number',
          phoneNumber:'Enter your phone number',
          userId: res.user.uid,
          photoUrl: res.user.photoURL,
          securityEnabled: false,
          securityKey: null,
          securityQuestions: {},
          lastActiveLocation: {},
          city: {},
          documentUploadStatus: false,
          name:res.user.displayName,
          rideStatus:false,
          vehicleStatus:false,
        };
        setToken(userInfo?.idToken);
        const data = await forGoogleSigningOperations(
          eventData,
          userInfo?.idToken,
        );
        console.log('ggogle waly ka data hai?=>', data.data);
        setUser(data.data);
        setLoading(false);
        // navigator.navigate('splash');
        navigator.dispatch(StackActions.replace('splash'));
      }
    } catch (error) {
      setLoading(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('error', error);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('error', error);
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('error', error);
        // play services not available or outdated
      } else {
        console.log('error', error);
        // some other error happened
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNextButton = () => {
    console.log(isChecked);
    if (
      isChecked == true &&
      email!==null &&
      phno !==null&&
      firstName !==null&&
      lastName !==null&&
      selectedCity!==''
    ) {
      navigator.navigate('createpass');
      const eventData = {
        email: email,
        // phno: phno,
        phoneNumber:phno,
        firstName: firstName,
        lastName: lastName,
        city: selectedCity,
      };
      // storeData('@UserVal-email',email);
      // storeData('@UserVal-phno',phno);
      // storeData('@UserVal-firstName',firstName);
      // storeData('@UserVal-lastName',lastName);
      // storeData('@UserVal-selectedCity',selectedCity);
      // test(obj)
      register(
        email,
        null,
        // setLoading,
        firstName,
        lastName,
        phno,
        selectedCity,
      );
      console.log('obj sent is=>', eventData);
    }else{
      ToastAndroid.showWithGravity(
        'Complete all the given fields to proceed',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  // const handleCityChange = city => {
  //   setSelectedCity(cities[city]);
  //   console.log('=<',cities[city]);
  //   // console.log(selectedCity);
  // };

  const handleCityChange = city => {
    setSelectedCity(city);
    // setSelectedCityED(cities[city]);
    console.log('Selected City:', city);
  };

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phnoRef = useRef();
  const emailRef = useRef();
  const cityRef = useRef();

  const handleFnameSubmit = () => {
    lastNameRef.current.focus();
    console.log(firstName);
  };
  const handleLnameSubmit = () => {
    emailRef.current.focus();
    console.log(lastName);
  };
  const handlePhnoSubmit = () => {
    cityRef.current.focus();
    Keyboard.dismiss();
    console.log(phno);
  };
  const handleEmailSubmit = () => {
    phnoRef.current.focus();
    console.log(email);
  };
  const handleCitySubmit = () => {
    // passwordRef.current.focus();
  };

  return (
    <View>
      <SafeAreaView>
        <StatusBar backgroundColor={AppColours.AppBackGroundDefalut} />
        <View
          style={{
            backgroundColor: 'white',
            height: height,
          }}>
          <View
            style={{
              // backgroundColor: 'brown',
              paddingVertical: 50,
              height: '80%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                // backgroundColor: 'pink',
                width: '90%',
                // justifyContent: 'space-between',
                alignSelf: 'center',
                marginBottom: 20,
              }}>
              <Text
                style={{
                  color: AppColours.Dark,
                  fontWeight: '700',
                  fontSize: 16,
                }}>
                Signup
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                // backgroundColor: 'pink',
                width: '90%',
                justifyContent: 'space-between',
                alignSelf: 'center',
                marginBottom: 10,
              }}>
              <TextInput
                placeholder="First name"
                style={{
                  borderWidth: 0.5,
                  width: '45%',
                  borderRadius: 100,
                  paddingLeft: 12,
                }}
                ref={firstNameRef}
                returnKeyType="next"
                onSubmitEditing={handleFnameSubmit}
                blurOnSubmit={false}
                value={firstName}
                onChangeText={value => {
                  setFirstName(value);
                }}
              />
              <TextInput
                placeholder="Last name"
                style={{
                  borderWidth: 0.5,
                  width: '45%',
                  borderRadius: 100,
                  paddingLeft: 12,
                }}
                ref={lastNameRef}
                returnKeyType="next"
                onSubmitEditing={handleLnameSubmit}
                blurOnSubmit={false}
                value={lastName}
                onChangeText={value => {
                  setLastName(value);
                }}
              />
            </View>
            <View
              style={{
                // flexDirection: 'row',
                // backgroundColor: 'pink',
                width: '90%',
                alignSelf: 'center',
              }}>
              <TextInput
                placeholder="Email address"
                style={{
                  borderWidth: 0.5,
                  marginBottom: 10,
                  width: '100%',
                  borderRadius: 100,
                  paddingLeft: 12,
                }}
                ref={emailRef}
                returnKeyType="next"
                onSubmitEditing={handleEmailSubmit}
                blurOnSubmit={false}
                autoCapitalize="none"
                value={email}
                onChangeText={value => {
                  setEmail(value);
                }}
              />
              <View
                style={{
                  borderWidth: 0.5,
                  marginBottom: 10,
                  width: '100%',
                  borderRadius: 100,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 12,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '15%',
                    // backgroundColor: 'pink',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'black'}}>{'\u{1F1EC}\u{1F1E7}'}</Text>
                  <Text
                    style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
                    +42
                  </Text>
                </View>
                <TextInput
                  placeholder="12345678"
                  inputMode={'tel'}
                  keyboardType={'phone-pad'}
                  style={{
                    top: 1,
                    //   borderWidth: 0.5,
                    //   marginBottom: 10,
                    //   width: '100%',
                    //   borderRadius: 100,
                    fontSize: 15,
                    // opacity:0.6
                  }}
                  ref={phnoRef}
                  maxLength={8}
                  returnKeyType="done"
                  onSubmitEditing={handlePhnoSubmit}
                  blurOnSubmit={false}
                  value={phno}
                  onChangeText={value => {
                    setPhno(value);
                  }}
                />
              </View>

              <View
                style={{
                  borderWidth: 0.5,
                  marginBottom: 10,
                  width: '100%',
                  borderRadius: 100,
                }}>
                  <Picker
  ref={cityRef}
  selectedValue={selectedCity}
  style={{
    borderWidth: 0.5,
    marginBottom: 10,
    width: '100%',
    borderRadius: 100,
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
  }}
  onValueChange={itemValue => handleCityChange(itemValue)}>
  <Picker.Item label="City" value="" />
  {cities.map((city, index) => (
    <Picker.Item key={city.name} label={city.name} value={city} />
  ))}
</Picker>
              </View>

              <Text style={{alignSelf: 'center', marginBottom: 10}}>OR</Text>

              {error && (
                <Text style={{color: 'red', fontSize: 10, textAlign: 'center'}}>
                  {error}
                </Text>
              )}

              {loading ? (
                <ActivityIndicator color={AppColours.Dark} size={'large'} />
              ) : (
                <TouchableOpacity
                  style={{
                    borderWidth: 0.5,
                    width: '100%',
                    borderRadius: 100,
                    padding: 15,
                    marginBottom: 10,
                    // justifyContent:'space-around'
                    flexDirection: 'row',
                    // backgroundColor:'pink'
                  }}
                  onPress={googleSignin}
                  disabled={loading}>

                  <View
                    style={{
                      // backgroundColor: 'pink',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '30%',
                    }}>
                    <GoogleIcon />
                    <Text></Text>
                  </View>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: AppColours.Dark,
                    }}>
                    Continue with Google
                  </Text>
                </TouchableOpacity>
              )}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                  // title="Click on agree to continue"
                  checked={isChecked}
                  onPress={handleCheckboxToggle}
                />
                <Text style={{marginLeft: -20}}>
                  Click on agree to continue
                </Text>
              </View>

            </View>
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
            }}
            onPress={() => {
              handleNextButton();
            }}>
            <Text style={{color: 'white'}}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
