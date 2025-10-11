import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  Dimensions,
  Switch,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import AppColours from '../../appStyles/AppColours';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StackActions, useNavigation} from '@react-navigation/native';
import {AuthContext} from '../contextApi/AuthProvider';
import {setSecurityFlag, getDriver, setUserData} from '../providers-callable/http';

const {height} = Dimensions.get('screen');

export default function SecurityScreen() {
  const {user, setUser,token} = useContext(AuthContext);
  const navigator = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [oprModal, setOprModal] = useState(false);
  const [operation, setOperation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventData = {
          email: user.email,
        };
        const data = await getDriver(eventData, token);
        setIsEnabled(data.data.securityEnabled);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
    console.log('user is=>',user);
  }, [user, token,isEnabled]);

  useEffect(() => {
    if (isEnabled) {
      console.log('Modal will be visible');
    }
  }, [isEnabled]);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    switchStore(isEnabled);
  };

  const switchStore = async value => {
    try {
      const eventData = {
        email: user.email,
        flag: value ? false : true,
      };
      console.log(eventData);
      console.log(value ? false : true, '==<');
      if (value == true) {
        setOperation('disable');
        setOprModal(true);
        // await setSecurityFlag(eventData, token);
      } else {
        setOperation('enable');
        setOprModal(true);
        // await setSecurityFlag(eventData, token);
      }
      // await setSecurityFlag(eventData, token);
    } catch (error) {
      console.error('Error storing switch value:', error);
    }
  };

  const renderHeaders = () => (
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

  const Info = () => (
    <View>
      <View
        style={{
          top: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginHorizontal: 30,
        }}>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
          Enable Passcode
        </Text>
        <Switch
          trackColor={{false: '#ced4da', true: '#71C3FF'}}
          thumbColor={isEnabled ? 'white' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View
        style={{
          borderTopWidth: 1,
          alignSelf: 'center',
          marginVertical: 50,
          width: '100%',
        }}>
        <Text
          style={{
            color: 'black',
            alignSelf: 'center',
            marginVertical: 20,
            // borderTopWidth:1,
            fontSize: 10,
          }}>
          Use passcode to secure your sensitive information
        </Text>
      </View>
    </View>
  );

  const ProceedingModal = () => {
    return (
      <Modal visible={oprModal} transparent animationType="slide">
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0, //80
            // backgroundColor: 'pink',
            // width:"95%",

            backgroundColor: 'white',
            // padding: 20,
            height: '30%',
            width: '100%',
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            elevation: 10,
            justifyContent: 'center',
            alignItems: 'center',
            // height: '53%',
          }}>
          {/* {renderQuestions()} */}
          <Text style={{color: AppColours.Dark}}>
            Do you want to continue to {operation} passcode?
          </Text>
          <View
            style={
              {
                // position: 'absolute',
                // left: 0,
                // right: 0,
                // bottom: 80,
                // height: '9%',
              }
            }>
            {/* <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              backgroundColor: AppColours.AppBackGroundDefalut,
              width: '20%',
              marginTop: 20,
              padding: 6,
              marginHorizontal: 50,
              alignItems: 'center',
              borderRadius: 100,
            }}
            onPress={() => setOprModal(false)}> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: '80%',
                // backgroundColor: 'red',
                alignSelf: 'center',
                top: 10,
              }}>
              {/* <Button title="Yes" onPress={handleConfirm} />
        <Button title="No"      onPress={handleCancel} /> */}
              <TouchableOpacity
                style={{
                  backgroundColor: '#6AB9BF',
                  width: '20%',
                  alignItems: 'center',
                  borderRadius: 100,
                  height: '100%',
                }}
                onPress={async () => {
                  setOprModal(false);
                  const eventData = {
                    email: user.email,
                    flag: false,
                  };
                  if (isEnabled) {
                    await setSecurityFlag(eventData, token);
                    setUser({...user,securityEnabled:false});
                    console.log(eventData);
                  }else{
                  navigator.dispatch(StackActions.replace('sq'));
                }
                }}>
                <Text
                  style={{
                    color: AppColours.color_0_white_base,
                    fontWeight: '600',
                  }}>
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#6AB9BF',
                  width: '20%',
                  alignItems: 'center',
                  borderRadius: 100,
                  height: '100%',
                }}
                onPress={async () => {
                  // setIsEnabled(user.securityEnabled);
                  setOprModal(false);
                }}>
                <Text
                  style={{
                    color: AppColours.color_0_white_base,
                    fontWeight: '600',
                  }}>
                  No
                </Text>
              </TouchableOpacity>
            </View>
            {/* </TouchableOpacity> */}
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View>
      <SafeAreaView>
        <StatusBar backgroundColor={'#FFFFFF'} />
        <View style={{backgroundColor: '#FFFFFF', height: height}}>
          {renderHeaders()}
          {Info()}
          {ProceedingModal()}
        </View>
      </SafeAreaView>
    </View>
  );
}
