import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Image,
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import HorizontalDivider from '../sharedComponents/HorizontalDivider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../contextApi/AuthProvider';
import { showErrorToast, showSuccessToast } from '../toaster/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';


import ImagePicker from 'react-native-image-crop-picker';

const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');

export default function ProfileSettingsScreen() {


  const { user, setUser, token } = useContext(AuthContext);
  const navigator = useNavigation();

  const [isChecked, setIsChecked] = useState(false);

  const cities = ['London', 'Bristol', 'Plymouth', 'Taunton', 'Southampton'];
  const [selectedCity, setSelectedCity] = useState('');

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phno, setPhno] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [userId, setUserId] = useState(null);
  const [oprModal, setOprModal] = useState(false)

  //const [url,seturl]=useState()




  useEffect(() => {
    setUserId(user.userId)
    console.log("USER===============>", user.photoUrl)
    setProfileImg(user.photoUrl)
  }, [user])

  /*const uploadImg = (callback) => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log("The image", image);
        console.log("The image uri", image.path)
        //setProfileImg(image.path);
        callback(image)


        
      })
      .catch(error => {
        console.log('Error picking image:', error);
      });
  }

  const getUploadImg = async () => {
    try {
     // setLoading(true)
     uploadImg(async image=>{ 
      console.log("the image is", image.path)
      const res = await storage().ref(`/users/${userId}/profileimage`).putFile(image.path)
      console.log("sending data firebase", res)
      if(res.state=='success')
      {
        console.log("SAVEDDDD")
        try {
          const storageRef = storage().ref(`/users/${Id}/profileimage`);
          console.log("StorageReff===================================", storageRef)
          const download = await storageRef.getDownloadURL();
          console.log("download", download)
          setProfileImg(download)
         
        } catch (error) {
          console.error('Error getting download URL:', error);
        }

      }})}
      //const imgstring = JSON.stringify(profileImg)

      /*try {
        await AsyncStorage.setItem('profileImgObj', imgstring);
      }
      catch (error) {
        console.log('Error saving profileimage Async Storage:', error);
      }
      
    

    //saveImageStorage('Upload-obj',image,setUpload))}
    catch (e) { console.log(e); }
  };*/
  const pickprofileImage = (callback) => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log("The image", image);
        console.log("The image uri", image.path)
        // setProfileImage(image.path);
        callback(image)
      })
      .catch(error => {
        console.log('Error picking image:', error);
      });
  }

  const UploadImg = async () => {
    try {
      pickprofileImage(async image => {
        console.log("the image is", image, image.path)
        const res = await storage().ref(`/users/${userId}/profileimage`).putFile(image.path)
        console.log("sending data firebase", res)
        if (res.state == 'success') {
          console.log("SAVEDDDD")
          try {
            const storageRef = storage().ref(`/users/${userId}/profileimage`);
            console.log("StorageReff===================================", storageRef)
            const download = await storageRef.getDownloadURL();
            console.log("download", download)
            setProfileImg(download)

          } catch (error) {
            if (error.code === 'storage/object-not-found') {
              console.log("No profile image in firebase");
            } else {
              console.error('Error getting download URL:', error);
            }
          }



        }
      }

      )
    }//saveImageStorage('Upload-obj',image,setUpload))}
    catch (e) { console.log(e); }
  };



  useEffect(() => {
    console.log('profileimg==>', profileImg);
    if (profileImg) {
      const eventData = {
        email: user.email,
        url: profileImg
      }

      console.log("EVENTDATAAA=============", eventData)
      setUser({ ...user, photoUrl: eventData.url })
      //setUser({...user,SecurityQuestions:eventData.answers});
      console.log("USer isss==============", user)
    }
  }, [profileImg]);
  /*   
    useEffect(() => {
      setUserId(user.userId)
      const getProfileData = async () => {
        try {
          const storageRef = storage().ref(`/users/${userId}/profileimage`);
          console.log("StorageReff===================================", storageRef)
          const download = await storageRef.getDownloadURL();
          console.log("download", download)
  
          setProfileImg(download)
        } catch (error) {
          console.error('Error getting download URL:', error);
        }
      }
  
      if (userId) {
        getProfileData();
      }
    }, [userId])*/


  const removeProfileImg = () => {
    setProfileImg(null)
    //setUpload(null)
    const deleteImage = async () => {
      try {
        const Ref = storage().ref(`/users/${userId}/profileimage`);
        const Result = await Ref.delete();

        console.log("delete image")

        console.log('Image deleted successfully');


        //console.log("EVENTDATAAA=============",eventData)



      }
      catch (error) {
        console.error('Error deleting image:', error);
      }

      setUser({ ...user, photoUrl: null })
      setProfileImg(null)
      //setUser({...user,SecurityQuestions:eventData.answers});
      console.log("User isss==============", user)
    };
    deleteImage()
  }

  /*
    const getProfileImage = async () => {
      setId(user.userId)
      const getProfileData = async () => {
        try {
          const storageRef = storage().ref(`/users/${Id}/profileimage`);
          console.log("StorageReff===================================", storageRef)
          const download = await storageRef.getDownloadURL();
          console.log("download", download)
  
          setProfileImg(download)
        } catch (error) {
          console.error('Error getting download URL:', error);
        }
      }
      if (Id) {
        getProfileData();
      }
      //console.log("URL:", url);
  
    }
  
  */
  const handleCityChange = city => {
    setSelectedCity(city);
  };

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phnoRef = useRef();
  const emailRef = useRef();
  const currentPass = useRef();
  const newPass = useRef();
  const renewPass = useRef();

  const handleFnameSubmit = () => {
    lastNameRef.current.focus();
  };
  const handleLnameSubmit = () => {
    emailRef.current.focus();
  };
  const handlePhnoSubmit = () => {
    // currentPass.current.focus();
  };
  const handleEmailSubmit = () => {
    phnoRef.current.focus();
  };
  const handleCurrPassSumbit = () => {
    newPass.current.focus();
  };
  const handleNewPassSumbit = () => {
    renewPass.current.focus();
  };

  useEffect(() => {
    // setTimeout(() => {
    //     navigator.navigate('newpass')
    // }, 3000);
  }, [firstName, lastName, phno, email, user]);


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
          Profile Settings
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
  const renderUploadSection = () => {
    return (
      <>
        <View style={{ marginBottom: 10 }}>
          <View
            style={{
              backgroundColor: '#EFEFEF',
              height: 100,
              width: 100,
              borderRadius: 100,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            {profileImg ?
              (
                <Image
                  source={{ uri: profileImg }}
                  style={{ width: '100%', height: '100%', borderRadius: 100 }}
                />
              ) :
              (
                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
                  A
                </Text>)}

          </View>
          <AntDesign
            name="upload"
            size={30}
            color={'#EFEFEF'}
            style={{ alignSelf: 'center' }}
          />
          <TouchableOpacity onPress={UploadImg}>
            <Text
              style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>
              Click here to upload new image
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={removeProfileImg}>
            <Text
              style={{ color: '#FF0000', textAlign: 'center', fontWeight: 'bold' }}>
              Remove image
            </Text>

          </TouchableOpacity>

        </View>
      </>
    );
  };
  const renderInfoSection = () => {
    return (
      <>
        <View
          style={{
            // flexDirection: 'row',
            // backgroundColor: 'pink',
            width: '90%',
            alignSelf: 'center',
          }}>
          <TextInput
            // placeholder="First Name"
            placeholder={user.firstName}
            //     editable={false}
            style={{
              borderWidth: 0.5,
              marginBottom: 10,
              width: '100%',
              borderRadius: 100,
              paddingLeft: 12,
            }}
            ref={firstNameRef}
            returnKeyType="next"
            onSubmitEditing={handleFnameSubmit}
            blurOnSubmit={false}
            onChangeText={value => {
              setFirstName(value);
            }}
          />
          <TextInput
            // placeholder="Last Name"
            placeholder={user.lastName}
            //editable={false}
            style={{
              borderWidth: 0.5,
              marginBottom: 10,
              width: '100%',
              borderRadius: 100,
              paddingLeft: 12,
            }}
            ref={lastNameRef}
            returnKeyType="next"
            onSubmitEditing={handleLnameSubmit}
            blurOnSubmit={false}
            onChangeText={value => {
              setLastName(value);
            }}
          />
          <TextInput
            // placeholder="Email address"
            placeholder={user.email}
            editable={false}
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
            onChangeText={value => {
              setEmail(value);
            }}
          />
          <View
            style={{
              borderWidth: 0.5,
              marginBottom: 20,
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
              <Text style={{ color: 'black' }}>{'\u{1F1EC}\u{1F1E7}'}</Text>
              <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>
                +42
              </Text>
            </View>
            <TextInput
              // placeholder="12345678"
              placeholder={user.phoneNumber}
              inputMode={'tel'}
              //  editable={false}
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
              returnKeyType="done"
              onSubmitEditing={handlePhnoSubmit}
              //   blurOnSubmit={false}
              onChangeText={value => {
                setPhno(value);
              }}
            />
          </View>

          <TouchableOpacity
            style={{
              //   borderWidth: 0.5,
              //   width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              height: 30,
              width: 90,
              borderRadius: 100,
              //   padding: 15,
              marginBottom: 20,
              backgroundColor: AppColours.AppLogoColor,
              alignSelf: 'center',
            }}
            onPress={() => {
              console.log(user);

              if (firstName && lastName) {
                setOprModal(true)
/*try {
                  const collectionRef = firestore().collection('drivers').doc(user.email);
                  const updatingprofile = async () => {
                    const snapshot = await collectionRef.get();
                    console.log("snapshot===============================================", snapshot)
                    const data = snapshot.data();
                    //console.log("snapshotdata===============================================",data)
                    console.log("driversdata=======================================", data);

                    const updated = {
                      ...data,
                      firstName: firstName,
                      lastName: lastName,
                      displayName: firstName + ' ' + lastName

                    };
                    const eventData = {
                      email: user.email,
                      firstName: firstName,
                      lastName: lastName,
                      displayName: firstName + ' ' + lastName
                    }
                    setUser({ ...user, firstName: eventData.firstName, lastName: eventData.lastName, displayName: eventData.displayName })

                    console.log("EVENTDATAAA=============", eventData)
                    setUser({ ...user, photoUrl: eventData.url })
                    console.log("UPDATED===========================", updated);
                    collectionRef.update(updated);
                  };
                  updatingprofiledata();
                } catch (e) {
                  console.log('Error:', e);
                }*/
              } else {
                alert('Make sure First/Last name :>')
              }
            }
            }
          >
            <Text
              style={{
                fontWeight: 'bold',
                color: AppColours.color_0_white_base,
              }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };
  const renderPasswordSection = () => {
    return (
      <View
        style={{
          // flexDirection: 'row',
          //   backgroundColor: 'pink',
          width: '90%',
          alignSelf: 'center',
        }}>
        <Text style={{ fontWeight: 'bold', color: AppColours.Dark }}>
          Change password
        </Text>
        <TextInput
          placeholder="Enter previous password"
          style={{
            borderWidth: 0.5,
            marginBottom: 10,
            width: '100%',
            borderRadius: 100,
            paddingLeft: 12,
          }}
          ref={currentPass}
          returnKeyType="next"
          onSubmitEditing={handleCurrPassSumbit}
          blurOnSubmit={false}
          secureTextEntry={true}
        />
        <Text style={{ fontWeight: 'bold', color: AppColours.Dark }}>
          Create a new password
        </Text>
        <TextInput
          placeholder="Enter new password"
          style={{
            borderWidth: 0.5,
            marginBottom: 10,
            width: '100%',
            borderRadius: 100,
            paddingLeft: 12,
          }}
          ref={newPass}
          returnKeyType="next"
          onSubmitEditing={handleNewPassSumbit}
          blurOnSubmit={false}
          secureTextEntry={true}
        />
        <Text style={{ fontWeight: 'bold', color: AppColours.Dark }}>
          Re-enter your new password
        </Text>
        <TextInput
          placeholder="Re-enter new password"
          style={{
            borderWidth: 0.5,
            marginBottom: 50,
            width: '100%',
            borderRadius: 100,
            paddingLeft: 12,
          }}
          ref={renewPass}
          returnKeyType="done"
          onSubmitEditing={null}
          secureTextEntry={true}
        //   blurOnSubmit={false}
        />
        <TouchableOpacity
          style={{
            //   borderWidth: 0.5,
            //   width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            height: 30,
            width: 90,
            borderRadius: 100,
            //   padding: 15,
            marginBottom: 10,
            backgroundColor: AppColours.AppLogoColor,
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: AppColours.color_0_white_base,
            }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    );
  };


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
          <Text style={{ color: AppColours.Dark, textAlign: 'center' }}>
            Do you want to continue to save this information as new information?
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
                 /*
                  const eventData = {
                    email: user.email,
                    firstName: firstName,
                    lastName: lastName,
                    displayName: firstName + ' ' + lastName,
                    // phno:phno,
                    phoneNumber: phno,
                    email: email
                  };

                  setFirstName(null)
                  setLastName(null)
                  setPhno(null)
                  setEmail(null)
                  setUser({ ...user, firstName: eventData.firstName, lastName: eventData.lastName, displayName: eventData.displayName })
                  */
                 try {
                    const collectionRef = firestore().collection('drivers').doc(user.email);
                    const updatingprofile = async () => {
                      const snapshot = await collectionRef.get();
                      console.log("snapshot===============================================", snapshot)
                      const data = snapshot.data();
                      //console.log("snapshotdata===============================================",data)
                      console.log("driversdata=======================================", data);
  
                      const updated = {
                        ...data,
                        firstName: firstName,
                        lastName: lastName,
                        displayName: firstName + ' ' + lastName
  
                      };
                      console.log("UPDATED===========================", updated);
                      collectionRef.update(updated);
                   
                      const eventData = {
                        email: user.email,
                        firstName: firstName,
                        lastName: lastName,
                        displayName: firstName + ' ' + lastName
                      }
                      setUser({ ...user, firstName: eventData.firstName, lastName: eventData.lastName, displayName: eventData.displayName })
  
                      console.log("EVENTDATAAA=============", eventData)
                      setUser({ ...user, firstName: eventData.firstName,lastName:eventData.lastName,displayName:eventData.displayName })
                       };
                    updatingprofile();
                   
                  } catch (e) {
                    console.log('Error:', e);
                  }
                  showSuccessToast('ho gayi save');

                  setOprModal(false);
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
        <View style={{ backgroundColor: '#FFFFFF', height: height }}>
          {renderHeaders()}
          <ScrollView>
            <View style={{ height: height + 300 }}>
              <View style={{ top: 20, marginBottom: 30 }}>
                {renderUploadSection()}
              </View>
              {renderInfoSection()}
              {renderPasswordSection()}
              {ProceedingModal()}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
