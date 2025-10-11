import React, {useRef} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Button,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import AppColours from '../../../appStyles/AppColours';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export default function ForgotPassword() {
  const navigator = useNavigation();
  
  const inputRefs = useRef([]);
  const values = useRef(['', '', '', '']);

  const focusNextInput = (index) => {
    if (inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleTextChange = (text, index) => {
    const updatedValues = [...values.current];
    updatedValues[index] = text;
    values.current = updatedValues;
    console.log('Updated values:', values.current);

    if (text.length === 1) {
      focusNextInput(index);
    }
  };

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < 4; i++) {
      inputs.push(
        <TextInput
          key={i}
          style={{ backgroundColor: AppColours.color_0_white_base, width: '20%', borderRadius: 10 }}
          maxLength={1}
          ref={(ref) => (inputRefs.current[i] = ref)}
          onChangeText={(text) => handleTextChange(text, i)}
        />
      );
    }
    return inputs;
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
              <Text
                style={{
                  // color: '#6AB9BF',
                  // fontSize: 25,
                  textAlign: 'center',
                  // fontWeight: 'bold',
                  color: AppColours.color_0_white_base
                }}>
                Enter the 4 digit code sent to your at
              </Text>
              <Text style={{
                // fontSize: 30,
                color: AppColours.color_0_white_base
                }}>
                re****@gmail.com
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
                flexDirection:'row',
                justifyContent:'space-between'
              }}>
                {/* <TextInput style={{backgroundColor:AppColours.color_0_white_base,width:'20%',borderRadius:10}} maxLength={1} />
                <TextInput style={{backgroundColor:AppColours.color_0_white_base,width:'20%',borderRadius:10}} maxLength={1} />
                <TextInput style={{backgroundColor:AppColours.color_0_white_base,width:'20%',borderRadius:10}} maxLength={1} />
                <TextInput style={{backgroundColor:AppColours.color_0_white_base,width:'20%',borderRadius:10}} maxLength={1} /> */}
{renderInputs()}
            </View>

            
            <View
              style={{
                backgroundColor: '#6AB9BF',
                width: '15%',
                borderRadius: 50,
                alignItems: 'center',
                alignSelf: 'center',
                top: 50,
              }}>
              <Text
                style={{color: 'white'}}
                onPress={() =>{navigator.navigate('fploader')}}
                >
                Submit
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
