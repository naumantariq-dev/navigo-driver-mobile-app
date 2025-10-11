import React, {useContext, useEffect, useRef, useState} from 'react';
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
} from 'react-native';

import AppColours from '../../appStyles/AppColours';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import HorizontalDivider from '../sharedComponents/HorizontalDivider';
import {AuthContext, AuthProvider} from '../contextApi/AuthProvider';
import {getPtm, setPaymentMethod} from '../providers-callable/http';
const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export default function PaymentMethod() {
  const navigator = useNavigation();
  const [bankName, setBankName] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [sortCode, setSortCode] = useState('');
  const [accountNumer, setAccountNumer] = useState('');
  const [saveModal, setSaveModal] = useState(false);
  const [error, setError] = useState(false);
  const[editCycle,setEditCycle]=useState(false)
  let {user, setUser, online, isOnline, logout, token, userId,ptm, setPtm} =
    useContext(AuthContext);

  
  useEffect(() => {
    // setTimeout(() => {
    //     navigator.navigate('newpass')
    // }, 3000);
    // console.log('here=>>',ptm);
  }, [bankName, accountHolderName, sortCode, accountNumer, saveModal,editCycle,ptm]);

  useEffect(() => {
 }, [editCycle,ptm]);

  const cancelModalButton = () => {
    return (
      <View style={{alignSelf: 'flex-end', bottom: '35%', right: '5%'}}>
        <TouchableOpacity
          style={{
            backgroundColor: AppColours.AppBackGroundDefalut,
            borderRadius: 100,
          }}
          onPress={() => {
            setSaveModal(false);
            setEditCycle(false)
            setBankName(null)
            setAccountNumer(null)
            setAccountHolderName(null)
            setSortCode(null)
          }}>
          <Entypo
            name="cross"
            size={30}
            color={AppColours.color_0_white_base}
          />
        </TouchableOpacity>
      </View>
    );
  };
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
          Payment Method
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
  const renderOptions = () => {
    return (
      <>
        <View
          style={{
            // backgroundColor: 'pink',
            height: '50%',
            width: '95%',
            alignSelf: 'center',
            marginTop: 20,
            justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <View
            style={{
              // backgroundColor: 'red',
              height: '90%',
              alignItems: 'center',
            }}>
            <View
              style={{
                // backgroundColor:'pink',
                width: '90%',
                // height:'100%'
              }}>
              <Text style={{fontWeight: 'bold', color: 'black', fontSize: 15}}>
                Name of Bank
              </Text>
              <TextInput
                placeholder="Enter Here"
                style={{borderBottomWidth: 0.5}}
                onChangeText={e => {
                  setBankName(e);
                  setError(false);
                }}
              />
              {error && (
                <Text style={{color: 'red', fontSize: 11}}>
                  Enter Valid values
                </Text>
              )}
              <Text style={{fontWeight: 'bold', color: 'black', fontSize: 15}}>
                Account Holder's Name
              </Text>
              <TextInput
                placeholder="Enter Here"
                style={{borderBottomWidth: 0.5}}
                onChangeText={e => {
                  setAccountHolderName(e);
                  setError(false);
                }}
              />
              {error && (
                <Text style={{color: 'red', fontSize: 11}}>
                  Enter Valid values
                </Text>
              )}
              <Text style={{fontWeight: 'bold', color: 'black', fontSize: 15}}>
                Sort Code
              </Text>
              <TextInput
                placeholder="Enter Here"
                style={{borderBottomWidth: 0.5}}
                onChangeText={e => {
                  setSortCode(e);
                  setError(false);
                }}
              />
              {error && (
                <Text style={{color: 'red', fontSize: 11}}>
                  Enter Valid values
                </Text>
              )}
              <Text style={{fontWeight: 'bold', color: 'black', fontSize: 15}}>
                Account Number
              </Text>
              <TextInput
                placeholder="Enter Here"
                style={{borderBottomWidth: 0.5}}
                onChangeText={e => {
                  setAccountNumer(e);
                  setError(false);
                }}
              />
              {error && (
                <Text style={{color: 'red', fontSize: 11}}>
                  Enter Valid values
                </Text>
              )}
            </View>
          </View>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              backgroundColor: AppColours.AppLogoColor,
              width: '18%',
              padding: 3,
              alignItems: 'center',
              borderRadius: 100,
            }}
            onPress={() => {
              // navigator.navigate('subptm');
              const eventData = {
                email: user.email,
                userId: user.userId,
                payload: {
                  bankName: bankName,
                  accountHolderName: accountHolderName,
                  sortCode: sortCode,
                  accountNumer: accountNumer,
                },
              };
              if (bankName && accountHolderName && sortCode && accountNumer) {
                setSaveModal(true);
                console.log('tru log=>',eventData);
                setPtm(eventData.payload)
                setPaymentMethod(eventData,token)
              } else setError(true);
            }}>
            <Text
              style={{
                color: AppColours.color_0_white_base,
                fontWeight: 'bold',
              }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
        {/* <Modal visible={saveModal} transparent={true} animationType="slide">
          <View
            style={{
              height: '90%',
              backgroundColor: 'white',
              marginTop: '35%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {cancelModalButton()}
            <View style={{alignItems: 'center'}}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Added successfully
              </Text>
              <MaterialCommunityIcons
                name="checkbox-marked-circle-outline"
                size={90}
                color={AppColours.AppBackGroundDefalut}
                style={{padding: 20}}
              />
            </View>
          </View>
        </Modal> */}
      </>
    );
  };

  const renderInfo = () => {
    return (
      <>
        <View
          style={{
            // backgroundColor: 'pink',
            height: '50%',
            width: '95%',
            alignSelf: 'center',
            marginTop: 20,
            justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <View
            style={{
              // backgroundColor: 'red',
              // height: '90%',
              alignItems: 'center',
            }}>
            <View
              style={{
                // backgroundColor:'pink',
                width: '90%',
                height: '90%',
                justifyContent: 'space-around',
              }}>
              <Text style={{fontWeight: 'bold', color: 'black', fontSize: 15}}>
                Name of Bank
              </Text>

              <TextInput
            placeholder={ptm.bankName ? ptm.bankName : 'Click on edit to add information'  }
            style={{
              borderWidth: 0.5,
              marginBottom: 10,
              marginTop: 2,
              width: '100%',
              borderRadius: 100,
              paddingLeft: 12,
            }}
           
          />

              <Text style={{fontWeight: 'bold', color: 'black', fontSize: 15}}>
                Account Holder's Name
              </Text>
             
              <TextInput
            placeholder={ptm.accountHolderName ? ptm.accountHolderName : 'Click on edit to add information'  }
            style={{
              borderWidth: 0.5,
              marginBottom: 10,
              marginTop: 2,
              width: '100%',
              borderRadius: 100,
              paddingLeft: 12,
            }}
           
          />
              <Text style={{fontWeight: 'bold', color: 'black', fontSize: 15}}>
                Sort Code
              </Text>
            
              <TextInput
            placeholder={ptm.sortCode ? ptm.sortCode : 'Click on edit to add information'  }
            
            style={{
              borderWidth: 0.5,
              marginBottom: 10,
              marginTop: 2,
              width: '100%',
              borderRadius: 100,
              paddingLeft: 12,
            }}
           
          />
              <Text style={{fontWeight: 'bold', color: 'black', fontSize: 15}}>
                Account Number
              </Text>

              <TextInput
            placeholder={ptm.accountNumer ? ptm.accountNumer : 'Click on edit to add information'  }
           
            style={{
              borderWidth: 0.5,
              marginBottom: 10,
              marginTop: 2,
              width: '100%',
              borderRadius: 100,
              paddingLeft: 12,
            }}
           
          />
            
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              // backgroundColor: 'red',
              justifyContent: 'space-around',
              width: '80%',
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                backgroundColor: AppColours.AppLogoColor,
                width: '18%',
                padding: 3,
                alignItems: 'center',
                borderRadius: 100,
              }}
              onPress={() => {
                // navigator.navigate('subptm');
                // const eventData = {
                //   email: user.email,
                //   userId: user.userId,
                //   payload: {
                //     bankName: bankName,
                //     accountHolderName: accountHolderName,
                //     sortCode: sortCode,
                //     accountNumer: accountNumer,
                //   },
                // };
                // if (bankName && accountHolderName && sortCode && accountNumer) {
                  // setSaveModal(true);
                  setEditCycle(true)
                  // console.log(eventData);
                // } else setError(true);
              }}>
              <Text
                style={{
                  color: AppColours.color_0_white_base,
                  fontWeight: 'bold',
                }}>
                Edit
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{
                alignSelf: 'center',
                backgroundColor: AppColours.AppLogoColor,
                width: '18%',
                padding: 3,
                alignItems: 'center',
                borderRadius: 100,
              }}
              onPress={() => {
                // navigator.navigate('subptm');
                // const eventData = {
                //   email: user.email,
                //   userId: user.userId,
                //   payload: {
                //     bankName: bankName,
                //     accountHolderName: accountHolderName,
                //     sortCode: sortCode,
                //     accountNumer: accountNumer,
                //   },
                // };
                // if (bankName && accountHolderName && sortCode && accountNumer) {
                  setSaveModal(true);
                  // setEditCycle(true)
                  // console.log(eventData);
                // } else setError(true);
              }}>
              <Text
                style={{
                  color: AppColours.color_0_white_base,
                  fontWeight: 'bold',
                }}>
                Save
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </>
    );
  };
  const onSaveModal=()=>{
    return(
      <Modal visible={saveModal} transparent={true} animationType="slide">
      <View
        style={{
          height: '90%',
          backgroundColor: 'white',
          marginTop: '35%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {cancelModalButton()}
        <View style={{alignItems: 'center'}}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            Added successfully
          </Text>
          <MaterialCommunityIcons
            name="checkbox-marked-circle-outline"
            size={90}
            color={AppColours.AppBackGroundDefalut}
            style={{padding: 20}}
          />
        </View>
      </View>
    </Modal>
    )
  }

  return (
    <View>
      <SafeAreaView>
        <StatusBar backgroundColor={'#FFFFFF'} />
        <View style={{backgroundColor: '#FFFFFF', height: height}}>
          {renderHeaders()}
          {editCycle ? renderOptions() : renderInfo()}
          {onSaveModal()}
        </View>
      </SafeAreaView>
    </View>
  );
}
