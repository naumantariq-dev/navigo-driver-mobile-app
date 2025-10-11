import React, {createContext, useEffect, useMemo, useState} from 'react';
import auth from '@react-native-firebase/auth';
// import {StackActions} from '@react-navigation/native';
import {
  useIsFocused,
  useNavigation,
  StackActions,
} from '@react-navigation/native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  getDriver,
  setRideProgressFlag,
  setRideProgressFlagForTimeout,
  setRideStatus,
  setUserData,
  updateActiveLocation,
} from '../providers-callable/http';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userdoc, setUserDoc] = useState(null);
  const [online, setOnline] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [ptm, setPtm] = useState(null);
  const [dis, setDis] = useState('');

  const [ride, setRide] = useState({
    pickupCords: {
      // latitude: 24.9143,
      // longitude: 67.1272,
      // latitudeDelta: 0.0922,
      // longitudeDelta: 0.0421,
    },
    dropLocation: {
      // latitude: 24.8617,
      // longitude: 67.0736,
      // latitudeDelta: 0.0922,
      // longitudeDelta: 0.0421,
    },
  });
  const {pickupCords, dropLocation} = ride;
  const [pickName, setPickName] = useState('');
  const [dropName, setDropName] = useState('');
  const [rideAcceptFlag, setRideAcceptFlag] = useState(false);
  const [rideOngoingFlag, setRideOngoingFlag] = useState(false);
  const [rideCompleteFlag, setRideCompleteFlag] = useState(false);
  const [driverIdel, setDriverIdel] = useState(true);
  const [cities, setCities] = useState([]);

  const [rideData, setRideData] = useState(null);

  const [onlineTime, setOnlineTime] = useState(0);
  const [distance, setDistance] = useState(0);

  //   const onAuthStateChanged=async (user)=>{
  //     if (user) {
  //         console.log('if user=======>', user);
  //         userEmail = user._user.email ? user._user.email : null;
  //         //console.log('user or not=>', userEmail);
  //         const jwtToken = await user?.getIdToken();
  //         setToken(jwtToken);

  //         if (userEmail !== null) {
  //           try {

  //             setUserId(user?.uid);

  //           } catch (error) {
  //             //console.log('error in getting subcollectiondata=>', error);
  //           }

  //           // await getSubCollectionData(user.uid);
  //         }
  //       } else {
  //         setUser(null); //basically null?
  //       }
  //       if (initializing) setInitializing(false);
  //   }
  //   useEffect(() => {
  //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //     return () => {
  //       subscriber;
  //     };
  //   }, []);
  return (
    <AuthContext.Provider
      //   value={useMemo(
      //     () => ({
      //       user,
      //       setUser,
      //       online,
      //       setOnline,
      //     }),
      //   )}>
      value={{
        ride,
        dis,
        setDis,
        setRide,
        pickupCords,
        dropLocation,
        user,
        setUser,
        userdoc,
        setUserDoc,
        userId,
        setUserId,
        token,
        setToken,
        dropName,
        setDropName,
        pickName,
        setPickName,
        error,
        setError,
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
        loading,
        setLoading,
        distance,
        setDistance,
        cities,
        setCities,
        rideData,
        setRideData,
        onlineTime,
        setOnlineTime,
        login: async (email, password) => {
          try {
            const loginStatus = await auth().signInWithEmailAndPassword(
              email,
              password,
            );

            if (loginStatus) {
              return new Promise((resolve, reject) => {
                const unsubscribe = auth().onAuthStateChanged(async user => {
                  if (user) {
                    const jwtToken = await user.getIdToken();
                    setToken(jwtToken);
                    setUserId(user.uid);
                    const eventData = {
                      email: email,
                    };
                    console.log('during login==>', eventData);
                    const data = await getDriver(eventData, user.getIdToken());
                    console.log('req=>>', data.data);

                    if (user.email === data.data.email) {
                      console.log('logged in data=>', data);
                      setUser(data.data);
                      unsubscribe();
                      // return true;
                      resolve(true);
                    } else {
                      console.log('Email mismatch');
                      unsubscribe();
                      reject(false);
                    // return false

                    }
                  } else {
                    setLoading(false);
                    console.log('User not available');
                    unsubscribe();
                    // return false
                    reject(false);
                  }
                });
              });
            } else {
              setLoading(false);
              console.log('Error during login');
              return false;
            }
          } catch (e) {
            console.log(e, 'inside login');
            setLoading(false);
            setError(e);
            return false;
          }
        },
        forgetPassword: (email, setLoading, setError) => {
          try {
            setLoading(true);
            console.log('in forgot pass');
            console.log(email);
          } catch (e) {
            setError(e);
            //console.log('error while Forgeting Password=> ', e);
          }
        },
        register: async (
          email,
          password,
          //   setLoading,
          firstName,
          lastName,
          phno,
          city,
        ) => {
          try {
            console.log('Register hit from AuthProvider');
            setLoading(true);
            //console.log("current user info ==>",firebase.auth().currentUser,"current user info ==> state:",user)
            //This needs to be revamped
            let timezone = new Date();
            // setLoading(true);

            const eventData = {
              email,
              password,
              //   setLoading,
              firstName,
              lastName,
              phno,
              city,
            };
            console.log('in context==>', eventData);
            setUser(eventData);
            if (password != null) {
              console.log('user will be created');
              auth()
                .createUserWithEmailAndPassword(email, password)
                .then(user => {
                  console.log('User account created & signed in!');
                  const eventData = {
                    firstName: firstName,
                    lastName: lastName,
                    displayName: firstName + ' ' + lastName,
                    email: email,
                    signinMethod: 'InApp',
                    forum: 'App',
                    createdAt: Date.now().toString(),
                    isLive: false,
                    isProved: false,
                    phoneNumber: phno,
                    userId: user.user.uid,
                    photoUrl: null,
                    securityEnabled: false,
                    securityKey: null,
                    securityQuestions: {},
                    lastActiveLocation: {},
                    city: city,
                    documentUploadStatus: false,
                    name: firstName + ' ' + lastName,
                    rideStatus: false,
                    vehicleStatus:false,
                  };
                  setUserData(eventData, token);
                  setUser(eventData);
                  setLoading(false);
                  return true;
                })
                .catch(error => {
                  if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    setError(`${email} address is already in use!`);
                  }

                  if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    setError('That email address is invalid!');
                  }
                  console.error(error);
                  setLoading(false);
                });
            } else {
              console.log('pass nhai aya abhi tk');
              setLoading(false);
              return false;
            }
          } catch (e) {
            console.log('error while registring=> ', e);
            setLoading(false);
            return true;
          }
        },
        docUpload: async (
          proofOfIdentity,
          DBS,
          bankStatement,
          profilePhoto,
          DLVAPlasticLicense,
          DLVAElectronicCounterpartCheckCode,
          insuranceCertificate,
          insuranceSupportingDocument,
          MOTTestCertificate,
          nationalInsuranceNumber,
          PHV,
          publicLiabilityInsurance,
          logBook,
        ) => {
          try {
            // if (condition) {
            console.log('here');
            console.log('Doc hit from AuthProvider');
            setLoading(true);
            const eventData = {
              proofOfIdentity: proofOfIdentity,
              DBS: DBS,
              bankStatement: bankStatement,
              profilePhotoIdentity: profilePhotoIdentity,
              DLVAPlasticLicense: DLVAPlasticLicense,
              DLVAElectronicCounterpartCheckCode:
                DLVAElectronicCounterpartCheckCode,
              insuranceCertificate: insuranceCertificate,
              insuranceSupportingDocument: insuranceSupportingDocument,
              MOTTestCertificate: MOTTestCertificate,
              nationalInsuranceNumber: nationalInsuranceNumber,
              PHV: PHV,
              publicLiabilityInsurance: publicLiabilityInsurance,
              logBook: logBook,
            };
            console.log('This is eventtt data', eventData);
            setUserDoc(eventData);
            setLoading(false);
            return true;

            // } else {

            // }
          } catch (e) {
            //setError(e);
            console.log('error while uploding documents=> ', e);
          }
        },
        rideComplete: async eventData => {
          try {
            const checker = await setRideStatus(eventData, token);
            console.log('--->', checker);
            return checker;
          } catch (error) {
            console.log('error in context');
            return false;
          }
        },
        rideProgress: async eventData => {
          try {
            if (eventData) {
              const checker = await setRideProgressFlag(eventData, token);
              console.log('--->', checker);
              return checker;
            } else {
            }
          } catch (error) {
            console.log(error);
            return false;
          }
        },
        rideTimeout: async eventData => {
          try {
            if (eventData) {
              const checker = await setRideProgressFlagForTimeout(eventData, token);
              console.log('--->', checker);
              return checker;
            } else {
            }
          } catch (error) {
            console.log(error);
            return false;
          }
        },
        updateLiveLocation: async eventData => {
          try {
            if (eventData) {
              const checker = await updateActiveLocation(eventData, token);
              console.log('--->', checker);
              return checker;
            } else {
            }
          } catch (error) {
            console.log(error);
            return false;
          }
        },
        logout: async () => {
          try {
            setLoading(true);
            const userOnGoolgle = await GoogleSignin.getCurrentUser();
            try {
              await AsyncStorage.removeItem('profileImgObj');
              console.log('AsyncStorage item cleared');
            } catch (error) {
              console.error('Error clearing AsyncStorage item:', error);
            }
            //console.log('this is current user from google==>', userOnGoolgle);
            if (userOnGoolgle !== null) {
              console.log('logging out=>>', userOnGoolgle);

              setUser(null);
              setToken(null);
              setPtm(null);

              await GoogleSignin.signOut();

              setLoading(false);
            }
            console.log('logging out=>>', auth().currentUser);
            await auth().signOut();
            setPtm(null);
            setLoading(false);
            setUser(null);
            setToken(null);
            // setuserId(null);
            // setBlockUserArray([]);
            // setBlockByArray([]);
            // setuserId(null);

            return 'success';
            // removeUserOnLocalStorage()
          } catch (e) {
            setLoading(false);
            console.log('error while signing out=> ', e);
          }
        },

        // logout: async () => {
        //   try {
        //     //   const userOnGoolgle = await GoogleSignin.getCurrentUser();
        //     //console.log('this is current user from google==>', userOnGoolgle);
        //     //   if (userOnGoolgle !== null) {
        //     // await GoogleSignin.signOut();
        //     //   }
        //     //   await firebase.auth().signOut();

        //     // auth()
        //     // .signOut()
        //     // .then(() => {
        //     //   console.log('User signed out!');
        //     //   setUser(null);
        //     //   navigator.dispatch(StackActions.replace('splash'));
        //     // });

        //     return 'success';
        //     // removeUserOnLocalStorage()
        //   } catch (e) {
        //     console.log('error while signing out=> ', e);
        //   }
        // },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
