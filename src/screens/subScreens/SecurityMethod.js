import React, {useContext, useEffect, useRef, useState} from 'react';
import PincodeInput from 'react-native-pincode-input';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';

import AppColours from '../../../appStyles/AppColours';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {StackActions, useNavigation} from '@react-navigation/native';
import {AuthContext, AuthProvider} from '../../contextApi/AuthProvider';
import { getPtm, setSecurityFlag, setSecurityKey } from '../../providers-callable/http';
const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export default function SecurityMethod() {
  const navigator = useNavigation();
  const inputRefs = useRef([]);
  const values = useRef(['', '', '', '']);

  const [passcode, setPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [opr, setOpr] = useState('Enter Passcode');
  const [buttonText, setButtonText] = useState('Next');
  const [redoModal,setRedoModal]=useState(false)
  const[submitModal,setSubmitModal]=useState(false)


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
    ptm, setPtm
  } = useContext(AuthContext);


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

  const focusNextInput = index => {
    if (inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < 4; i++) {
      inputs.push(
        <TextInput
          key={i}
          style={{
            backgroundColor: '#F0F0F0',
            width: '20%',
            borderRadius: 10,
            textAlign: 'center',
            margin: 5,
            padding: 10,
          }}
          maxLength={1}
          keyboardType={'number-pad'}
          secureTextEntry={true}
          ref={ref => (inputRefs.current[i] = ref)}
          onChangeText={text => handleTextChange(text, i)}
          onKeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace') {
              handleBackspace(i - 1);
            }
          }}
        />,
      );
    }
    return inputs;
  };

  const handleTextChange = (text, index) => {
    const updatedPasscode = passcode.length < 4 ? passcode + text : passcode;
    setPasscode(updatedPasscode);

    if (text.length === 1 && index < 3) {
      inputRefs.current[index + 1].focus();
    }
    console.log(passcode);
  };

  const handleBackspace = index => {
    if (index >= 0) {
      const updatedPasscode = passcode.substring(0, index + 1);
      setPasscode(updatedPasscode);
      inputRefs.current[index].clear();
      inputRefs.current[index].focus();
    }
  };

  // const handleDone = () => {
  //   if (confirmPasscode === '') {
  //     setConfirmPasscode(passcode);
  //     clearAllInputs();
  //     setOpr('Confirm Passcode');
  //     setButtonText('Submit');
  //   } else {
  //     // Confirming passcode
  //     if (passcode === confirmPasscode) {
  //       console.log('Passcodes match:', passcode);
  //       setSubmitModal(true)
  //     } else {
  //       console.log('Passcodes do not match');
  //       alert('Passcodes do not match, press redo and try again')
  //     }
  //   }

  //   if (passcode.length < 4 && values.current.length < 4) {
  //     console.log('Need more elements');
  //   }
  // };
const[loading,setLoading]=useState(false)
const [disable,setDisable]=useState(false)
const handleDone=async ()=>{
  setDisable(true)
  // alert(passcode)
  if (passcode==user.securityKey) {
    // console.log('yaya');
    setLoading(true)
    console.log('hitting api');
    const eventData = {
      email: user.email,
    };
    const data = await getPtm(eventData, token).then(setLoading(false))
    console.log(data.data);
    setPtm(data.data)
    navigator.dispatch(StackActions.replace('ptm'));
  }else{
    // console.log('nay');
    Alert.alert(
      'Wrong Passcode',
      'Re enter correct passcode to continue',
      [
        {
          text: 're-try',
          onPress: () => clearAllInputs(),
          style: 'danger',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            '(　・`ω・´).',
          ),
      },
    );
  }
}


  const clearAllInputs = () => {
    inputRefs.current.forEach(inputRef => {
      if (inputRef) {
        inputRef.clear();
      }
    });
    setPasscode('');
  };

  // const redoModalView = () => {
  //   return (
  //     <Modal visible={redoModal} transparent animationType="slide">
  //       <View
  //         style={{
  //           position: 'absolute',
  //           left: 0,
  //           right: 0,
  //           bottom: 0, //80
  //           // backgroundColor: 'pink',
  //           // width:"95%",

  //           backgroundColor: 'white',
  //           // padding: 20,
  //           height: '30%',
  //           width: '100%',
  //           borderTopLeftRadius: 50,
  //           borderTopRightRadius: 50,
  //           elevation: 10,
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //           // height: '53%',
  //         }}>
  //         {/* {renderQuestions()} */}
  //         <Text style={{color: AppColours.Dark}}>
  //           Do you want to restart creating your new passcode?
  //         </Text>
  //         <View
  //           style={{}}>
  //           <View
  //             style={{
  //               flexDirection: 'row',
  //               justifyContent: 'space-evenly',
  //               width: '80%',
  //               // backgroundColor: 'red',
  //               alignSelf: 'center',
  //               top: 10,
  //             }}>
  //             {/* <Button title="Yes" onPress={handleConfirm} />
  //       <Button title="No"      onPress={handleCancel} /> */}
  //             <TouchableOpacity
  //               style={{
  //                 backgroundColor: '#6AB9BF',
  //                 width: '20%',
  //                 alignItems: 'center',
  //                 borderRadius: 100,
  //                 height: '100%',
  //               }}
  //               onPress={() => {
  //                 setRedoModal(false);
  //                                     clearAllInputs();
  //                   setOpr('Enter Passcode');
  //                   setButtonText('Next');
  //                   setPasscode('');
  //                   setConfirmPasscode('')
  //               }}>
  //               <Text
  //                 style={{
  //                   color: AppColours.color_0_white_base,
  //                   fontWeight: '600',
  //                 }}>
  //                 Yes
  //               </Text>
  //             </TouchableOpacity>
  //             <TouchableOpacity
  //               style={{
  //                 backgroundColor: '#6AB9BF',
  //                 width: '20%',
  //                 alignItems: 'center',
  //                 borderRadius: 100,
  //                 height: '100%',
  //               }}
  //               onPress={() => {
  //                 setRedoModal(false);
  //                 // setIsEnabled(false);
  //               }}>
  //               <Text
  //                 style={{
  //                   color: AppColours.color_0_white_base,
  //                   fontWeight: '600',
  //                 }}>
  //                 No
  //               </Text>
  //             </TouchableOpacity>
  //           </View>
  //           {/* </TouchableOpacity> */}
  //         </View>
  //       </View>
  //     </Modal>
  //   );
  // };
  
  // const onSubmitModal=()=>{
  //   const cancelModalButton = () => {
  //     return (
  //       <View style={{alignSelf: 'flex-end', bottom: '35%', right: '5%'}}>
  //         <TouchableOpacity
  //           style={{
  //             backgroundColor: AppColours.AppBackGroundDefalut,
  //             borderRadius: 100,
  //           }}
  //           onPress={() => {
  //             setSubmitModal(false);
  //             navigator.dispatch(StackActions.replace('home'));
  //           }}>
  //           <Entypo
  //             name="cross"
  //             size={30}
  //             color={AppColours.color_0_white_base}
  //           />
  //         </TouchableOpacity>
  //       </View>
  //     );
  //   };
  //   return(
  //     <Modal visible={submitModal} transparent animationType="slide">
  //         <View
  //           style={{
  //             height: '90%',
  //             backgroundColor: 'white',
  //             marginTop: '35%',
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //           }}>
  //           {cancelModalButton()}
  //           <View style={{
  //             alignItems: 'center'
  //             }}>
  //           <MaterialCommunityIcons
  //               name="checkbox-marked-circle-outline"
  //               size={90}
  //               color={AppColours.AppBackGroundDefalut}
  //               style={{padding: 20}}
  //             />
  //             <Text style={{color: 'black', fontWeight: 'bold',width:300, textAlign:'center'}}>
  //             You can change your passcode at any time from security dashboard
  //             </Text>
  //           </View>
  //         </View>
  //     </Modal>
  //   )
  // }


  return (
    <View>
      <SafeAreaView>
        <StatusBar backgroundColor={'#FFFFFF'} />
        <View style={{backgroundColor: '#FFFFFF', height: height}}>
          {renderHeaders()}
          {/* {redoModalView()}
          {onSubmitModal()} */}
          <View style={{top: height / 4}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  textAlign: 'center',
                  color: AppColours.Dark,
                }}>
                {opr}
              </Text>
            </View>
            <View
              style={{
                // backgroundColor: '#6AB9BF',
                top: 10,
                padding: 20,
                width: '60%',
                alignSelf: 'center',
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {renderInputs()}
            </View>
            <View
              style={{
                // backgroundColor: 'pink',
                width: '80%',
                flexDirection: 'row',
                padding: 10,
                justifyContent: 'space-around',
                alignSelf: 'center',
              }}>


{/* <View
                style={{
                  backgroundColor: '#6AB9BF',
                  width: '25%',
                  borderRadius: 50,
                  alignItems: 'center',
                  alignSelf: 'center',
                  // top: 50,
                }}>
                <Text
                  style={{color: 'white'}}
                  onPress={() => {
                    console.log('i am pressed');
                    // clearAllInputs();
                    // setOpr('Enter Passcode');
                    // setButtonText('Next');
                    // setPasscode('');
                    // setConfirmPasscode('')
                    setRedoModal(true)
                  }}>
                  Redo
                </Text>
              </View> */}
              <TouchableOpacity
              disabled={disable}
                style={{
                  backgroundColor: '#6AB9BF',
                  width: '25%',
                  borderRadius: 50,
                  alignItems: 'center',
                  alignSelf: 'center',
                  // top: 50,
                }}>
                <Text
                  style={{color: 'white'}}
                  onPress={() => {
                    // navigator.navigate('fploader')
                    // console.log('pressed');
                    handleDone();
                    setDisable(true)
                  }}>
                  {buttonText}
                </Text>
                {loading&&(<ActivityIndicator/>)}
              </TouchableOpacity>


            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
