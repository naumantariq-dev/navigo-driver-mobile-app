import React, {useEffect, useRef, useState} from 'react';
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
  Linking,
  FlatList,
} from 'react-native';

import AppColours from '../../appStyles/AppColours';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import HorizontalDivider from '../sharedComponents/HorizontalDivider';
import Entypo from 'react-native-vector-icons/Entypo';

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export default function FaqScreen() {
  const navigator = useNavigation();
  const [expandedIndex, setExpandedIndex] = useState(-1);

  useEffect(() => {
    // setTimeout(() => {
    //     navigator.navigate('newpass')
    // }, 3000);
  }, []);
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
          FAQ`s
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
  const faqs = [
    'How do I register as a driver?',
    'How much experience do I need to drive with Navigo?',
    'What are the working hours?',
    'Do I need my own car?',
    'Do I need to get my own insurance?',
    'How can I know how much money I made once I complete my trip?',
    'Is Navigo a secure platform?',
  ];
  const answer =
    'You need a working email address and mobile number in order to create an account. Install the app on your iOS or Android smartphone, and register with your mobile number. To receive SMS, you must use an active phone number. We will send a link via email for you to upload the required documents. Once you have submitted the documentation, we aim to approve your application within 7 days. You can start using Navigo as soon as your number gets validated! You must enter your email address when signing up. If you forget your password and require instructions on how to reset it, we will support you via email. We will also email you complete ride receipts.';
  const renderFaqs = () => {
    const renderItem = ({item, index}) => {
      const isExpanded = index === expandedIndex;

      const handleToggle = () => {
        setExpandedIndex(isExpanded ? -1 : index);
      };

      return (
        <View style={{marginBottom: 20}}>
          <TouchableOpacity
            onPress={handleToggle}
            style={{
              flexDirection: 'row',
              // justifyContent:'space-around'
            }}>
            {isExpanded ? (
              <Entypo
                name="chevron-small-right"
                size={25}
                color={'black'}
                style={
                  {
                    // alignSelf: 'flex-start',
                    // backgroundColor: 'white',
                    // borderRadius: 100,
                  }
                }
                onPress={() => {
                  // navigator.navigate('home');
                }}
              />
            ) : (
              <Entypo
                name="chevron-small-down"
                size={25}
                color={'black'}
              />
            )}
            <Text
              style={
                {
                  // fontSize: 18,
                  // fontWeight: 'bold',
                  //   marginBottom: 8
                  color:'black'
                }
              }>
              {item}
            </Text>
          </TouchableOpacity>
          {isExpanded && (
            <Text style={{
                // backgroundColor: 'pink',
                width: '95%', 
                left: 20,
                color:'black'
                }}>
              {answer}
            </Text>
          )}
        </View>
      );
    };
    return (
      <View
        style={{
        //   backgroundColor: 'brown',
          height: '60%',
          justifyContent: 'center',
        }}>
        <View
          style={
            {
              // backgroundColor: 'pink',
              // width:'80%',
            }
          }>
          <FlatList
            data={faqs}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
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
          {renderFaqs()}
        </View>
      </SafeAreaView>
    </View>
  );
}
