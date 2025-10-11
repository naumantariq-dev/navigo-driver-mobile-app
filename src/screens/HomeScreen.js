import React, {useEffect, useRef, useState, useContext, createRef} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
  Button,
  TextInput,
  Animated,
  ScrollView,
  Linking,
  Platform,
  FlatList,
  PermissionsAndroid,
  ActivityIndicator,
  Alert,
  ToastAndroid,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import AppColours from '../../appStyles/AppColours';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation, StackActions} from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Entypo from 'react-native-vector-icons/Entypo';

import RBSheet from 'react-native-raw-bottom-sheet';
import HorizontalDivider from '../sharedComponents/HorizontalDivider';
import firestore from '@react-native-firebase/firestore';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import RoundCheckbox from 'rn-round-checkbox';
import {Calendar} from 'react-native-calendars';
import {AuthContext} from '../contextApi/AuthProvider';
import auth from '@react-native-firebase/auth';
import Geolocation from 'react-native-geolocation-service';
import {showErrorToast, showSuccessToast} from '../toaster/Toast';
import {err} from 'react-native-svg/lib/typescript/xml';
import {
  getDriverEarnings,
  getPtm,
  setActivityFlag,
  setRideProgressFlag,
} from '../providers-callable/http';
import {getPreciseDistance} from 'geolib';
import SecurityIcon from '../assets/icons/securityIcon.svg';

// import mockLogo from '../assets/icons/mockLogo.svg';
import Pound from '../assets/icons/Pound.svg';
/////////////////////////////import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {color} from '@rneui/base';

const {width, height} = Dimensions.get('window');

export default function HomeScreen() {
  let {
    user,
    setUser,
    online,
    isOnline,
    logout,
    token,
    setToken,
    userId,
    setUserId,
    dropName,
    setDropName,
    pickName,
    setPickName,
    rideAcceptFlag,
    setRideAcceptFlag,
    rideOngoingFlag,
    setRideOngoingFlag,
    rideCompleteFlag,
    setRideCompleteFlag,
    driverIdel,
    setDriverIdel,
    ptm,
    setPtm,
    rideData,
    rideTimeout,
    setRideData,
    rideComplete,
    updateLiveLocation,
    rideProgress,
    // ride,
    // setRide,
    // pickupCords,
    // dropLocation,
    // setLoading,
    // loading,
  } = useContext(AuthContext);
  const navigator = useNavigation();
  const refRBSheet = useRef(null);
  // const refRBSheet = createRef();

  const mapRef = useRef();
  const mapRef1 = useRef();

  const [selectedView, setSelectedView] = useState(null);
  const [activityStatus, setActivityStatus] = useState(false);
  // const [activityOpr, setActivityOpr] = useState(true);
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [chatModal, setChatModal] = useState(false);
  const [meterReading, setMeterReading] = useState('00.00');
  const [distance, setDistance] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [statsModal, setStatsModal] = useState(false);
  const [rideStatus, SetRideStatus] = useState(false);
  const [duration, setDuration] = useState(60);

  const [extras, setExtras] = useState('00:00');
  const [wait, setwait] = useState('00:00');
  const [elapsed, setElapsed] = useState('00:00:00');
  const [isOpen, setIsOpen] = useState(false);

  const [profile, setProfile] = useState(null);

  const [distanceMeter, setDistanceMeter] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [startLocation, setStartLocation] = useState(null);
  const [prevLocation, setPrevLocation] = useState(null);

  const [loading, setLoading] = useState(false);

  const [onlineTime, setOnlineTime] = useState(0);
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [distanceCovered, setDistanceCovered] = useState();
  const [pfpIcon, setPfpIcon] = useState('A');

  const [Id, setId] = useState('');
  const [url, seturl] = useState();
  const [onlineloc, setOnlineLoc] = useState();
  const [offlineloc, setOfflineLoc] = useState();

  const [modalVisibleAcceptHeight, setModalVisibleAcceptHeight] =
    useState('43%');

  // const poundLogo = require('../assets/pound.png');
  const [locationAnimate, setLocationAnimate] = useState(false);

  const [earningData, setEarningData] = useState(null);
  const [earning, setearning] = useState(0);
  const [date, setDate] = useState();
  const [totalEarning, setTotalEarning] = useState();
  const [lastSevenDays, setLastSevenDays] = useState({});
  const [lastSevenDaysEarnings, setLastSevenDaysEarnings] = useState({});

  const [earnedtoday, setEarnedToday] = useState(0);
  const [todaydate, settodaydate] = useState(0);

  useEffect(() => {
    //getProfileImg();
    // setPfpIcon(user.firstName.chatAt(0).toString())
    // console.log('user on home==>',user);
    try {
      if (user.firstName && user.firstName.length > 0) {
        console.log(user.firstName.charAt(0));
        setPfpIcon(user.firstName.charAt(0));
      } else {
        console.log('User firstName is not defined or empty.');
        setPfpIcon('A');
      }
    } catch (e) {
      console.log('Error:', e);
      setPfpIcon('A');
    }
  }, [user]);

  useEffect(() => {
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear();
    var date = date + '-' + month + '-' + year;
    setDate(date);
    setEnd('');
    setStart(hours + ':' + min + ':' + sec);
    settodaydate(date);
    console.log('start==>', start);

    const currentDate = new Date();
    const data = {};

    for (var i = 6; i >= 0; i--) {
      const day = new Date(currentDate);
      day.setDate(currentDate.getDate() - i);
      const formattedDate =
        `${day.getDate().toString().padStart(2, '0')}-` +
        `${(day.getMonth() + 1).toString().padStart(2, '0')}-` +
        `${day.getFullYear()}`;
      data[formattedDate] = 0 /* Your value for this date */;
    }

    // console.log("last seven days=====================================",data)
    setLastSevenDays(data);
    // console.log("user status=====>",user.isActive)
    // console.log("Cureent Date",currentDate)
    //console.log("current Time",currentTime)

    //console.log("acyuv",activityStatus)
  }, []);

  useEffect(() => {
    console.log('start==>', start);
    // Now you can log the start variable here after it has been updated.
  }, [start]);

  useEffect(() => {
    const fetchDataEarnings = async () => {
      try {
        const eventData = {
          email: user.email,
        };
        console.log(eventData);
        const data = await getDriverEarnings(eventData, token);
        console.log('Earning history==>', data.data);
        setEarningData(data.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchDataEarnings();
    console.log('earning is=>', earningData);
  }, [user, token]);

  useEffect(() => {
    // console.log('earning==>', earningData);
    // console.log('earning day',earningData["10-11-2023"])

    //var date = new Date().getDate();
    //var month = new Date().getMonth() + 1; //Current Month
    //var year = new Date().getFullYear();
    //var date=date+'-'+month+'-'+year
    //  console.log("date",date)

    if (earningData) {
      // console.log("earning data",earningData)
      const total = Object.values(earningData).reduce(
        (total, earn) => total + earn,
        0,
      );

      // console.log("Total",total)
      setTotalEarning(total);
      setEarnedToday(earningData[todaydate]);
      setEarnedToday(earningData[todaydate]);
      if (earningData[date]) {
        setearning(earningData[date]);
        // console.log("todays earning",earningData[date])
      } else {
        setearning(0);
        // console.log("zero earning today")
      }
    }

    // Now you can log the start variable here after it has been updated.
  }, [date, earningData]);

  useEffect(() => {
    if (earningData) {
      console.log('Lastsevendays', lastSevenDays);
      console.log('earning', earningData);
      const sevenDaysEarning = {...lastSevenDays};

      Object.keys(earningData).forEach(key => {
        if (key in sevenDaysEarning) {
          sevenDaysEarning[key] = earningData[key];
        }
      });
      console.log('Last seven days earning============>', sevenDaysEarning);
      setLastSevenDaysEarnings(sevenDaysEarning);
    }
  }, [lastSevenDays, earningData]);

  // useEffect(() => { //V1 only doc listener
  //   const collectionRef = firestore()
  //     .collection('testForCf')
  //     .doc(user.email)
  //     .collection('currentRides');

  //   const unsubscribe = collectionRef.onSnapshot((snapshot) => {
  //     const updatedDocuments = [];
  //     snapshot.forEach((doc) => {
  //       const data = doc.data();
  //       updatedDocuments.push({ id: doc.id, ...data });
  //     });

  //     // Check if this is the initial snapshot with data from the server
  //     if (!snapshot.metadata.hasPendingWrites) {
  //       setDocuments(updatedDocuments);
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  // useEffect(() => {  //listens and sorts newlyadded on top
  //   const collectionRef = firestore()
  //     .collection('testForCf')
  //     .doc(user.email)
  //     .collection('currentRides');

  //   const unsubscribe = collectionRef.onSnapshot((snapshot) => {
  //     const updatedDocuments = [];
  //     snapshot.forEach((doc) => {
  //       const data = doc.data();
  //       updatedDocuments.push({ id: doc.id, ...data });
  //     });

  //     // Check if this is the initial snapshot with data from the server
  //     if (!snapshot.metadata.hasPendingWrites) {
  //       // Sort documents by createdAt timestamp in descending order (most recent on top)
  //       updatedDocuments.sort((a, b) => b.createdAt - a.createdAt);
  //       setDocuments(updatedDocuments);
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  // const [documents, setDocuments] = useState([]);
  // useEffect(() => {
  // try {
  //     const collectionRef = firestore()
  //       .collection('testForCf')
  //       .doc(user.email)
  //       .collection('rideHistory');

  //     const unsubscribe = collectionRef.onSnapshot((snapshot) => {
  //       const updatedDocuments = [];
  //       snapshot.forEach((doc) => {
  //         const data = doc.data();
  //         updatedDocuments.push({ id: doc.id, ...data });
  //       });

  //       // Check if this is the initial snapshot with data from the server
  //       if (!snapshot.metadata.hasPendingWrites) {
  //         // Sort documents by createdAt timestamp in descending order (most recent on top)
  //         updatedDocuments.sort((a, b) => b.createdAt - a.createdAt);
  //         setDocuments(updatedDocuments);

  //         // Check if rideAcceptFlag is empty or null in the first document
  //         if (updatedDocuments.length > 0 && !updatedDocuments[0].rideAcceptFlag) {
  //           setRideAcceptFlag(updatedDocuments[0]);
  //         } else {
  //           // rideAcceptFlag is not empty or null, return false or handle accordingly
  //           // You can add your logic here if needed
  //         }
  //       }
  //     });

  //     return () => {
  //       unsubscribe();
  //     };
  // } catch (e) {
  //   console.log('cant fetch it');
  // }
  // }, []);

  //   useEffect(()=>{
  //   console.log('lslsl=>>',documents);
  //   console.log('==>',Date.now());
  //   if (rideAcceptFlag !== null || "") {
  //     // setModalVisible(true)
  //   }
  // },[documents])

  useEffect(() => {
    if (offlineloc && onlineloc) {
      console.log('Online Location---------->', onlineloc);
      console.log('Offline Location---------->', offlineloc);
      const calculateDistance = (point1, point2) => {
        const latDiff = (point2.latitude - point1.latitude) * (Math.PI / 180);
        const lonDiff = (point2.longitude - point1.longitude) * (Math.PI / 180);

        const a =
          Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
          Math.cos(point1.latitude * (Math.PI / 180)) *
            Math.cos(point2.latitude * (Math.PI / 180)) *
            Math.sin(lonDiff / 2) *
            Math.sin(lonDiff / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return 6371000 * c;
      };

      const distanceTotal = calculateDistance(onlineloc, offlineloc);

      const dis = getPreciseDistance(onlineloc, offlineloc);
      const d = dis * 0.00062137;
      setDistanceCovered(d);

      // alert( `Distance\n\n${dis} Meter\nOR\n${distanceTotal} meter\n\nTotal Online Time ${onlineTime}`);
      console.log('Distance====>', dis, 'OR', distanceTotal, 'Meters');
      console.log('Total Time====>', onlineTime);
    }
  }, [offlineloc]);

  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    try {
      // const collectionRef = firestore().collection('testForCf').doc(user.email);
      const collectionRef = firestore().collection('drivers').doc(user.email);

      const unsubscribe = collectionRef.onSnapshot(async snapshot => {
        const data = snapshot.data();
        // const documentId = snapshot.id;
        console.log(data);

        if (data && data.rideStatus) {
          const rideDataRef = firestore()
            .collection('rides')
            .doc(data.rideStatus);
          const rideDataSnapshot = await rideDataRef.get();

          if (rideDataSnapshot.exists) {
            console.log('ride is ==>', rideDataSnapshot.data());
            const docId = data.rideStatus;
            const rideDataWithId = {...rideDataSnapshot.data(), docId};
            console.log('Ride Data:', rideDataWithId);
            // setRideData(rideDataSnapshot.data())
            setRideData(rideDataWithId);
            //const data=rideDataSnapshot.data()
            //console.log("ridedata======================origin========",data.origin.latvalue)

            setModalVisible(true);
          } else {
            console.log('No ride found with the specified rideStatus.');
            setModalVisible(false);
          }
        } else {
          console.log('No rideStatus in the data.');
          setModalVisible(false);
        }
      });

      return () => {
        unsubscribe();
      };
    } catch (e) {
      console.log('Error:', e);
    }
  }, []);
  const [stops, setStops] = useState();
  useEffect(() => {
    console.log('RIDE DATA IS =========================>', rideData);

    if (rideData) {
      setOrigionPoint({
        latitude: rideData.origin.latValue,
        longitude: rideData.origin.lngValue,
        latitudeDelta: LAT_DELTA,
        longitudeDelta: LNG_DELTA,
      });
      setDestinationPoint({
        latitude: rideData.destination.latValue,
        longitude: rideData.destination.lngValue,
        latitudeDelta: LAT_DELTA,
        longitudeDelta: LNG_DELTA,
      });

      if (rideData.stops) {
        console.log('YESS STOPSS', rideData.stops);
        setStops(rideData.stops);
        console.log(stops);
      } else {
        console.log('NO STOPS');
      }
      console.log('BOTH LAT LONG SET====================>');
    }
  }, [rideData]);

  useEffect(() => {
    //  console.log("RIDE DATA IS =========================>",rideData)

    console.log(
      'destination=====================>',
      originpoint,
      destinationpoint,
    );
  }, [destinationpoint]);

  useEffect(() => {
    console.log('lslsl=>>', documents);
    console.log('==>', Date.now());
    if (rideAcceptFlag !== null || '') {
      // setModalVisible(true)
    }

    console.log('data is==>>', rideData);
  }, [rideData]);

  //  const onRideCompletion=async ()=>{
  //   try {
  //     // await firestore().collection('testForCf').doc()
  //     await firestore().collection('drivers').doc()

  //   } catch (error) {
  //     console.log(error);
  //   }
  //  }

  useEffect(() => {
    if (end) {
      console.log('start', start, 'end', end);
      console.log('both time ');
      const startTime = start.split(':');
      console.log('start', startTime);
      const endTime = end.split(':');
      console.log('end', endTime);

      const startHours = parseInt(startTime[0], 10);
      const startMinutes = parseInt(startTime[1], 10);
      const startSeconds = parseInt(startTime[2], 10);

      const endHours = parseInt(endTime[0], 10);
      const endMinutes = parseInt(endTime[1], 10);
      const endSeconds = parseInt(endTime[2], 10);

      let hoursDiff = endHours - startHours;
      let minutesDiff = endMinutes - startMinutes;
      let secondsDiff = endSeconds - startSeconds;
      if (secondsDiff < 0) {
        secondsDiff += 60;
        minutesDiff--;
      }

      if (minutesDiff < 0) {
        minutesDiff += 60;
        hoursDiff--;
      }

      console.log('Time Difference', hoursDiff, minutesDiff, secondsDiff);
      setOnlineTime(hoursDiff + ':' + minutesDiff + ':' + secondsDiff);
      //setEnd('')
      // console.log("Time Online =>",onlineTime)
      //  setEnd(' ')
    } else {
      console.log('still online');
    }
  }, [end]);

  useEffect(() => {
    console.log('time online============', onlineTime);
  }, [onlineTime]);

  /*
  useEffect(()=>{
    
    const EARTH_RADIUS_METERS = 6371000; // Approximate radius of Earth in meters

    const calculateDistance=(point1, point2) =>{
      const latDiff = (point2.latitude - point1.latitude) * (Math.PI / 180);
      const lonDiff = (point2.longitude - point1.longitude) * (Math.PI / 180);

      const a =
        Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
        Math.cos(point1.latitude * (Math.PI / 180)) *
          Math.cos(point2.latitude * (Math.PI / 180)) *
          Math.sin(lonDiff / 2) * Math.sin(lonDiff / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return EARTH_RADIUS_METERS * c;
    }

   
    const distanceToPickup = calculateDistance(currLoc, ride.pickupCords);
   const distanceToDrop = calculateDistance(ride.pickupCords, ride.dropLocation);
    //console.log("distance",distance)

    
    const thresholdDistance = 150; 
    console.log("Distance to pickup:", distanceToPickup);
   console.log("Distance to drop:", distanceToDrop);
    
    if(distanceToPickup<=thresholdDistance){
      
      console.log("Reacheddddd to pickup")
      setModalVisibleAccept(true)
    }
   else if(distanceToDrop<=thresholdDistance){
     console.log("Reached to destination")
      // setModalVisible(false)
     // setModalVisibleAccept(true)
   }
    else{
      console.log("not reacheddd")

    }



  },[currLoc],[ride])*/

  useEffect(() => {
    setId(user.userId);
    const getProfileData = async () => {
      try {
        const storageRef = storage().ref(`/users/${Id}/profileimage`);
        console.log(
          'StorageReff===================================',
          storageRef,
        );
        const download = await storageRef.getDownloadURL();
        console.log('download url', download);
        if (download) {
          seturl(download);
        } else {
          console.log('===============No profile image of user==============');
        }
      } catch (error) {
        if (error.code === 'storage/object-not-found') {
          console.log('No profile image in firebase');
        } else {
          console.error('Error getting download URL:', error);
        }
      }
    };
    if (Id) {
      getProfileData();
    }
    //console.log("URL:", url);
  }, [Id]);

  useEffect(() => {
    console.log('start==>', start);
  }, [start]);

  useEffect(() => {
    if (user) {
      if (user.photoUrl === null) {
        console.log('Logout');
        seturl(null);
      } else {
        seturl(user.photoUrl);
      }
    }
  }, [user]);
  useEffect(() => {
    console.log('url==>', url);
    if (url) {
      const eventData = {
        email: user.email,
        url: url,
      };

      console.log('EVENTDATAAA=============', eventData);
      setUser({...user, photoUrl: eventData.url});
      //setUser({...user,SecurityQuestions:eventData.answers});
      console.log('USer isss==============', user);
    }
  }, [url]);

  /*
  const getProfileImg = async () => {
    try {
      const value = await AsyncStorage.getItem('Profile-obj');
      if (value) {
        console.log('yes getting data', value);
        const imageObject = JSON.parse(value);
        const imageUri = imageObject.path;
        setProfile(imageUri);
      } else console.log('not getting');
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
*/
  const [originpoint, setOrigionPoint] = useState({
    latitude: 24.9143,
    longitude: 67.1272,
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421,
    latitudeDelta: LAT_DELTA,
    longitudeDelta: LNG_DELTA,
  });
  const [destinationpoint, setDestinationPoint] = useState({
    latitude: 24.9143,
    longitude: 67.1272,
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421,
    latitudeDelta: LAT_DELTA,
    longitudeDelta: LNG_DELTA,
  });
  const scrDimension = width / height;
  //sending data after 4 min to firebase using geolocation.getcurrentLocation
  const [currLoc, setCurrLoc] = useState({
    latitude: 50.6312173,
    longitude: -3.4171661,
    latitudeDelta: 0.0175503868866258,
    longitudeDelta: 0.013143830001354218,
  });

  //for tracking and for distance calculation between online and offline loc geolocation.watchposition
  const [currentLoc, setCurrentLoc] = useState({
    latitude: 50.6312173,
    longitude: -3.4171661,
    latitudeDelta: 0.0175503868866258,
    longitudeDelta: 0.013143830001354218,
  });

  const [riderLoc, setRiderLoc] = useState({
    latitude: 50.6312173,
    longitude: -3.4171661,
    latitudeDelta: 0.0175503868866258,
    longitudeDelta: 0.013143830001354218,
  });

  // const LAT_DELTA = 0.9222;
  // const LNG_DELTA = LAT_DELTA * scrDimension;
  const LAT_DELTA = 0.0035; //0.24,
  const LNG_DELTA = 0.0035;
  const staticLocation = {
    latitude: 50.6312173,
    longitude: -3.4171661,
    latitudeDelta: 0.0175503868866258,
    longitudeDelta: 0.013143830001354218,
  };
  useEffect(() => {
    if (user.city) {
      setCurrLoc({
        latitude: parseFloat(user.city.lat),
        longitude: parseFloat(user.city.lng),
        latitudeDelta: LAT_DELTA,
        longitudeDelta: LNG_DELTA,
      });
    }
  }, []);

  // const mockLogo = require('../assets/marker.png');
  const mockLogo = require('../assets/mock.png');
  const markerLogo = require('../assets/marker.png');

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

  const [ride, setRide] = useState({
    pickupCords: {},
    dropLocation: {},
  });
  useEffect(
    () => {
      console.log('ride', ride);
      const EARTH_RADIUS_METERS = 6371000; // Approximate radius of Earth in meters

      const calculateDistance = (point1, point2) => {
        const latDiff = (point2.latitude - point1.latitude) * (Math.PI / 180);
        const lonDiff = (point2.longitude - point1.longitude) * (Math.PI / 180);

        const a =
          Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
          Math.cos(point1.latitude * (Math.PI / 180)) *
            Math.cos(point2.latitude * (Math.PI / 180)) *
            Math.sin(lonDiff / 2) *
            Math.sin(lonDiff / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS_METERS * c;
      };

      const distanceToPickup = calculateDistance(currLoc, ride.pickupCords);
      const distanceToDrop = calculateDistance(
        ride.pickupCords,
        ride.dropLocation,
      );
      //console.log("distance",distance)

      const thresholdDistance = 150;
      console.log('Distance to pickup:', distanceToPickup);
      console.log('Distance to drop:', distanceToDrop);

      if (distanceToPickup <= thresholdDistance) {
        console.log('Reacheddddd to pickup');
        setModalVisibleAccept(true);
      } else if (distanceToDrop <= thresholdDistance) {
        console.log('Reached to destination');
        // setModalVisible(false)
        // setModalVisibleAccept(true)
      } else {
        console.log('not reacheddd');
      }
    },
    [ride],
    [currLoc],
  );

  const {pickupCords, dropLocation} = ride;
  const [testState, setTestState] = useState(false);
  const [mockRide, setMockRide] = useState(false);
  const [modalVisibleAccept, setModalVisibleAccept] = useState(false);
  const [modalOngoing, setModalOngoing] = useState(false);
  const fetchRideInfo = data => {
    console.log('homescreen via test=>', data);

    if (data) {
      setMockRide(true);
      console.log('states==>', dropName);
      console.log('states==>', pickName);
    }
    setRide({
      pickupCords: {
        latitude: data.pickupCords.latitude,
        longitude: data.pickupCords.longitude,
        latitudeDelta: LAT_DELTA,
        longitudeDelta: LNG_DELTA,
      },
      dropLocation: {
        latitude: data.dropLocation.latitude,
        longitude: data.dropLocation.longitude,
        latitudeDelta: LAT_DELTA,
        longitudeDelta: LNG_DELTA,
      },
    });
    // setRideOngoingFlag(true)
    console.log('ride data aaaaaaaaaaaaaaaaaaaaaaaaa', ride);
  };

  const locationPermission = () =>
    new Promise(async (resolve, reject) => {
      if (Platform.OS === 'ios') {
        try {
          const permissionStatus = await Geolocation.requestAuthorization(
            'whenInUse',
          );
          if (permissionStatus === 'granted') {
            showSuccessToast('location granted');
            return resolve('granted');
          } else {
            showErrorToast('location not accesiable');
            return reject('location not accesiable');
          }
        } catch (error) {
          console.log('err in ios permission=>', error);
          return reject(error);
        }
      }
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
        .then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            showSuccessToast('Location Granted');
            resolve('granted');
          } else {
            showErrorToast('Go to settings and grant permission');
            return reject('not granted');
          }
        })
        .catch(e => {
          console.log('android permissions err=>', e);
          showErrorToast('try again');
          return reject(e);
        });
    });
  const getCurrLoc = async () => {
    // console.log('pressed');
    // const denied=await locationPermission();
    // console.log('ststus==>',locationPermission);
    new Promise((resolve, reject) => {
      // setMockRide(true);
      if (locationPermission) {
        Geolocation.getCurrentPosition(
          async position => {
            // console.log(position);
            const cooridinates = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LAT_DELTA,
              longitudeDelta: LNG_DELTA,
            };
            const eventData = {
              cooridinates,
              email: user.email,
            };
            console.log('updating', eventData);
            await updateLiveLocation(eventData);
            setCurrLoc(cooridinates);
            /* mapRef.current.animateToRegion({
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
              latitudeDelta: LAT_DELTA,
              longitudeDelta: LNG_DELTA,
            });*/

            resolve(cooridinates);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            reject(error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const toggleActivityStatus = () => {
    // setActivityStatus(!activityStatus);
    setActivityModalVisible(true);
  };

  const handleConfirm = () => {
    // setActivityOpr(activityStatus);
    setActivityStatus(prevState => (prevState ? false : true));
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();
    setCurrentDate(date + '/' + month + '/' + year);
    setCurrentTime(hours + ':' + min + ':' + sec);
    setActivityModalVisible(false);

    //setActivityModalVisible(false);
    // console.log(activityStatus);

    const eventData = {
      email: user.email,
      flag: activityStatus ? false : true,
    };
    console.log('this is event dataa', eventData);
    console.log('activutyyyy Statussssss', activityStatus);

    if (eventData.flag == true) {
      console.log('saving start Time and setting previous end time to null');
      setEnd('');
      setStart(hours + ':' + min + ':' + sec);
      console.log('Starttttttttttt', start);
    } else {
      if (start) {
        console.log('saving end Time');
        setEnd(hours + ':' + min + ':' + sec);
        //setActivityStatus(false);
        console.log('endddddddddddd', end);
        console.log('end', end);
        // calculateOnlineTime(start,end)
      }
    }
    console.log(eventData);
    setActivityFlag(eventData, token);
  };
  const movingMarkerCurrent = () => {
    try {
      console.log('Marker to driver current loc');
      mapRef.current.animateToRegion({
        latitude: currentLoc.latitude,
        longitude: currentLoc.longitude,
        latitudeDelta: LAT_DELTA,
        longitudeDelta: LNG_DELTA,
      });
      //setLocationAnimate(false)
    } catch (error) {
      console.log('ERROR', error);
    }
  };
  // useEffect(() => {
  //   // for loc update
  //   const interval = setInterval(() => {
  //     if (user.isLive==false) {
  //       getCurrLoc();
  //     }else{
  //       console.log('cant track user offline');
  //     }
  //   }, 300000);

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (user.isLive === false) {
        try {
          await getCurrLoc();
        } catch (error) {
          console.error('Error updating location:', error);
        }
      } else {
        console.log('Cannot track user offline');
      }
      // }, 60000);
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(
      'Current Location isssssssssssssssssssssssssssssssssssssssssss ============>',
      currLoc,
    );
    //alert(currLoc.latitude + 'and' + currLoc.longitude)
    try {
      const updating = async () => {
        console.log('POSTION===>', currLoc);
        //alert(currLoc.latitude + ' and setting' + currLoc.longitude+ ' activityStatus '+activityStatus)
        console.log('Activity Status is =====================', activityStatus);
        const collectionRef = firestore().collection('drivers').doc(user.email);
        const snapshot = await collectionRef.get();
        console.log(
          'snapshot===============================================',
          snapshot,
        );
        const data = snapshot.data();
        //console.log("snapshotdata===============================================",data)
        console.log('driversdata=======================================', data);
        console.log(
          'UPDATED LOC=======================================',
          currLoc,
        );

        const updated = {
          ...data,
          lastActiveLocation: {
            latitude: currLoc.latitude,
            longitude: currLoc.longitude,
            latitudeDelta: LAT_DELTA,
            longitudeDelta: LNG_DELTA,
          },
        };
        console.log('UPDATED===========================', updated);
        collectionRef.update(updated);
      };
      try {
        if (activityStatus) {
          updating();
        }
      } catch (error) {
        console.log('DRIVER IS OFFLINE===================>');
        alert('driver offline');
      }
    } catch (error) {
      console.log('error==>', error);
    }
  }, [currLoc]);

  const handleCancel = () => {
    // setActivityStatus(activityOpr);
    // setActivityStatus((prevState) => prevState ? false : true);
    setActivityModalVisible(false);
  };
  const meter = () => {
    const meterHeaders = () => {
      return (
        <>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'space-between',
              // backgroundColor: 'pink',
              width: '80%',
              alignSelf: 'center',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <AntDesign
              name="plus"
              size={30}
              color={AppColours.AppBackGroundDefalut}
              style={{paddingHorizontal: 10}}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Foundation
                name="pound"
                size={60}
                color="#212529"
                style={
                  {
                    // top:10
                  }
                }
              />
              <Text style={{fontSize: 40, color: 'black', fontWeight: 'bold'}}>
                {meterReading}
              </Text>
            </View>
            <AntDesign
              name="pause"
              size={30}
              color={AppColours.AppBackGroundDefalut}
              style={{paddingHorizontal: 10}}
            />
          </View>
        </>
      );
    };
    const distanceView = () => {
      return (
        <View
          style={{
            backgroundColor: '#D9D9D9',
            height: 60,
            alignSelf: 'center',
            justifyContent: 'center',
            width: '65%',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontWeight: '700'}}>
            Distance: {distance} Miles
          </Text>
        </View>
      );
    };
    const meterLogs = () => {
      const extrasView = () => {
        return (
          <>
            <Text style={{fontWeight: '400', color: 'black'}}>Extras</Text>
            <HorizontalDivider />
            <View style={{flexDirection: 'row'}}>
              <Foundation
                name="pound"
                size={22}
                color="#212529"
                style={{
                  marginRight: 2,
                }}
              />
              <Text style={{fontWeight: 'bold', color: 'black'}}>{extras}</Text>
            </View>
          </>
        );
      };
      const waitView = () => {
        return (
          <>
            <Text style={{fontWeight: '400', color: 'black'}}>Wait</Text>
            <HorizontalDivider />
            <Text style={{fontWeight: 'bold', color: 'black'}}>{wait}</Text>
          </>
        );
      };
      const elapsedView = () => {
        return (
          <>
            <Text style={{fontWeight: '400', color: 'black'}}>Elapsed</Text>
            <HorizontalDivider />
            <Text style={{fontWeight: 'bold', color: 'black'}}>{elapsed}</Text>
          </>
        );
      };
      return (
        <View
          style={{
            // backgroundColor: 'red',
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View>{extrasView()}</View>
          <View>{waitView()}</View>
          <View>{elapsedView()}</View>
        </View>
      );
    };
    const startRide = () => {
      return (
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            backgroundColor: AppColours.AppLogoColor,
            width: '25%',
            alignItems: 'center',
            borderRadius: 100,
          }}
          onPress={() => {
            // alert('under construction');
            // refRBSheet.current.close()

            Alert.alert(
              'comming soon',
              'this feature has been locked by developer due to unstabilty issue with dashboard',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    Alert.alert('Navigating back to main app');
                    refRBSheet.current.close();
                  },
                  style: 'cancel',
                },
              ],
              {
                // cancelable: true,
                // onDismiss: () =>
                //   Alert.alert(
                //     'This alert was dismissed by tapping outside of the alert dialog.',
                //   ),
              },
            );
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Start ride</Text>
        </TouchableOpacity>
      );
    };
    return (
      <View
        style={{
          // backgroundColor: 'red',
          height: '90%',
          justifyContent: 'space-around',
        }}>
        {meterHeaders()}
        {distanceView()}
        {meterLogs()}
        {startRide()}
        {/* <RBSheet
          ref={refRBSheet}
          closeOnPressMask={false}
          closeOnDragDown={true}
          height={350}
          openDuration={250}
          customStyles={{
            container: {
              // justifyContent: 'center',
              // alignItems: 'center',
            },
          }}>
          {meter()}
        </RBSheet> */}
      </View>
    );
  };

  const renderHeaders = () => {
    const UserImage = () => {
      return (
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: '#e1e1e1',
            marginTop: 30,
            marginBottom: 10,
            // paddingHorizontal: 10,
            // marginLeft: 20,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {url ? (
            <Image
              source={{uri: url}}
              style={{width: '100%', height: '100%', borderRadius: 100}}
            />
          ) : (
            <Text
              style={{
                fontSize: 35,
                fontWeight: 'bold',
                color: '#212529',
                // paddingHorizontal: 13,
                // paddingVertical: 13,
              }}>
              {pfpIcon}
            </Text>
          )}
        </View>
      );
    };

    const userInfoAndLogout = () => {
      const logoutFunc = async () => {
        // setLoading(true);
        const response = await logout();

        if (response) {
          setLoading(false);
          navigator.dispatch(StackActions.replace('splash'));
        }
      };

      const logOutView = () => {
        return (
          <TouchableOpacity
            // onPress={async () => {
            //   // navigator.navigate('login');
            //   // logoutFunc
            //   await auth()
            //     .signOut()
            //     .then(() => {
            //       console.log('User signed out!');
            //       setUser(null);
            //       setUserId(null);
            //       setToken(null);
            //       navigator.dispatch(StackActions.replace('splash'));
            //     });
            // }}>
            onPress={logoutFunc}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color={AppColours.Dark} />
            ) : (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'white',
                  marginRight: 1,
                }}>
                <Icon name="logout" size={19} color="#212529" /> Logout
              </Text>
            )}
          </TouchableOpacity>
        );
      };
      return (
        <View
          style={{
            // marginLeft: 12,
            marginTop: 33,
            // backgroundColor:'pink',
            width: '55%',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'white',
              marginRight: 1,
            }}>
            <Icon name="account-outline" size={19} color="#212529" />
            {user ? user?.displayName : 'ABC'}
          </Text>
          <Text style={{fontSize: 14, color: 'white'}}>
            <Icon name="email" size={19} color="#212529" />
            {user?.email}
          </Text>
          {logOutView()}
        </View>
      );
    };
    const menuCloseButton = () => {
      return (
        <View
          style={{
            // position: 'absolute',
            // top: 3,
            // right: 7,
            // paddingHorizontal: 2,
            // paddingVertical: 1,
            borderRadius: 100,
            backgroundColor: '#dad7cd',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={toggleDrawer}>
            <Icon name="chevron-left" size={24} color="#212529" />
          </TouchableOpacity>
        </View>
      );
    };
    const menuOptions = () => {
      return (
        <View style={{top: 20}}>
          {/* <TouchableOpacity
            onPress={() => {
              navigator.navigate('test', {getCords: fetchRideInfo});
              setIsOpen(false);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}>
            <Icon
              name="account-outline"
              size={20}
              color="#212529"
              style={{marginRight: 12}}
            />
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: '#212529',
              }}>
              test
            </Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => navigator.navigate('pfpset')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}>
            <Icon
              name="account-outline"
              size={20}
              color="#212529"
              style={{marginRight: 12}}
            />
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: '#212529',
              }}>
              Profile Settings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // this.RBSheet.open();
              refRBSheet.current.open();
              setIsOpen(false);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}>
            <Icon
              name="speedometer"
              size={20}
              color="#212529"
              style={{marginRight: 12}}
            />
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: '#212529',
              }}>
              Meter
            </Text>
          </TouchableOpacity>
          {/* <RBSheet
            ref={ref => {
              this.RBSheet = ref;
            }}
            height={300}
            openDuration={250}
            customStyles={{
              container: {
                // justifyContent: 'center',
                // alignItems: 'center',
              },
            }}>
            {meter()}
          </RBSheet> */}
          <TouchableOpacity
            onPress={() => {
              navigator.navigate('ride');
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}>
            <Icon
              name="car"
              size={20}
              color="#212529"
              style={{marginRight: 12}}
            />
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: '#212529',
              }}>
              Rides
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigator.navigate('earning', {
                totalEarning,
                onlineTime,
                distanceCovered,
              })
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}>
            <Entypo
              name="wallet"
              size={20}
              color="#212529"
              style={{marginRight: 12}}
            />
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: '#212529',
              }}>
              Earnings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => navigator.navigate('s')}
            onPress={async () => {
              setLoading(true);
              if (user.securityEnabled) {
                //  console.log(user.securityEnabled)
                navigator.navigate('s');
                setLoading(false);
              } else {
                const eventData = {
                  email: user.email,
                };

                const data = await getPtm(eventData, token);
                // .then(setLoading(false))
                console.log(data.data);
                setPtm(data.data);

                if (ptm !== null) {
                  setLoading(false);
                  navigator.navigate('ptm');
                }
              }
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}>
            <Foundation
              name="pound"
              size={30}
              color="#212529"
              style={{
                marginRight: 20,
              }}
            />
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: '#212529',
              }}>
              Payment Method
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigator.navigate('support')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}>
            <Icon
              name="headset"
              size={20}
              color="#212529"
              style={{marginRight: 12}}
            />
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: '#212529',
              }}>
              Support
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => navigator.navigate('tnc')}
            onPress={() => {
              Linking.openURL(
                'https://www.navigotaxis.com/terms-and-conditions/',
              );
              setIsOpen(false);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}>
            <Icon
              name="file-document-outline"
              size={20}
              color="#212529"
              style={{marginRight: 12}}
            />
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: '#212529',
              }}>
              Terms & Conditions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigator.navigate('faq')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}>
            <FontAwesome5
              name="question"
              size={20}
              color="#212529"
              style={{marginRight: 18}}
            />
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: '#212529',
              }}>
              FAQ's
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigator.navigate('secs')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}>
            <Icon
              name="account-lock"
              size={20}
              color="#212529"
              style={{marginRight: 12}}
            />

            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: '#212529',
              }}>
              Security
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.navigotaxis.com/privacy-policy');
              setIsOpen(false);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}>
            <Icon
              name="shield-lock-outline"
              size={20}
              color="#212529"
              style={{marginRight: 12}}
            />
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: '#212529',
              }}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
      );
    };
    return (
      <>
        {!isOpen && (
          <TouchableOpacity
            style={styles.headerContainersidebar}
            onPress={toggleDrawer}>
            {/* <TouchableOpacity onPress={openDrawer}> */}
            <Ionicons
              name="menu"
              size={30}
              color={'black'}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        )}

        {isOpen && (
          <View
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '92%',
              backgroundColor: AppColours.color_0_white_base,
              elevation: 8,
            }}>
            <View
              style={{
                flex: 1,
                paddingVertical: 0,
                paddingHorizontal: 0,
                marginBottom: 10,
              }}>
              <View
                style={{
                  backgroundColor: AppColours.AppLogoColor,
                  height: '20%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    // backgroundColor: 'pink',
                    justifyContent: 'space-around',
                  }}>
                  {UserImage()}
                  {userInfoAndLogout()}
                  {menuCloseButton()}
                </View>
              </View>
              {menuOptions()}
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.headerContainer}
          onPress={() => {
            setLocationAnimate(true);
            movingMarkerCurrent();
            //await getCurrLoc();
          }}>
          {/* <TouchableOpacity onPress={openDrawer}> */}
          <MaterialIcons
            name="my-location"
            size={30}
            color={'black'}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        {/* </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={closeDrawer}> */}

        {/* </TouchableOpacity> */}
      </>
    );
  };

  const handleActvityStatus = () => {
    return (
      <>
        <View
          style={{flexDirection: 'row', justifyContent: 'space-around'}}
          // onPress={toggleActivityStatus}
        >
          <View
            style={{
              backgroundColor: activityStatus ? '#00BB13' : 'red',
              borderRadius: 100,
              alignItems: 'center',
              width: '20%',
            }}>
            <Text style={{color: 'white'}}>
              {activityStatus ? 'Online' : 'Offline'}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#6AB9BF',
              borderRadius: 100,
              alignItems: 'center',
              width: '20%',
            }}
            onPress={toggleActivityStatus}>
            <Text style={{color: 'white'}}>
              {activityStatus ? 'Go Offline' : 'Go Online'}
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={activityModalVisible}
          onRequestClose={() => setActivityModalVisible(false)}
          transparent>
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 80,
              height: '8%',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                // padding: 20,
                height: '100%',
                width: '100%',
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                elevation: 10,
                justifyContent: 'space-evenly',
              }}>
              <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>
                {'Are you sure to want to go '}
                {activityStatus ? 'Offline?' : 'Online?'}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  width: '80%',
                  // backgroundColor: 'red',
                  alignSelf: 'center',
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
                  onPress={handleConfirm}>
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
                  onPress={handleCancel}>
                  <Text
                    style={{
                      color: AppColours.color_0_white_base,
                      fontWeight: '600',
                    }}>
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  };

  const BottomBar = () => {
    return (
      <View style={styles.bottomBarContainer}>
        <View
          style={{
            width: '100%',
            height: 80,
            backgroundColor: AppColours.AppBackGroundDefalut,
            justifyContent: 'space-evenly',
          }}>
          {handleActvityStatus()}
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <TouchableOpacity
              onPress={() => {
                setStatsModal(statsModal ? false : true);
                // navigator.navigate('noti')
              }}>
              <FontAwesome5 name="signal" size={30} color={'white'} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setProfileModal(profileModal ? false : true);
              }}>
              <Ionicons name="notifications" size={30} color={'white'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  //for decline modal
  const handleViewPress = index => {
    setSelectedView(index);
  };

  const profileModalView = () => {
    const myProfile = () => {
      return (
        <View
          style={{
            // backgroundColor:'red',
            flexDirection: 'row',
            width: '50%',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '45%',
              height: '65%',
              // backgroundColor: 'grey',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
              borderWidth: 2.5,
              borderColor: AppColours.AppLogoColor,
            }}>
            {url ? (
              <Image
                source={{uri: url}}
                style={{width: '100%', height: '100%', borderRadius: 100}}
              />
            ) : (
              <Icon name="account" size={30} color="grey" />
            )}
          </View>
          <View
            style={{
              alignSelf: 'center',
              // backgroundColor:'pink',
              left: 10,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: AppColours.Dark,
                // left:20
              }}>
              {user ? user?.displayName : 'My Profile'}
            </Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Icon name="star" size={22} color="#6ABABD" />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: AppColours.Dark,
                }}>
                4.9
              </Text>
            </View>
          </View>
        </View>
      );
    };
    const headers = () => {
      return (
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'pink',
            height: '15%',
            width: '90%',
            justifyContent: 'space-between',
            alignSelf: 'center',
          }}>
          {myProfile()}
          <Ionicons
            name="ios-chevron-down"
            size={25}
            color={'black'}
            style={{
              alignSelf: 'center',
              backgroundColor: 'white',
              borderRadius: 100,
            }}
            onPress={() => {
              setProfileModal(false);
            }}
          />
        </View>
      );
    };
    const rides = () => {
      return (
        <View style={{alignSelf: 'center'}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#6ABABD',
              width: 135,
              height: 37,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              marginTop: 30,
            }}
            onPress={() => {
              navigator.navigate('ride');
            }}>
            <Text style={{color: 'black', fontSize: 14}}>
              View Ride History
            </Text>
          </TouchableOpacity>
        </View>
      );
    };
    const earningsList = () => {
      return (
        <View
          style={{
            //   backgroundColor: 'pink',
            //   height: '9%',
            width: '95%',
            alignSelf: 'center',
            marginTop: 20,
            // borderWidth: 1,
            borderRadius: 15,
            height: '15%',
            //   padding: 5,
            justifyContent: 'center',
            backgroundColor: '#f8f9fa',
            elevation: 3,
            // alignItems: 'center',
          }}>
          <View
            style={{
              alignSelf: 'center',
              width: '95%',
              height: '90%',
              // backgroundColor: 'red',
              justifyContent: 'space-between',
            }}>
            <View
              style={
                {
                  // alignSelf: 'flex-start',
                }
              }>
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  left: 10,
                  fontWeight: '300',
                }}>
                Earned
              </Text>
              <View
                style={{
                  // left: 200,
                  flexDirection: 'row',
                  // backgroundColor: 'pink',
                  alignItems: 'center',
                  left: 10,
                }}>
                <Pound />
                <Text
                  style={{
                    marginLeft: 5,
                    fontSize: 15,
                    fontWeight: '600',
                    color: AppColours.Dark,
                  }}>
                  {/* 200.00 */}
                  {totalEarning == 0 ? (
                    <Text>{totalEarning}.00</Text>
                  ) : (
                    <Text>{totalEarning}</Text>
                  )}
                </Text>
              </View>
            </View>
            {}
            <HorizontalDivider />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                alignSelf: 'center',
              }}>
              <View>
                <Text style={{color: 'black', fontWeight: '300', fontSize: 10}}>
                  Time Online
                </Text>
                <Text style={{color: 'black', fontWeight: '600', fontSize: 12}}>
                  {/* 8h 10m */}
                  {onlineTime}
                </Text>
              </View>
              <View>
                <Text style={{color: 'black', fontWeight: '300', fontSize: 10}}>
                  Total Distance
                </Text>
                {distanceCovered ? (
                  <Text
                    style={{color: 'black', fontWeight: '600', fontSize: 12}}>
                    {distanceCovered.toFixed(2)}miles
                  </Text>
                ) : (
                  <Text
                    style={{color: 'black', fontWeight: '600', fontSize: 12}}>
                    0 miles
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      );
    };
    const onGoingTrip = () => {
      const myProfile = () => {
        return (
          <View
            style={{
              // backgroundColor:'red',
              flexDirection: 'row',
              width: '35%',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '38%',
                height: '80%',
                // backgroundColor: 'grey',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
                borderWidth: 2.5,
                borderColor: AppColours.AppLogoColor,
              }}>
              <Icon name="account" size={30} color="#212529" />
            </View>
            <View
              style={{
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  // fontSize: 18,
                  fontWeight: 'bold',
                  color: AppColours.AppBackGroundDefalut,
                }}>
                {user ? user?.displayName : 'Rider Profile'}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Icon name="star" size={22} color="#6ABABD" />
                <Text
                  style={{
                    // fontSize: 15,
                    fontWeight: 'bold',
                    color: AppColours.AppBackGroundDefalut,
                  }}>
                  {/* {userData? userData?.ratings :'4.9'} */}
                  4.9
                </Text>
              </View>
            </View>
          </View>
        );
      };
      return (
        <View
          style={{
            // backgroundColor: 'pink',
            //   height: '9%',
            width: '95%',
            alignSelf: 'center',
            marginTop: 20,
            borderWidth: 1,
            borderRadius: 15,
            height: '22%',
            //   padding: 5,
            justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <View
            style={{
              alignSelf: 'center',
              width: '95%',
              height: '90%',
              // backgroundColor: 'red',
              // justifyContent: 'space-between',
            }}>
            <View
              style={
                {
                  // alignSelf: 'flex-start',
                }
              }>
              <Text style={{color: 'black', fontSize: 10, fontWeight: '300'}}>
                On Going Trip
              </Text>
              {/* <Text style={{color: 'black', fontSize: 15, fontWeight: '600'}}>
                $200
              </Text> */}
              <View
                style={{
                  // left: 200,
                  flexDirection: 'row',
                  // backgroundColor: 'pink',
                  alignItems: 'center',
                }}>
                <Pound />
                <Text
                  style={{
                    marginLeft: 5,
                    fontSize: 15,
                    fontWeight: '600',
                    color: AppColours.Dark,
                  }}>
                  {/* & 20.00 */}
                  200.00
                </Text>
              </View>
              <View style={{backgroundColor: 'transparent', height: 15}} />
              <HorizontalDivider />
            </View>
            {/* <View style={{backgroundColor: 'transparent', height: 15}} /> */}

            <View style={{justifyContent: 'space-between'}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {myProfile()}
                <View
                  style={{
                    // backgroundColor: 'red',
                    flexDirection: 'column-reverse',
                    height: '80%',
                  }}>
                  <Text style={{fontWeight: '300'}}>05:00pm</Text>
                </View>
              </View>

              <View
                style={{
                  // backgroundColor: 'pink',
                  width: '90%',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setProfileModal(false);
                    setChatModal(true);
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Entypo
                      name="chat"
                      color={AppColours.AppLogoColor}
                      size={20}
                      style={{alignSelf: 'center'}}
                    />
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: AppColours.AppBackGroundDefalut,
                      }}>
                      Chat
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialIcons
                      name="call"
                      color={AppColours.AppLogoColor}
                      size={20}
                      style={{alignSelf: 'center'}}
                    />
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: AppColours.AppBackGroundDefalut,
                      }}>
                      Call
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Entypo
                      name="cross"
                      color={AppColours.AppLogoColor}
                      size={20}
                      style={{alignSelf: 'center'}}
                    />
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: AppColours.AppBackGroundDefalut,
                      }}>
                      Cancel
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    };
    const notifications = () => {
      const messagesBar = () => {
        return (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: 40,
                height: 40,
                // backgroundColor: 'grey',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
                borderWidth: 2.5,
                borderColor: AppColours.AppLogoColor,
              }}>
              <Icon name="account" size={30} color="#212529" />
            </View>

            <View
              style={{
                // backgroundColor: 'pink',
                alignSelf: 'center',
                width: '70%',
              }}>
              <Text style={{color: 'black', fontSize: 15, left: 10}}>
                i am waiting
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={{color: 'black', fontSize: 10, fontWeight: '600'}}>
                23 mins ago
              </Text>
            </View>
          </View>
        );
      };
      return (
        <>
          <View style={{marginTop: 10, width: '95%', alignSelf: 'center'}}>
            {/*
            <Text style={{fontWeight: 'bold', color: AppColours.Dark}}>
              Notifications
            </Text>
          </View>
          <View
            style={{
              //   backgroundColor: 'pink',
              //   height: '9%',
              width: '95%',
              alignSelf: 'center',
              marginTop: 10,
              borderWidth: 1,
              borderRadius: 15,
              height: '14%',
              justifyContent: 'center',
            }}>
            <View
              style={{
                alignSelf: 'center',
                width: '95%',
                height: '90%',
                // backgroundColor: 'red',
                justifyContent: 'space-between',
              }}>
              {messagesBar()}
              <HorizontalDivider />
              {messagesBar()}
            </View>
            {/* <View style={{height: 10, backgroundColor: 'transparent'}} /> */}
          </View>
        </>
      );
    };
    const tripHistory = () => {
      return (
        <>
          <View style={{marginTop: 10, width: '95%', alignSelf: 'center'}}>
            <Text style={{fontWeight: 'bold', color: AppColours.Dark}}>
              Trip History
            </Text>
            <Text
              style={{fontWeight: '400', fontSize: 9, color: AppColours.Dark}}>
              05:00pm-06:15pm
            </Text>
          </View>
          <View
            style={{
              //   backgroundColor: 'pink',
              //   height: '9%',
              width: '95%',
              alignSelf: 'center',
              // marginTop: 10,
              // borderWidth: 1,
              // borderRadius: 15,
              height: '20%',
            }}>
            <MapView
              ref={mapRef1}
              style={{height: '50%', width: '100%'}}
              initialRegion={pp}
              scrollEnabled={false}
              zoomEnabled={false}>
              <Marker coordinate={pp} />
              <Marker coordinate={dp} />
              <MapViewDirections
                origin={pp}
                destination={dp}
                apikey={'AIzaSyAXY0KXAGloxJe_eB22yrq_USUpT9lXezk'}
                strokeWidth={3}
                strokeColor="#193B69"
                optimizeWaypoints={true}
                onReady={result => {
                  mapRef1.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: 50, // Adjust these values to fit the markers comfortably
                      bottom: -100,
                      left: 50,
                      top: -100,
                    },
                  });
                }}
                onError={errorMessage => {
                  console.log('GOT AN ERROR IN MAPS=>>', errorMessage);
                }}
              />
            </MapView>
            <View style={{justifyContent: 'space-between'}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View
                  style={{
                    // backgroundColor:'red',
                    flexDirection: 'row',
                    width: '40%',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      width: '30%',
                      height: '90%',
                      // backgroundColor: 'grey',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 50,
                      borderWidth: 2.5,
                      borderColor: AppColours.AppLogoColor,
                    }}>
                    <Icon name="account" size={30} color="#212529" />
                  </View>
                  <View
                    style={{
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: AppColours.Dark,
                      }}>
                      {user ? user?.displayName : 'John Davis'}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Icon name="star" size={22} color="#6ABABD" />
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: AppColours.Dark,
                        }}>
                        4.9
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    alignSelf: 'flex-end',
                  }}>
                  <Text
                    style={{color: 'black', fontSize: 10, fontWeight: '300'}}>
                    Trip Total
                  </Text>
                  <View
                    style={{
                      // left: 200,
                      flexDirection: 'row',
                      // backgroundColor: 'pink',
                      alignItems: 'center',
                    }}>
                    <Pound />
                    <Text
                      style={{
                        marginLeft: 5,
                        fontSize: 15,
                        fontWeight: '600',
                        color: AppColours.Dark,
                      }}>
                      {/* & 20.00 */}
                      200.00
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </>
      );
    };
    return (
      <Modal visible={profileModal} transparent animationType="slide">
        <View
          style={{
            backgroundColor: 'white',
            height: '100%',
          }}>
          {headers()}
          {earningsList()}
          {rides()}
          {/*onGoingTrip()*/}
          {notifications()}
          {/*tripHistory()*/}
        </View>
      </Modal>
    );
  };
  const chatModalView = () => {
    const header = () => {
      const myProfile = () => {
        return (
          <View
            style={{
              // backgroundColor:'red',
              flexDirection: 'row',
              width: '50%',
              justifyContent: 'space-evenly',
            }}>
            <View
              style={{
                width: 80,
                height: 80,
                backgroundColor: 'grey',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
                borderWidth: 2.5,
                borderColor: AppColours.AppLogoColor,
              }}>
              <Icon name="account" size={30} color="black" />
            </View>
            <View
              style={{
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: AppColours.AppBackGroundDefalut,
                }}>
                John Davis
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Icon name="star" size={22} color="white" />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: AppColours.AppBackGroundDefalut,
                  }}>
                  4.9
                </Text>
              </View>
            </View>
          </View>
        );
      };
      const rideStatus = () => {
        return (
          <View
            style={{
              // backgroundColor: 'red',
              height: '8%',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                backgroundColor: '#E9E9E9',
                height: '50%',
                width: '85%',
                alignSelf: 'center',
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>Arrived</Text>
            </View>
          </View>
        );
      };
      return (
        <>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: AppColours.AppLogoColor,
              height: '15%',
              justifyContent: 'space-evenly',
            }}>
            {myProfile()}
            <Ionicons
              name="chevron-down-sharp"
              size={25}
              color={'black'}
              style={{
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 100,
              }}
              onPress={() => {
                setChatModal(false);
              }}
            />
          </View>
          <View
            style={{
              height: '3%',
              // backgroundColor: 'red',
              justifyContent: 'flex-end',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: AppColours.AppBackGroundDefalut,
                textAlign: 'center',
              }}>
              Today 05:00pm
            </Text>
          </View>
          {rideStatus()}
        </>
      );
    };
    const conversationBody = () => {
      return (
        <View
          style={{
            // backgroundColor:'pink',
            height: '70%',
          }}>
          <ScrollView>
            <View>
              <Text>Msgs would be Displayed here</Text>
            </View>
          </ScrollView>
        </View>
      );
    };
    return (
      <Modal visible={chatModal} transparent animationType="slide">
        <View style={{height: '100%', backgroundColor: 'white'}}>
          {header()}
          {conversationBody()}
        </View>
      </Modal>
    );
  };
  const rideModalView = () => {
    return (
      <Modal visible={modalVisible} transparent animationType="slide">
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 80, //80
            // backgroundColor: 'rgba(0, 0, 0, 0.5)',
            height: '73%',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              // padding: 20,
              width: '100%',
              height: '100%',
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              justifyContent: 'center',
              elevation: 10,
            }}>
            <View
              style={{
                // backgroundColor: 'pink',
                height: '90%',
                width: '100%',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  borderBottomWidth: 1,
                  padding: 15,
                  flexDirection: 'row',
                  // backgroundColor: 'red',
                  justifyContent: 'space-evenly',
                  // width: '70%',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      backgroundColor: 'yellow',
                      padding: 30,
                      borderRadius: 100,
                      alignSelf: 'center',
                      borderWidth: 4,
                      borderColor: AppColours.AppLogoColor,
                    }}
                  />
                  <View
                    style={{justifyContent: 'center', paddingHorizontal: 10}}>
                    <Text style={{color: AppColours.AppBackGroundDefalut}}>
                      {rideData?.passenger?.name}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <AntDesign
                        name="star"
                        size={20}
                        color={AppColours.AppLogoColor}
                        style={{paddingHorizontal: 10}}
                      />
                      <Text style={{color: AppColours.AppBackGroundDefalut}}>
                        4.8
                      </Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                  }}
                  onPress={() => {
                    setModalVisible(false);
                  }}>
                  <MaterialIcons
                    name="cancel"
                    size={20}
                    color={'black'}
                    style={{
                      // alignSelf: 'center',
                      backgroundColor: '#eee',
                      borderRadius: 100,
                      // position:'relative',
                      // top:0,
                      // bottom:0,
                      // left:"70%",
                      // right:0
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  // backgroundColor: 'pink',
                  width: '90%',
                  alignSelf: 'center',
                  paddingVertical: 15,
                }}>
                <View
                  style={{
                    // backgroundColor: 'red',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Ionicons
                      name="square-sharp"
                      color={AppColours.AppBackGroundDefalut}
                      style={{alignSelf: 'center', paddingRight: 10}}
                    />
                    <View style={{}}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: AppColours.AppBackGroundDefalut,
                        }}>
                        {/* 3..3 miles */}
                        {rideData?.estimatedDistance.toString().slice(3)} miles
                      </Text>
                    </View>
                    <View
                      style={{
                        left: 200,
                        flexDirection: 'row',
                        // backgroundColor: 'pink',
                        alignItems: 'center',
                      }}>
                      <Pound />
                      <Text
                        style={{
                          marginLeft: 5,
                          fontWeight: 'bold',
                          color: AppColours.AppBackGroundDefalut,
                        }}>
                        {/* & 20.00 */}
                        {rideData?.cost}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Ionicons
                    color={AppColours.AppBackGroundDefalut}
                    name="square-sharp"
                    style={{alignSelf: 'center', paddingRight: 10}}
                  />
                  <View>
                    <Text
                      style={{
                        fontWeight: '300',
                        color: AppColours.AppBackGroundDefalut,
                      }}>
                      Estimated time to reach pickup location
                    </Text>
                    <Text
                      style={{
                        fontWeight: '300',
                        color: AppColours.AppBackGroundDefalut,
                      }}>
                      {duration} min
                    </Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Ionicons
                    color={AppColours.AppBackGroundDefalut}
                    name="square-sharp"
                    style={{alignSelf: 'center', paddingRight: 10}}
                  />
                  <View>
                    <Text
                      style={{
                        fontWeight: '300',
                        color: AppColours.AppBackGroundDefalut,
                      }}>
                      Address
                    </Text>
                    <Text style={{fontWeight: '700', color: AppColours.Dark}}>
                      {/* {pickName} */}
                      {rideData?.origin.address}
                    </Text>
                  </View>
                </View>
                <View style={{paddingLeft: 22}}>
                  {stops && stops.length > 0 ? (
                    stops.map((stop, index) => (
                      <View key={index} style={{flexDirection: 'column'}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: 'red',
                          }}>
                          Stop {index + 1}
                        </Text>
                        <Text style={{color: AppColours.AppBackGroundDefalut}}>
                          {stop.address}
                        </Text>
                      </View>
                    ))
                  ) : (
                    <Text></Text>
                  )}
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Ionicons
                    color={AppColours.Dark}
                    name="md-location"
                    style={{alignSelf: 'center', paddingRight: 10}}
                  />
                  <View>
                    <Text
                      style={{
                        fontWeight: '300',
                        color: AppColours.AppBackGroundDefalut,
                      }}>
                      Drop off location
                    </Text>
                    <Text style={{fontWeight: '700', color: AppColours.Dark}}>
                      {/* {dropName} */}
                      {rideData?.destination?.address}
                    </Text>
                  </View>
                </View>
              </View>

              {/* <View
                style={{
                  marginBottom: 20,
                  height: 100,
                  backgroundColor: AppColours.AppBackGroundDefalut,
                  width: 100,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: '90%',
                      width: '90%',
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>00:{duration}</Text>
                  </View>
                </View>
                 */}

              {!rideStatus ? (
                <>
                  <View style={{alignSelf: 'center'}}>
                    <CountdownCircleTimer
                      isPlaying
                      size={100}
                      strokeWidth={7}
                      duration={60}
                      colors={AppColours.AppBackGroundDefalut}
                      onComplete={async () => {
                        const eventData = {
                          email: user.email,
                          id: rideData?.docId,
                          flag: 'requestTimeout',
                        };
                        console.log(eventData);
                        await rideTimeout(eventData);
                        setModalVisible(false);
                      }}>
                      {({remainingTime}) => (
                        <Text
                          style={{
                            fontSize: 29,
                            fontWeight: 'bold',
                            color: AppColours.Dark,
                          }}>
                          {remainingTime}
                        </Text>
                      )}
                    </CountdownCircleTimer>
                  </View>
                  <Text
                    style={{
                      alignSelf: 'center',
                      //  top: 10
                    }}></Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      top: -20,
                    }}>
                    <>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#00BB13',
                          width: 70,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 100,
                        }}
                        onPress={async () => {
                          setModalVisibleAccept(true);
                          setDuration(0);
                          //setRiderLoc(originpoint)
                          // setCurrentLoc(originpoint)

                          const eventData = {
                            id: rideData?.docId,
                            flag: 'driverAssigned',
                          };
                          console.log('event data for accept', eventData);
                          await rideProgress(eventData);
                          setModalVisible(false);
                        }}>
                        <Text style={{color: AppColours.color_0_white_base}}>
                          Accept
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#E50B0B',
                          width: 70,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 100,
                        }}
                        onPress={async () => {
                          const eventData = {
                            email: user.email,
                            id: rideData?.docId,
                            flag: 'cancelledByDriver',
                          };
                          console.log(eventData);
                          await rideComplete(eventData);
                          setModalVisible(false);
                          setDeclineModal(true);
                        }}>
                        <Text style={{color: AppColours.color_0_white_base}}>
                          Decline
                        </Text>
                      </TouchableOpacity>
                    </>
                  </View>
                </>
              ) : (
                <>
                  <Text
                    style={{
                      alignSelf: 'center',
                      //  top: 10
                    }}></Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      top: -20,
                    }}>
                    <>
                      <View
                        style={{
                          // backgroundColor: 'pink',
                          width: '90%',
                          alignSelf: 'center',
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            setProfileModal(false);
                            setChatModal(true);
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Entypo
                              name="chat"
                              color={AppColours.AppLogoColor}
                              size={20}
                              style={{alignSelf: 'center'}}
                            />
                            <Text
                              style={{
                                fontWeight: 'bold',
                                color: AppColours.AppBackGroundDefalut,
                              }}>
                              Chat
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <MaterialIcons
                              name="call"
                              color={AppColours.AppLogoColor}
                              size={20}
                              style={{alignSelf: 'center'}}
                            />
                            <Text
                              style={{
                                fontWeight: 'bold',
                                color: AppColours.AppBackGroundDefalut,
                              }}>
                              Call
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </>
                  </View>
                  <View
                    style={{
                      alignSelf: 'center',
                      backgroundColor: AppColours.AppLogoColor,
                      width: 100,
                      alignItems: 'center',
                      borderRadius: 100,
                    }}
                    onPress={() => {}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: AppColours.color_0_white_base,
                      }}>
                      Arrived
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const rideModalAccept = () => {
    return (
      <Modal visible={modalVisibleAccept} transparent animationType="slide">
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 80, //80
            // backgroundColor: 'rgba(0, 0, 0, 0.5)',
            height: '43%',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              // padding: 20,
              width: '100%',
              height: '100%',
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              justifyContent: 'center',
              elevation: 10,
            }}>
            <View
              style={{
                // backgroundColor: 'pink',
                height: '90%',
                width: '100%',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  borderBottomWidth: 1,
                  padding: 15,
                  flexDirection: 'row',
                  // backgroundColor: 'red',
                  justifyContent: 'space-evenly',
                  // width: '70%',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      backgroundColor: 'yellow',
                      padding: 30,
                      borderRadius: 100,
                      alignSelf: 'center',
                      borderWidth: 4,
                      borderColor: AppColours.AppLogoColor,
                    }}
                  />
                  <View
                    style={{justifyContent: 'center', paddingHorizontal: 10}}>
                    <Text style={{color: AppColours.AppBackGroundDefalut}}>
                      {/* John Davis */}
                      {rideData?.passenger?.name}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <AntDesign
                        name="star"
                        size={20}
                        color={AppColours.AppLogoColor}
                        style={{paddingHorizontal: 10}}
                      />
                      <Text style={{color: AppColours.AppBackGroundDefalut}}>
                        4.8
                      </Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                  }}
                  onPress={() => {
                    setModalVisibleAccept(false);
                  }}>
                  <Ionicons
                    name="arrow-down-sharp"
                    size={20}
                    color={'black'}
                    style={{
                      // alignSelf: 'center',
                      backgroundColor: '#eee',
                      borderRadius: 100,
                      // position:'relative',
                      // top:0,
                      // bottom:0,
                      // left:"70%",
                      // right:0
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  // backgroundColor: 'pink',
                  width: '90%',
                  alignSelf: 'center',
                  paddingVertical: 15,
                }}>
                <View
                  style={{
                    // backgroundColor: 'red',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Ionicons
                      name="square-sharp"
                      color={AppColours.AppBackGroundDefalut}
                      style={{alignSelf: 'center', paddingRight: 10}}
                    />
                    <View style={{}}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: AppColours.AppBackGroundDefalut,
                        }}>
                        {/* 3..3 miles */}
                        {rideData?.estimatedDistance.toString().slice(3)} miles
                      </Text>
                    </View>
                    <View
                      style={{
                        left: 200,
                        flexDirection: 'row',
                        // backgroundColor: 'pink',
                        alignItems: 'center',
                      }}>
                      <Pound />
                      <Text
                        style={{
                          marginLeft: 5,
                          fontWeight: 'bold',
                          color: AppColours.AppBackGroundDefalut,
                        }}>
                        {/* & 20.00 */}
                        {rideData?.cost}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Ionicons
                    color={AppColours.AppBackGroundDefalut}
                    name="square-sharp"
                    style={{alignSelf: 'center', paddingRight: 10}}
                  />
                  <View>
                    <Text
                      style={{
                        fontWeight: '300',
                        color: AppColours.AppBackGroundDefalut,
                      }}>
                      Estimated time to reach pickup location
                    </Text>
                    <Text
                      style={{
                        fontWeight: '300',
                        color: AppColours.AppBackGroundDefalut,
                      }}>
                      {/* {duration} min */}
                      60 mins
                    </Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Ionicons
                    color={AppColours.AppBackGroundDefalut}
                    name="square-sharp"
                    style={{alignSelf: 'center', paddingRight: 10}}
                  />
                  <View>
                    <Text
                      style={{
                        fontWeight: '300',
                        color: AppColours.AppBackGroundDefalut,
                      }}>
                      Address
                    </Text>
                    <Text style={{fontWeight: '700', color: AppColours.Dark}}>
                      {rideData?.origin.address}
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Ionicons
                    color={AppColours.Dark}
                    name="md-location"
                    style={{alignSelf: 'center', paddingRight: 10}}
                  />
                  <View>
                    <Text
                      style={{
                        fontWeight: '300',
                        color: AppColours.AppBackGroundDefalut,
                      }}>
                      Drop off location
                    </Text>
                    <Text style={{fontWeight: '700', color: AppColours.Dark}}>
                      {rideData?.destination?.address}
                    </Text>
                  </View>
                </View>
              </View>

              {/* <View
                style={{
                  marginBottom: 20,
                  height: 100,
                  backgroundColor: AppColours.AppBackGroundDefalut,
                  width: 100,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: '90%',
                      width: '90%',
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>00:{duration}</Text>
                  </View>
                </View>
                 */}

              <>
                <Text
                  style={{
                    alignSelf: 'center',
                    //  top: 10
                  }}></Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    top: -20,
                  }}>
                  <>
                    <View
                      style={{
                        // backgroundColor: 'pink',
                        width: '90%',
                        alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          setProfileModal(false);
                          setChatModal(true);
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Entypo
                            name="chat"
                            color={AppColours.AppLogoColor}
                            size={20}
                            style={{alignSelf: 'center'}}
                          />
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: AppColours.AppBackGroundDefalut,
                            }}>
                            Chat
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <MaterialIcons
                            name="call"
                            color={AppColours.AppLogoColor}
                            size={20}
                            style={{alignSelf: 'center'}}
                          />
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: AppColours.AppBackGroundDefalut,
                            }}>
                            Call
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </>
                </View>
                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                    backgroundColor: AppColours.AppLogoColor,
                    width: 100,
                    alignItems: 'center',
                    borderRadius: 100,
                  }}
                  onPress={async () => {
                    //setRiderLoc(destinationpoint)
                    // setCurrentLoc(originpoint);

                    const eventData = {
                      email: user.email,
                      id: rideData?.docId,
                      flag: 'inProgress',
                    };
                    console.log(eventData);

                    await rideProgress(eventData);
                    setModalVisibleAccept(false);
                    setModalOngoing(true);
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: AppColours.color_0_white_base,
                    }}>
                    Arrived
                  </Text>
                </TouchableOpacity>
              </>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const rideModalOngoing = () => {
    const [rideState, setRideState] = useState([
      'Start Ride',
      'Ride Completed',
    ]);
    const [buttonText, setButtonText] = useState(rideState[0]);
    const [count, setCount] = useState(0);
    const meterHeaders = () => {
      return (
        <>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'space-between',
              // backgroundColor: 'pink',
              width: '80%',
              alignSelf: 'center',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <AntDesign
              name="plus"
              size={30}
              color={AppColours.AppBackGroundDefalut}
              style={{paddingHorizontal: 10}}
            />
            <View style={{flexDirection: 'row'}}>
              <Foundation
                name="pound"
                size={60}
                color="#212529"
                style={
                  {
                    // top:10
                  }
                }
              />
              <Text style={{fontSize: 45, color: 'black', fontWeight: 'bold'}}>
                {meterReading}
              </Text>
            </View>
            <AntDesign
              name="pause"
              size={30}
              color={AppColours.AppBackGroundDefalut}
              style={{paddingHorizontal: 10}}
            />
          </View>
        </>
      );
    };
    const distanceView = () => {
      return (
        <View
          style={{
            backgroundColor: '#D9D9D9',
            height: 60,
            alignSelf: 'center',
            justifyContent: 'center',
            width: '65%',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontWeight: '700'}}>
            DISTANCE: {(distance / 1609.34).toFixed(2)} Miles
          </Text>
        </View>
      );
    };
    const meterLogs = () => {
      const extrasView = () => {
        return (
          <>
            <Text style={{fontWeight: '400', color: 'black'}}>Extras</Text>
            <HorizontalDivider />
            <Text style={{fontWeight: 'bold', color: 'black'}}>{extras}</Text>
          </>
        );
      };
      const waitView = () => {
        return (
          <>
            <Text style={{fontWeight: '400', color: 'black'}}>Wait</Text>
            <HorizontalDivider />
            <Text style={{fontWeight: 'bold', color: 'black'}}>{wait}</Text>
          </>
        );
      };
      const elapsedView = () => {
        return (
          <>
            <Text style={{fontWeight: '400', color: 'black'}}>Elapsed</Text>
            <HorizontalDivider />
            <Text style={{fontWeight: 'bold', color: 'black'}}>{elapsed}</Text>
          </>
        );
      };
      return (
        <View
          style={{
            // backgroundColor: 'red',
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View>{extrasView()}</View>
          <View>{waitView()}</View>
          <View>{elapsedView()}</View>
        </View>
      );
    };
    const stopRide = () => {
      return (
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            backgroundColor: AppColours.AppLogoColor,
            width: '25%',
            alignItems: 'center',
            borderRadius: 100,
          }}
          onPress={() => {
            //  setCurrentLoc(originpoint)
            setIsTracking(false);
            refRBSheet.current.close();
            setRideOngoingFlag(false);
            //setCurrentLoc(destinationpoint)
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Stop ride</Text>
        </TouchableOpacity>
      );
    };
    return (
      <Modal visible={modalOngoing} transparent animationType="slide">
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 80, //80
            // backgroundColor: 'rgba(0, 0, 0, 0.5)',
            height: '28%',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              // padding: 20,
              width: '100%',
              height: '100%',
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              justifyContent: 'center',
              elevation: 10,
            }}>
            <View
              style={{
                // backgroundColor: 'pink',
                height: '90%',
                width: '100%',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  borderBottomWidth: 1,
                  padding: 15,
                  flexDirection: 'row',
                  // backgroundColor: 'red',
                  justifyContent: 'space-evenly',
                  // width: '70%',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      backgroundColor: 'yellow',
                      padding: 30,
                      borderRadius: 100,
                      alignSelf: 'center',
                      borderWidth: 4,
                      borderColor: AppColours.AppLogoColor,
                    }}
                  />
                  <View
                    style={{justifyContent: 'center', paddingHorizontal: 10}}>
                    <Text style={{color: AppColours.AppBackGroundDefalut}}>
                      {/* John Davis */}
                      {rideData?.passenger?.name}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <AntDesign
                        name="star"
                        size={20}
                        color={AppColours.AppLogoColor}
                        style={{paddingHorizontal: 10}}
                      />
                      <Text style={{color: AppColours.AppBackGroundDefalut}}>
                        4.8
                      </Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                  }}
                  onPress={() => {
                    setModalOngoing(false);
                  }}>
                  <Ionicons
                    name="arrow-down-sharp"
                    size={20}
                    color={'black'}
                    style={{
                      // alignSelf: 'center',
                      backgroundColor: '#eee',
                      borderRadius: 100,
                      // position:'relative',
                      // top:0,
                      // bottom:0,
                      // left:"70%",
                      // right:0
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  // backgroundColor: 'pink',
                  width: '90%',
                  alignSelf: 'center',
                  paddingVertical: 15,
                }}>
                <View
                  style={{
                    // backgroundColor: 'red',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Ionicons
                      name="md-location"
                      color={AppColours.AppBackGroundDefalut}
                      style={{alignSelf: 'center', paddingRight: 10}}
                    />
                    <View style={{}}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: AppColours.AppBackGroundDefalut,
                        }}>
                        {rideData?.estimatedDistance.toString().slice(3)} miles
                      </Text>
                    </View>
                    <View
                      style={{
                        left: 200,
                        flexDirection: 'row',
                        // backgroundColor: 'pink',
                        alignItems: 'center',
                      }}>
                      <Pound />
                      <Text
                        style={{
                          marginLeft: 5,
                          fontWeight: 'bold',
                          color: AppColours.AppBackGroundDefalut,
                        }}>
                        {/* & 20.00 */}
                        {rideData?.cost}
                      </Text>
                    </View>
                  </View>
                </View>

  
                <View style={{flexDirection: 'row', paddingLeft: 20}}>
                  {/* <Ionicons
                    color={AppColours.Dark}
                    name="md-location"
                    style={{ alignSelf: 'center', paddingRight: 10 }} /> */}

                  <View>
                    <Text
                      style={{
                        fontWeight: '300',
                        color: AppColours.AppBackGroundDefalut,
                      }}>
                      Drop off location
                    </Text>
                    <Text style={{fontWeight: '700', color: AppColours.Dark}}>
                      {rideData?.destination?.address}
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  backgroundColor: AppColours.AppLogoColor,
                  // width: 100,
                  padding: 3,
                  alignItems: 'center',
                  borderRadius: 100,
                }}
                onPress={async () => {
                  // setModalVisibleAccept(false)
                  if (count == 0) {
                    setButtonText(rideState[1]);
                    setCount(1);

                    const eventData = {
                      email: user.email,
                      id: rideData?.docId,
                      flag: 'In Progress',
                    };
                    console.log(eventData);

                    await rideProgress(eventData);
                    // refRBSheet.current.open();
                    setStartLocation(originpoint ? originpoint : null);
                    setPrevLocation(currentLoc);
                    setIsTracking(true);
                    setDistanceMeter(0);
                  } else if (count == 1) {
                    console.log(count);

                    const eventData = {
                      email: user.email,
                      id: rideData?.docId,
                      flag: 'complete',
                    };
                    console.log(eventData);

                    await rideComplete(eventData);
                    setButtonText(rideState[0]);
                    // setCurrentLoc(destinationpoint)

                    ToastAndroid.showWithGravity(
                      'Ride Completed',
                      ToastAndroid.SHORT,
                      ToastAndroid.CENTER,
                    );
                    setModalOngoing(false);
                    setCount(0);
                  }
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: AppColours.color_0_white_base,
                  }}>
                  {buttonText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <RBSheet
          ref={refRBSheet}
          closeOnPressMask={false}
          // closeOnDragDown={true}
          closeOnDragDown={false}
          height={350}
          openDuration={250}
          customStyles={{
            container: {
              justifyContent: 'space-around',
              // alignItems: 'center',
            },
          }}>
          {meterHeaders()}
          {distanceView()}
          {meterLogs()}
          {stopRide()}
        </RBSheet>
      </Modal>
    );
  };
  const degToRad = deg => {
    //for meter
    return (deg * Math.PI) / 180;
  };

  const calculateDistance = (prevLocation, newLocation) => {
    //distance for meter
    const earthRadius = 6371e3; // meters
    const dLat = degToRad(newLocation.latitude - prevLocation.latitude);
    const dLon = degToRad(newLocation.longitude - prevLocation.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(prevLocation.latitude)) *
        Math.cos(degToRad(newLocation.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
  };

  const declineModalView = () => {
    return (
      <Modal visible={declineModal} transparent animationType="slide">
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 80,
            // backgroundColor: 'rgba(0, 0, 0, 0.5)',
            height: '50%',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              // padding: 20,
              width: '100%',
              height: '100%',
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              // justifyContent: 'center',
              elevation: 10,
            }}>
            <View>
              <View
                style={{
                  padding: 30,
                  // backgroundColor: 'red',
                  width: '60%',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: AppColours.AppBackGroundDefalut,
                  }}>
                  Select reason to decline
                </Text>
              </View>
              <View style={{alignItems: 'center', top: 50}}>
                <TouchableOpacity
                  onPress={() => handleViewPress(0)}
                  style={{
                    width: '80%',
                    backgroundColor:
                      selectedView === 0 ? AppColours.AppLogoColor : '#E9E9E9',
                    marginBottom: 10,
                    borderRadius: 10,
                  }}>
                  <Text style={{textAlign: 'center'}}>
                    Too far from my location
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleViewPress(1)}
                  style={{
                    width: '80%',
                    backgroundColor:
                      selectedView === 1 ? AppColours.AppLogoColor : '#E9E9E9',
                    marginBottom: 10,
                    borderRadius: 10,
                  }}>
                  <Text style={{textAlign: 'center'}}>
                    I do not want a ride anymore
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleViewPress(2)}
                  style={{
                    width: '80%',
                    backgroundColor:
                      selectedView === 2 ? AppColours.AppLogoColor : '#E9E9E9',
                    marginBottom: 10,
                    borderRadius: 10,
                  }}>
                  <Text style={{textAlign: 'center'}}>
                    The rider is taking more time than expected
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: '80%',
                  top: 70,
                  alignSelf: 'center',
                  height: '35%',
                  backgroundColor: '#E9E9E9',
                  width: '80%',
                  height: '30%',
                }}>
                <TextInput
                  multiline={true}
                  placeholder="Write here"
                  style={{}}
                />
              </View>

              <View style={{alignSelf: 'center', width: '20%', height: '10%'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: AppColours.AppLogoColor,
                    top: 80,
                    borderRadius: 100,
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                  }}
                  onPress={() => setDeclineModal(false)}>
                  <Text style={{textAlign: 'center', color: 'white'}}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const statsModalView = () => {
    const Box1 = () => {
      const [balance, setbalance] = useState(150);

      return (
        <View
          style={{
            flexDirection: 'column',
            width: '90%',
            marginLeft: 20,
            borderRadius: 13,
            //borderColor: 'black',
            //borderWidth: 1,
            marginTop: 10,
            //width: 150,
            // top: 70,
            // alignSelf: 'center',
            //height: 27,

            backgroundColor: '#f8f9fa',
            elevation: 3,
            // borderRadius:9
          }}>
          <View
            style={{
              //backgroundColor:'blue',
              flexDirection: 'column',
              paddingHorizontal: 13,
              paddingVertical: 10,
            }}>
            <Text
              style={{color: AppColours.AppBackGroundDefalut, fontSize: 15}}>
              Earned Today
            </Text>
            <View
              style={{
                // left: 200,
                flexDirection: 'row',
                // backgroundColor: 'pink',
                alignItems: 'center',

                marginBottom: 10,
              }}>
              <Pound />
              {earnedtoday == 0 ? (
                <Text
                  style={{color: 'black', fontWeight: 'bold', marginLeft: 5}}>
                  {earnedtoday}.toFixed(2)
                </Text>
              ) : (
                <Text
                  style={{color: 'black', fontWeight: 'bold', marginLeft: 5}}>
                  0.00
                </Text>
              )}
            </View>
          </View>
        </View>
      );
    };

    const Buttons = () => {
      const [showGrayBox, setShowGrayBox] = useState(false);
      const data = [
        'Last 7 Days',
        'Last 28 Days',
        'Last 90 Days',
        'This Week',
        'This month',
        'This year',
        'Custom',
      ];

      const handleShowGrayBox = () => {
        setShowGrayBox(!showGrayBox);
      };

      return (
        <View
          style={{
            flexDirection: 'row',
            //backgroundColor:'pink',
            justifyContent: 'space-around',
            marginTop: 10,
          }}>
          {showGrayBox && (
            <View
              style={{
                marginTop: 50,
                position: 'absolute',
                width: '65%',
                height: 200,
                borderRadius: 4,
                // backgroundColor: '#ced4da',
                //borderWidth: 1,
                //paddingVertical: 5,
                // borderColor: 'black',
                // flexDirection: 'row',
                zIndex: 1,
              }}>
              <Calendar
                onDayPress={day => {
                  // console.log("data",day)
                  console.log(
                    'selected day',
                    day.day + '-' + day.month + '-' + day.year,
                  );
                  setDate(day.day + '-' + day.month + '-' + day.year);
                }}
              />
            </View>
          )}
          {/*
           <TouchableOpacity
            style={{
              backgroundColor: '#6ABABD',
              width: 135,
              height: 37,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}>
            <Text style={{color: 'black', fontSize: 14}}>Monthly</Text>
          </TouchableOpacity>*/}

          <TouchableOpacity
            style={{
              backgroundColor: '#6ABABD',
              width: 135,
              height: 37,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}
            onPress={handleShowGrayBox}>
            <Text style={{color: 'black', fontSize: 14}}>Filter By Date</Text>
          </TouchableOpacity>
        </View>
      );
    };

    const Box2 = () => {
      const data = [
        {height: 70, day: 'Mon'},
        {height: 90, day: 'Tue '},
        {height: 140, day: 'Wed'},
        {height: 100, day: 'Thur'},
        {height: 60, day: 'Fri '},
        {height: 120, day: 'Sat '},
        {height: 9, day: 'Sun '},
      ];
      /*
          
          */
      //const [date, setdate] = useState('10 Oct - 14 Oct');
      const [balance, setbalance] = useState(1213);
      const earnings = Object.entries(lastSevenDaysEarnings).map(
        ([date, earnings]) => ({
          date,
          earnings,
        }),
      );
      return (
        <View
          style={{
            width: '90%',
            marginLeft: 20,
            borderRadius: 13,
            borderColor: 'black',
            //borderWidth: 1,
            marginTop: 10,
            flexDirection: 'column',

            marginLeft: 20,
            borderRadius: 13,
            //borderColor: 'black',
            //borderWidth: 1,

            //width: 150,
            // top: 70,
            // alignSelf: 'center',
            //height: 27,

            backgroundColor: '#f8f9fa',
            elevation: 3,
            // borderRadius:9
          }}>
          <View
            style={{
              //backgroundColor:'blue',
              //flexDirection: 'column',
              //paddingHorizontal:12,
              //color:'black',
              // paddingVertical: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                fontWeight: 'bold',
                marginBottom: 15,
                marginTop: 20,
              }}>
              Earning In Last Seven Days
            </Text>
          </View>
          {/*}  <Text style={{color: 'gray', fontSize: 12}}>{date}</Text>
            <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
              {balance}
          </Text>*/}
          <FlatList
            data={earnings}
            renderItem={({item}) => (
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 19,
                  paddingVertical: 8,
                  width: '90%',
                  //marginLeft: 20,
                  borderRadius: 6,
                  //borderColor: 'black',
                  //borderWidth: 1,
                  justifyContent: 'space-between',
                  marginTop: 9,
                  //width: 150,
                  // top: 70,
                  alignSelf: 'center',
                  //height: 27,

                  backgroundColor: 'white',
                  elevation: 1,
                  // borderRadius:9
                }}>
                <Text
                  style={{color: 'black', fontSize: 12, flexDirection: 'row'}}>
                  <Pound /> {item.earnings.toFixed(2)}
                </Text>

                <Text
                  style={{
                    flexDirection: 'column',
                    color: AppColours.AppBackGroundDefalut,
                    fontSize: 12,
                  }}>
                  <Text style={{color: 'black', fontWeight: 'bold'}}>Date</Text>
                  {'   '}
                  {item.date}
                </Text>
              </View>
            )}
            keyExtractor={item => item.date}
          />

          <View
            style={{
              flexDirection: 'column',
              //backgroundColor:'green',
              paddingHorizontal: 3,
              paddingVertical: 3,
            }}>
            <View
              style={{
                //backgroundColor:'blue',
                flexDirection: 'row',
                paddingHorizontal: 30,
                paddingVertical: 10,
                //alignItems:'center'
              }}>
              {/*{data.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'column-reverse',
                    //backgroundColor:'pink',
                    //alignItems: 'center',
                    marginBottom: 0,
                  }}>
                  <View key={index} style={{flexDirection: 'column'}}>
                    <Text
                      style={{
                        marginLeft: 13,
                        fontWeight: 'bold',
                        color: 'black',
                      }}>
                      {item.day}
                    </Text>
                  </View>

                  <View
                    style={[
                      {
                        width: 20,
                        backgroundColor: '#6ABABD',
                        borderRadius: 5,
                        marginBottom: 0,
                        marginLeft: 15,
                        height: item.height,
                      },
                    ]}
                  />
                </View>
                  ))}*/}
            </View>
          </View>
        </View>
      );
    };

    const Details = () => {
      const [trips, settrips] = useState(140);
      const [timeOnline, settimeOnline] = useState('6d 12h');
      const [distance, setdistance] = useState('98');
      return (
        <View
          style={
            {
              //flexDirection: 'column',
              //justifyContent: 'space-around',
              //backgroundColor:'pink',
              // marginLeft: 25,
              // marginBottom: 10,
            }
          }>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              //backgroundColor:'pink',
              marginTop: 10,
              marginBottom: 10,
            }}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{color: AppColours.AppBackGroundDefalut}}>
                Earned
              </Text>

              <View
                style={{
                  // left: 200,
                  flexDirection: 'row',
                  // backgroundColor: 'pink',
                  alignItems: 'center',
                }}>
                <Pound style={{color: 'black'}} />
                {earning == 0 ? (
                  <Text style={{marginLeft: 5, color: AppColours.Dark}}>
                    {earning}.00
                  </Text>
                ) : (
                  <Text style={{marginLeft: 5, color: AppColours.Dark}}>
                    {earning.toFixed(2)}
                  </Text>
                )}
              </View>
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text style={{color: AppColours.AppBackGroundDefalut}}>
                Time Online
              </Text>
              <Text style={{color: AppColours.Dark}}>{onlineTime}</Text>
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text style={{color: AppColours.AppBackGroundDefalut}}>
                Total Distance
              </Text>
              {distanceCovered ? (
                <Text style={{color: AppColours.Dark}}>
                  {distanceCovered.toFixed(2)} miles{' '}
                </Text>
              ) : (
                <Text style={{color: AppColours.Dark}}>0 miles </Text>
              )}
            </View>
          </View>
        </View>
      );
    };

    const Box3 = () => {
      const [trips, settrips] = useState(13);
      const [timeOnline, settimeOnline] = useState('8h 10m');
      const [distance, setdistance] = useState('57');

      return (
        <View
          style={{
            flexDirection: 'column',
            width: '90%',
            marginLeft: 20,
            borderRadius: 13,
            // borderColor: 'black',
            //borderWidth: 1,

            backgroundColor: '#f8f9fa',
            elevation: 2,
          }}>
          <View
            style={{
              //backgroundColor:'blue',
              flexDirection: 'column',
              paddingHorizontal: 13,
              paddingVertical: 6,
            }}>
            <Text
              style={{fontSize: 14, color: AppColours.AppBackGroundDefalut}}>
              Date
            </Text>
            <View
              style={{
                // left: 200,
                flexDirection: 'row',
                // backgroundColor: 'pink',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}>
                {date}
              </Text>
            </View>
            <HorizontalDivider />
            <Text
              style={{fontSize: 14, color: AppColours.AppBackGroundDefalut}}>
              Earned
            </Text>
            <View
              style={{
                // left: 200,
                flexDirection: 'row',
                // backgroundColor: 'pink',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Pound />

              {earning == 0 ? (
                <Text
                  style={{
                    color: 'black',
                    fontSize: 12,
                    fontWeight: 'bold',
                    marginLeft: 5,
                  }}>
                  {earning}.00
                </Text>
              ) : (
                <Text
                  style={{
                    color: 'black',
                    fontSize: 14,
                    fontWeight: 'bold',
                    marginLeft: 5,
                  }}>
                  {earning.toFixed(2)}
                </Text>
              )}
            </View>
          </View>

          {/* <View
          style={{
            flexDirection: 'column',
            width: '90%',
            marginLeft: 20,
            borderRadius: 13,
            borderColor: 'black',
            borderWidth: 1,
          }}>
          <View
            style={{
              //backgroundColor:'blue',
              flexDirection: 'column',
              paddingHorizontal: 13,
              paddingVertical: 6,
            }}>
            <Text style={{fontSize: 14}}>Earned</Text>
            <View
              style={{
                // left: 200,
                flexDirection: 'row',
                // backgroundColor: 'pink',
                alignItems: 'center',
              }}>
              <Pound />
              
              {earning==0?( <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>{earning}.00</Text>):( <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>{earning}</Text>)}
             
              
            </View>
          </View>
          <View
            style={{
              width: '90%',
              height: 1.2,
              backgroundColor: 'gray',
              marginLeft: 12,
            }}
          />
          <View
            style={{
              //backgroundColor:'green',
              flexDirection: 'row',
              paddingHorizontal: 13,
              paddingVertical: 6,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'column',
                //backgroundColor:'pink'
              }}>
              <Text style={{fontSize: 14}}>Total Trips</Text>
              <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
                {trips}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                //backgroundColor:'pink'
              }}>
              <Text style={{fontSize: 14}}>Time Online</Text>
              <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
                {timeOnline}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                //backgroundColor:'pink'
              }}>
              <Text style={{fontSize: 14}}>Total Distance</Text>
              <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
                {distance} miles
              </Text>
            </View>
          </View>
            </View>*/}
        </View>
      );
    };

    return (
      <Modal visible={statsModal} animationType="slide">
        {/* <Icon
          name={'close'}
          size={29}
          onPress={() => setStatsModal(false)}
          style={{alignSelf: 'flex-end', marginRight: 19}}
        /> */}
        <Ionicons
          name="ios-chevron-down"
          size={25}
          color={'black'}
          style={{
            alignSelf: 'center',
            // backgroundColor: AppColours.AppLogoColor,
            // borderRadius: 100,
            padding: 5,
            top: 10,
          }}
          onPress={() => {
            setStatsModal(false);
          }}
        />

        <View style={{top: 50}}>
          {Box1()}
          {Buttons()}
          {/* <Box2 />
        <Details />
        <Box3 /> */}
          {Box2()}
          {Details()}
          {Box3()}
        </View>
      </Modal>
    );
  };

  /*
 useEffect(() => {
    //for loc update
    const interval = setInterval(() => {
      getCurrLoc();
    }, 2000);
    return () => clearInterval(interval);
  });
*/
  useEffect(() => {
    // setTimeout(() => {
    //     navigator.navigate('newpass')
    // }, 3000);
    locationPermission();
    console.log('data is=>', user);
  }, []);

  useEffect(() => {
    // Start the timer when the component mounts
    if (mockRide) {
      console.log('running');
      const timer = setTimeout(() => {
        console.log('running x2');
        // After 1 minute, set the modal to visible
        // setModalVisible(true);
      }, 60); // 1 minute = 60,000 milliseconds

      // Cleanup the timer when the component unmounts or when trr becomes false
      return () => clearTimeout(timer);
    }
  }, [mockRide]);

  //for meter tracking distance
  useEffect(() => {
    let distanceTravelled = 0;

    const watchId = Geolocation.watchPosition(
      position => {
        if (isTracking) {
          const {latitude, longitude} = position.coords;
          const newLocation = {latitude, longitude};

          if (!startLocation) {
            setStartLocation(newLocation);
          }

          if (prevLocation) {
            distanceTravelled += calculateDistance(prevLocation, newLocation);
            setDistance(distanceTravelled);
          }

          setPrevLocation(newLocation);
        }
      },
      error => {
        console.log('Error:', error);
      },
      {enableHighAccuracy: true, distanceFilter: 10},
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, [isTracking]);
  useEffect(() => {
    try {
      if (currentLoc) {
        mapRef.current.animateToRegion({
          latitude: currentLoc.latitude,
          longitude: currentLoc.longitude,
          latitudeDelta: 0.0001,
          longitudeDelta: 0.0001,
        });
      }
    } catch (error) {
      console.log('Animate error', error);
    }
  }, [currentLoc]);
  useEffect(() => {
    let distanceTravelled = 0;

    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log(
          'POSTION CHANGING===========================================',
          position,
        );
        // alert("Activity Status" + activityStatus)
        //alert("loc " + latitude + " " + longitude)
        const coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LAT_DELTA,
          longitudeDelta: LNG_DELTA,
        };
        setCurrentLoc(coordinates);
        try {
          if (coordinates) {
            mapRef.current.animateToRegion({
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
              latitudeDelta: 0.0001,
              longitudeDelta: 0.0001,
            });
          }
        } catch (error) {
          console.log('Animate error', error);
        }
      },
      error => {
        console.log('Error:', error);
      },
      {enableHighAccuracy: true, distanceFilter: 5},
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, [currentLoc]);

  useEffect(() => {
    console.log('Activity Status Updated:', activityStatus);
    if (activityStatus == true) {
      console.log('USER IS ONLINE');
      setOfflineLoc(null);
      setOnlineLoc({
        latitude: currentLoc.latitude,
        longitude: currentLoc.longitude,
      });
      console.log('setting online location');
      console.log(
        '----------------------------------setting online locatiomn',
        onlineloc,
        'offline',
        offlineloc,
      );
    }
    if (activityStatus == false) {
      console.log('USER IS NOT ONLINE');
      setOfflineLoc({
        latitude: currentLoc.latitude,
        longitude: currentLoc.longitude,
      });

      console.log(
        '-----------------------------------setting offline location',
        offlineloc,
      );
    }
  }, [activityStatus]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={AppColours.AppBackGroundDefalut} />
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={currLoc ? currLoc : staticLocation}
          // onRegionChange={newRegion => {
          //   console.log('Latitude Delta:', newRegion.latitudeDelta);
          //   console.log('Longitude Delta:', newRegion.longitudeDelta);
          //   console.log('Longitude:', newRegion.longitude);
          //   console.log('Latitude:', newRegion.latitude);
          // }}
        >
          {/* {Object.keys(pickupCords).length > 0 ? (
            <Marker coordinate={pickupCords} />
          ) : (
            <Marker coordinate={staticLocation} />
          )} */}
          {currentLoc && <Marker coordinate={currentLoc} image={mockLogo} />}
          {currentLoc && locationAnimate && (
            <Marker coordinate={currentLoc} image={markerLogo} />
          )}
          {rideData && destinationpoint && originpoint && (
            <>
              <Marker coordinate={originpoint} />
              <Marker coordinate={destinationpoint} />
              {stops &&
                stops.map((stop, index) => (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: stop.latValue,
                      longitude: stop.lngValue,
                    }}
                  />
                ))}

              <MapViewDirections
                origin={originpoint}
                destination={destinationpoint}
                apikey={'AIzaSyAXY0KXAGloxJe_eB22yrq_USUpT9lXezk'}
                strokeWidth={3}
                strokeColor="#193B69"
                optimizeWaypoints={true}
                onReady={result => {
                  mapRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      // right: width / 20,
                      // bottom: height / 20,
                      // left: width / 20,
                      // top: height / 20,
                      // right: 30,
                      // bottom: 300,
                      // left: 30,
                      // top: 100,
                    },
                  });
                }}
                onError={errorMessage => {
                  console.log('GOT AN ERROR IN MAPS=>>', errorMessage);
                }}
              />
            </>
          )}
        </MapView>

        {renderHeaders()}
        {BottomBar()}

        {rideModalView()}
        {rideModalAccept()}
        {rideModalOngoing()}
        {declineModalView()}
        {profileModalView()}
        {chatModalView()}
        {statsModalView()}
        <RBSheet
          ref={refRBSheet}
          closeOnPressMask={false}
          closeOnDragDown={true}
          height={350}
          openDuration={250}
          customStyles={{
            container: {
              // justifyContent: 'center',
              // alignItems: 'center',
            },
          }}>
          {meter()}
        </RBSheet>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: 10,
    position: 'absolute',
    top: 0,
    right: 10,
  },
  headerContainersidebar: {
    paddingTop: 10,
    position: 'absolute',
    top: 0,
    left: 10,
  },

  headerIcon: {
    padding: 5,
    backgroundColor: '#D9D9D9',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 100,
    alignSelf: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  bottomBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomBar: {
    width: '100%',
    height: 60,
    backgroundColor: AppColours.AppBackGroundDefalut,
  },
  bottomBarInner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  bottomBarSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineStatus: {
    backgroundColor: 'red',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 30,
    marginRight: 10,
  },
  statusText: {
    color: 'white',
  },

  header: {
    backgroundColor: '#6ABABD',
    height: '20%', // 1/6th of the screen height
  },
  profileContainer: {
    flexDirection: 'row',
  },
  profileInfo: {
    marginLeft: 12,
    marginTop: 33,
  },
  data: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#212529',
    paddingHorizontal: 13,
    paddingVertical: 13,
  },
  imageContainer: {
    width: 70,
    height: 70,
    backgroundColor: '#e1e1e1',
    marginTop: 30,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginLeft: 20,
    borderRadius: 50,
  },

  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 1,
  },
  profileEmail: {
    fontSize: 14,
    color: 'white',
  },
  mainContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sideDrawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '70%',
    backgroundColor: '#f1f1f1',
    elevation: 8,
  },
  drawerContent: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginBottom: 10,
  },
  drawerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 13,
    color: '#212529',
    paddingHorizontal: 20,
  },
  drawerToggle: {
    position: 'absolute',
    top: 40,
    left: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 99,
    backgroundColor: '#dad7cd',
    elevation: 8,
  },
  containerText: {
    marginTop: 16,
  },
  drawerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  drawerIcon: {
    marginRight: 12,
  },
  drawerText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#212529',
  },
  backOptionContainer: {
    position: 'absolute',
    top: 3,
    right: 7,
    paddingHorizontal: 2,
    paddingVertical: 1,
    borderRadius: 100,
    backgroundColor: '#dad7cd',
  },
});
