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
  Modal,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import AppColours from '../../appStyles/AppColours';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Clip from '../assets/icons/rideScreenbg.svg';
import {AuthContext} from '../contextApi/AuthProvider';
import {getRidesHistory} from '../providers-callable/http';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Pound from '../assets/icons/Pound.svg';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {Marker} from 'react-native-maps';

const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export default function RdeScreen() {
  const {user, setUser, token} = useContext(AuthContext);

  const mapRef1 = useRef();
  const LAT_DELTA = 0.0035; //0.24,
  const LNG_DELTA = 0.0035;
  const pp = {
    latitude: 24.9143,
    longitude: 67.1272,
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421,
    latitudeDelta: LAT_DELTA,
    longitudeDelta: LNG_DELTA,
  };
  const dp = {
    latitude: 24.8617,
    longitude: 67.0736,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    // latitudeDelta:  LAT_DELTA,
    // longitudeDelta: LNG_DELTA,
  };

  const [tripHistoryModal, setTripHistoryModal] = useState(false);
  const [rideHostory, setRideHistory] = useState(null);
  const navigator = useNavigation();
  useEffect(() => {
    // setTimeout(() => {
    //     navigator.navigate('newpass')
    // }, 3000);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventData = {
          email: user.email,
        };
        console.log(eventData);
        const data = await getRidesHistory(eventData, token);
        setRideHistory(data.data);
        // setIsEnabled(data.data.securityEnabled);
        console.log('history==>', data.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
    console.log('user is=>', user);
  }, [user, token]);

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
          Rides
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
  const noData = () => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', top: 10}}>
        <ActivityIndicator />
        <Clip style={{alignSelf: 'center'}} />
        <Text style={{color: 'blue', fontWeight: '500'}}>Empty Data</Text>
        <Text style={{color: AppColours.Dark, fontWeight: '500'}}>
          No rides completed yet
        </Text>
      </View>
    );
  };
  const previousButton = () => {
    return (
      <View
        style={{
          //   backgroundColor: 'pink',
          height: '9%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: AppColours.AppLogoColor,
            padding: 10,
            width: '35%',
            borderRadius: 100,
          }}
          // onPress={}
        >
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '600',
              color: AppColours.color_0_white_base,
            }}>
            Previous Rides
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const formatCreatedAt = createdAt => {
    const date = new Date(parseInt(createdAt));

    const formattedDate = `${padZero(date.getDate())}-${padZero(
      date.getMonth() + 1,
    )}-${date.getFullYear()}, ${getDayOfWeek(date)}`;

    const formattedTime = `${padZero(date.getHours() % 12 || 12)}:${padZero(
      date.getMinutes(),
    )}${date.getHours() >= 12 ? 'pm' : 'am'}`;

    return `${formattedDate}, ${formattedTime}`;
  };

  const padZero = number => (number < 10 ? `0${number}` : number);

  const getDayOfWeek = date => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  // const renderItem = () => {
  //   return (
  //     <>
  //       <View style={{marginTop: 10, width: '95%', alignSelf: 'center'}}>
  //         <Text style={{fontWeight: 'bold', color: AppColours.Dark}}>
  //           Trip History
  //         </Text>
  //         <Text
  //           style={{
  //             fontWeight: '400',
  //             fontSize: 9,
  //             color: AppColours.Dark,
  //           }}>
  //           05:00pm-06:15pm
  //         </Text>
  //       </View>
  //       <View
  //         style={{
  //           //   backgroundColor: 'pink',
  //           //   height: '9%',
  //           width: '95%',
  //           alignSelf: 'center',
  //           // marginTop: 10,
  //           // borderWidth: 1,
  //           // borderRadius: 15,
  //           height: '20%',
  //         }}>
  //         <MapView
  //           ref={mapRef1}
  //           style={{height: '50%', width: '100%'}}
  //           initialRegion={pp}
  //           scrollEnabled={false}
  //           zoomEnabled={false}>
  //           <Marker coordinate={pp} />
  //           <Marker coordinate={dp} />
  //           <MapViewDirections
  //             origin={pp}
  //             destination={dp}
  //             apikey={'AIzaSyAXY0KXAGloxJe_eB22yrq_USUpT9lXezk'}
  //             strokeWidth={3}
  //             strokeColor="#193B69"
  //             optimizeWaypoints={true}
  //             onReady={result => {
  //               mapRef1.current.fitToCoordinates(result.coordinates, {
  //                 edgePadding: {
  //                   right: 50,
  //                   bottom: -100,
  //                   left: 50,
  //                   top: -100,
  //                 },
  //               });
  //             }}
  //             onError={errorMessage => {
  //               console.log('GOT AN ERROR IN MAPS=>>', errorMessage);
  //             }}
  //           />
  //         </MapView>
  //         <View style={{justifyContent: 'space-between'}}>
  //           <View
  //             style={{
  //               flexDirection: 'row',
  //               justifyContent: 'space-between',
  //             }}>
  //             <View
  //               style={{
  //                 // backgroundColor:'red',
  //                 flexDirection: 'row',
  //                 width: '40%',
  //                 justifyContent: 'space-between',
  //                 alignSelf: 'center',
  //               }}>
  //               <View
  //                 style={{
  //                   width: '30%',
  //                   height: '90%',
  //                   // backgroundColor: 'grey',
  //                   alignSelf: 'center',
  //                   justifyContent: 'center',
  //                   alignItems: 'center',
  //                   borderRadius: 50,
  //                   borderWidth: 2.5,
  //                   borderColor: AppColours.AppLogoColor,
  //                 }}>
  //                 <Icon name="account" size={30} color="#212529" />
  //               </View>
  //               <View
  //                 style={{
  //                   alignSelf: 'center',
  //                 }}>
  //                 <Text
  //                   style={{
  //                     fontSize: 18,
  //                     fontWeight: 'bold',
  //                     color: AppColours.Dark,
  //                   }}>
  //                   {/* {user ? user?.displayName : 'John Davis'} */}dasdasd
  //                 </Text>
  //                 <View
  //                   style={{
  //                     flexDirection: 'row',
  //                   }}>
  //                   <Icon name="star" size={22} color="#6ABABD" />
  //                   <Text
  //                     style={{
  //                       fontSize: 15,
  //                       fontWeight: 'bold',
  //                       color: AppColours.Dark,
  //                     }}>
  //                     4.9
  //                   </Text>
  //                 </View>
  //               </View>
  //             </View>

  //             <View
  //               style={{
  //                 alignSelf: 'flex-end',
  //               }}>
  //               <Text
  //                 style={{
  //                   color: 'black',
  //                   fontSize: 10,
  //                   fontWeight: '300',
  //                 }}>
  //                 Trip Total
  //               </Text>
  //               <View
  //                 style={{
  //                   // left: 200,
  //                   flexDirection: 'row',
  //                   // backgroundColor: 'pink',
  //                   alignItems: 'center',
  //                 }}>
  //                 <Pound />
  //                 <Text
  //                   style={{
  //                     marginLeft: 5,
  //                     fontSize: 15,
  //                     fontWeight: '600',
  //                     color: AppColours.Dark,
  //                   }}>
  //                   {/* & 20.00 */}
  //                   200.00
  //                 </Text>
  //               </View>
  //             </View>
  //           </View>
  //         </View>
  //       </View>
  //     </>
  //   );
  // };
  const RideHistory = ({data}) => {
    const renderItem = ({item}) => (
      <View
        style={{
          flexDirection: 'column',
          // backgroundColor: 'pink',
          marginVertical: 5,
          marginTop: 25,
          //borderWidth: 0.5,
          borderRadius: 5,
          // elevation:2,
          justifyContent: 'center',
          alignItems: 'center',
          width: '90%',
          alignSelf: 'center',
          backgroundColor: '#f8f9fa',
          elevation: 2,
        }}>
        <View
          style={{
            // backgroundColor: 'red',
            width: '95%',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: AppColours.AppBackGroundDefalut,
              fontWeight: 'bold',
              alignSelf: 'flex-end',
              marginTop: 9,
              marginBottom: 9,
            }}>
            Ride Date: {item.rideDate}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              width: '100%',
              // left:5,
              // backgroundColor:'red'
            }}>
            <Text style={{color: 'black', fontWeight: '800'}}>
              Customer Name: {item.riderName}
            </Text>
          </View>
          <View>
            <Text style={{color: 'black', fontWeight: '400'}}>
              Origin: {item.origin}
            </Text>
            <Text style={{color: 'black', fontWeight: '400'}}>
              Destination: {item.destination}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',
              // backgroundColor: 'pink',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color:
                  item?.rideStatus == 'complete' ||
                  item?.rideStatus == 'completed'
                    ? 'green'
                    : 'red',
                marginBottom: 9,
                marginTop: 9,
              }}>
              {item?.rideStatus}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: AppColours.Dark,
                marginBottom: 9,
                marginTop: 9,
              }}>
              Driver Take: {item.driverTake}
            </Text>
          </View>
        </View>

        {/* <View style={{ height: 1, backgroundColor: 'black', marginVertical: 5 }} /> */}
      </View>
    );

    return (
      <>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.rideDate}-${index}`}
        />
      </>
    );
  };

  return (
    <View>
      <SafeAreaView>
        <StatusBar backgroundColor={'#FFFFFF'} />

        <View style={{backgroundColor: '#FFFFFF', height: height}}>
          {renderHeaders()}
          {/* {previousButton()} */}

          {/* {rideHostory == null ? noData() : <RideHistory data={rideHostory} />} */}

          {rideHostory === null ? (
            noData()
          ) : rideHostory.length === 0 ? (
            <View
              style={{justifyContent: 'center', alignItems: 'center', top: 10}}>
              <Clip style={{alignSelf: 'center'}} />
              <Text style={{color: 'blue', fontWeight: '500'}}>Empty Data</Text>
              <Text style={{color: AppColours.Dark, fontWeight: '500'}}>
                No rides completed yet
              </Text>
            </View>
          ) : (
            <RideHistory data={rideHostory} />
          )}
          <View
            style={{backgroundColor: 'transparent', height: 100, width: '100%'}}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
