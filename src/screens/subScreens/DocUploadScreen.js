import React, {useContext, useEffect, useState} from 'react';
import {CheckBox} from 'react-native-elements';
//import { firebase } from '@react-native-firebase/storage';

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
  ActivityIndicator,
} from 'react-native';

import AppColours from '../../../appStyles/AppColours';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import Clip from '../../assets/icons/Clip.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {template} from '@babel/core';
import DocumentPicker from 'react-native-document-picker';
import {AuthContext} from '../../contextApi/AuthProvider';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';



const {width} = Dimensions.get('screen');
const {height} = Dimensions.get('screen');

export default function DocUploadScreen() {
  let {user,register,distance, docUpload,setUser} = useContext(AuthContext);

  const [proofOfIdentity, setProofOfIdentity] = useState(null);
  const [DBS, setDBS] = useState(null);
  const [bankStatement, setBankStatement] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [DLVAPlasticLicense, setDLVAPlasticLicense] = useState(null);
  const [DLVAElectronicCounterpartCheckCode,setDLVAElectronicCounterpartCheckCode,] = useState(null);
  const [insuranceCertificate, setInsuranceCertificate] = useState(null);
  const [insuranceSupportingDocument, setInsuranceSupportingDocument] =useState(null);
  const [MOTTestCertificate, setMOTTestCertificate] = useState(null);
  const [nationalInsuranceNumber, setNationalInsuranceNumber] = useState(null);
  const [PHV, setPHV] = useState(null);
  const [publicLiabilityInsurance, setPublicLiabilityInsurance] =useState(null);
  const [logBook, setLogBook] = useState(null);
  //const [upload,setUpload]=useState(null)
  const [profileimage,setProfileImage]=useState(null)
  const [loading,setloading]=useState(false)
  const [userId,setuserId]=useState(null)
//  const Firestore = firebase.firestore();

  useEffect(()=>{
   //console.log("userrrr",user) 
   //console.log("useriddddd",user.userId)
   setuserId(user.userId)
  // console.log("Value of proof of identity",proofOfIdentity)
   //console.log("Value of DBS of identity",DBS)
   //console.log("Value of bankStatement of identity",bankStatement)
  
   //console.log("distance",distance)
  })

  const pickprofileImage =(callback)=> {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
    .then(image => {
      console.log("The image", image);
      console.log("The image uri",image.path)
      setProfileImage(image.path);
     callback(image)
    })
    .catch(error => {
        console.log('Error picking image:', error);
      });}
  

  const pickImage=(callback)=>
  {
    DocumentPicker.pick({copyTo:'cachesDirectory'})
      .then(image => {
        console.log("The document:", image);
        callback(image)
      //handleDocumentPicked(image.uri); // Call the callback function with the picked document's URI
      })
      .catch(error => {
        if (DocumentPicker.isCancel(error)) {
          console.log('User cancelled document picker');
        } else {
          console.log('Error picking document:', error);
        }
      });
    }

  const getUploadImg = async() => {
    try{
      pickprofileImage(async image=>{
      console.log("the image is",image,image.path)
      const res=await storage().ref(`/users/${userId}/profileimage`).putFile(image.path)
      console.log("sending data firebase",res)
      const imgstring=JSON.stringify(image)
      try{
        await AsyncStorage.setItem('profileImgObj',imgstring);
      }
      catch (error) {
        console.log('Error saving profileimage Async Storage:', error);
    }
      
    }
      
      )}//saveImageStorage('Upload-obj',image,setUpload))}
      catch(e){console.log(e);}
  };

  const removeProfileImg=()=>
  {
        setProfileImage(null)
        //setUpload(null)
        const deleteImage = async () => {
          try {
            const Ref = storage().ref(`/users/${userId}/profileimage`);
            const Result = await Ref.delete();
            console.log("delete image")
          
            console.log('Image deleted successfully');
          } 
          catch (error) {
            console.error('Error deleting image:', error);
          }
        };
        deleteImage()
      }

  const saveImageStorage=async(key,path,successCallBack)=>{
    try
    {
      //let fileExtension;
      setloading(true)
       // console.log("The data is geting saved")
        console.log("doc path",path)
        //console.log("doc name",name)
        console.log("user iddddddddddddddddddddd",userId)
          const pdfRef = storage().ref(`/users/${userId}/${key}`);
        // console.log("pdf refff",pdfRef)
          //console.log("Uploaddddd =======>>>>")
         
          const uploadTask = await pdfRef.putFile(path);
        
          console.log("Sending data to firebase :", uploadTask);
          if(uploadTask.state=='success'){
            console.log("File Uploading Done",uploadTask.state)
            var fullPath = uploadTask.metadata.fullPath;
            console.log('File path for ',key," is ", fullPath);
            successCallBack(fullPath)
            
  
            
            setloading(false)
          }
          else{
            setloading(true)
          }
         

            
       }
        catch (error) {
        console.log('Error saving DOC:', error);
    }
  }
  
  const getProofOfIdentityImg = () => {
    pickImage(doc => {
      const uri = doc[0].fileCopyUri;
     // const uri=doc[0].uri;
      console.log('doc URI:', uri);
      console.log("document=>",doc)
      saveImageStorage('proofOfIdentity',uri,setProofOfIdentity)
    })
  };

  const getDBSImg = () => {
    pickImage(doc => {
      const uri = doc[0].fileCopyUri;
     // const name=doc[0].name;
      console.log('doc URI:', uri);
      saveImageStorage('DBS',uri,setDBS)})
  };
  const getbankStatmentImg = () => {
    pickImage(doc => {
      const uri = doc[0].fileCopyUri;
      //const name=doc[0].name;
      console.log('doc URI:', uri);
      saveImageStorage('bankStatement',uri,setBankStatement)})}
  ;
  const getProfileImg = () => {
    pickImage(doc => {
      const uri = doc[0].fileCopyUri;
      //const name=doc[0].name;
      console.log('doc URI:', uri);saveImageStorage('profilePhotoIdentity',uri,setProfilePhoto)})
  };
  const getDLVAPlasticLicenseImg = () => {
   pickImage(doc => {
    const uri = doc[0].fileCopyUri;
   // const name=doc[0].name;
    console.log('doc URI:', uri);
    saveImageStorage('DLVAPlasticLicense',uri,setDLVAPlasticLicense)})
  };
  const getDLVAElectronicCounterpartCheckCodeImg = () => {
    pickImage(doc => {
      const uri = doc[0].fileCopyUri;
     // const name=doc[0].name;
      console.log('doc URI:', uri);
      saveImageStorage('DLVAElectronicCounterpartCheckCode',uri,setDLVAElectronicCounterpartCheckCode)})
  };
  const getinsuranceCertificateImg = () => {
   pickImage(doc => {
    const uri = doc[0].fileCopyUri;
    //const name=doc[0].name;
    console.log('doc URI:', uri);
    saveImageStorage('insuranceCertificate',uri,setInsuranceCertificate)})
  };
  const getinsuranceSupportingDocumentImg = () => {
    pickImage(doc => {
      const uri = doc[0].fileCopyUri;
      //const name=doc[0].name;
      console.log('doc URI:', uri);
      saveImageStorage('insuranceSupportingDocument',uri,setInsuranceSupportingDocument)})
  };
  const getMOTTestCertificateImg = () => {
    pickImage(doc => {
      const uri = doc[0].fileCopyUri;
      //const name=doc[0].name;
      console.log('doc URI:', uri);saveImageStorage('MOTTestCertificate',uri,setMOTTestCertificate)})
  };
  const getnationalInsuranceNumberImg = () => {
    pickImage(doc => {
      const uri = doc[0].fileCopyUri;
      //const name=doc[0].name;
      console.log('doc URI:', uri);
      saveImageStorage('nationalInsuranceNumber',uri,setNationalInsuranceNumber)})
  };
  const getPHVImg = () => {
    pickImage(doc => {
      const uri = doc[0].fileCopyUri;
     // const name=doc[0].name;
      console.log('doc URI:', uri);saveImageStorage('PHV',uri,setPHV)})
  };
  const getpublicLiabilityInsuranceImg = () => {
    pickImage(doc => {
      const uri = doc[0].fileCopyUri;
      //const name=doc[0].name;
      console.log('doc URI:', uri);
      saveImageStorage('publicLiabilityInsurance',uri,setPublicLiabilityInsurance)})
  };
  const getlogBookImg = () => {
    pickImage(doc => {
      const uri = doc[0].fileCopyUri;
      console.log('doc URI:', uri);
     // const name=doc[0].name;
      saveImageStorage('logBook',uri,setLogBook)})
  };
 
/*
  useEffect(() => {
    
    console.log('vals from context=>', user);
    console.log("userid",userId)
  }, []);*/

  const [isChecked, setIsChecked] = useState(false);
  const handleNextButton = () => {
    
    if (proofOfIdentity || DBS||bankStatement||profilePhoto||DLVAPlasticLicense||DLVAElectronicCounterpartCheckCode||insuranceCertificate||insuranceSupportingDocument||MOTTestCertificate||nationalInsuranceNumber||PHV||publicLiabilityInsurance||logBook||profileimage||isChecked) {
      
      navigator.navigate('ss');

      const eventData = {
             proofOfIdentity:proofOfIdentity,
              DBS:DBS,
              bankStatement:bankStatement,
              profilePhoto:profilePhoto,
              DLVAPlasticLicense:DLVAPlasticLicense,
              DLVAElectronicCounterpartCheckCode:DLVAElectronicCounterpartCheckCode,
              insuranceCertificate:insuranceCertificate,
              insuranceSupportingDocument:insuranceSupportingDocument,
              MOTTestCertificate:MOTTestCertificate,
              nationalInsuranceNumber:nationalInsuranceNumber,
              PHV:PHV,
              publicLiabilityInsurance:publicLiabilityInsurance,
              logBook:logBook,
      };
      docUpload(
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
      )
   //  Firestore.collection('testForCf').doc(user.email).update(
     // { documentUploadStatus: true,})
      console.log("User====>",user)
      console.log('obj doc sent is=>', eventData);



    }
  };

  const handleCheckboxToggle = () => {
    if (isChecked == true) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
    // setIsChecked(!isChecked);
    // console.log(isChecked);
  };
  const navigator = useNavigation();
  const renderHeader = () => {
    const renderSubPfp = () => {
      return (
        <View
          style={{
            // backgroundColor: 'pink',
            width: '50%',
            alignSelf: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: 80,
              width: 80,
              backgroundColor: 'grey',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
            }}>
                {profileimage ? (
        <Image
          source={{ uri: profileimage }}
          style={{ width: '100%', height: '100%', borderRadius: 100 }}
        />
      ) : (
        <Text style={{ fontSize: 50, color: 'white' }}>U</Text>
      )}
          
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 15,
            }}>
              <TouchableOpacity onPress={getUploadImg}>
                 <Text>Upload Image</Text>
              </TouchableOpacity>
          {/*
            <TouchableOpacity onPress={getdatatest}>
          <Text style={{color: 'red'}}>Storage Data</Text>
           </TouchableOpacity>
          */}   
           <TouchableOpacity onPress={removeProfileImg}>
           <Text style={{color: 'red'}}>Remove Image</Text>
           </TouchableOpacity>
           
           
          </View>
        </View>
      );
    };
    return (
      <View style={{}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>Welcome  {user?.firstName}</Text>
          <Text>Please provide some information to continue</Text>
          {renderSubPfp()}
          <Text>Here are the steps you must follow to register your account</Text>
        </View>
      </View>
    );
  };
  const identitySection = () => {
    return (
      <View style={{paddingVertical: 20}}>
        <View style={{backgroundColor: '#3A3A3A', paddingHorizontal: 15}}>
          <Text style={{color: AppColours.color_0_white_base}}>Identity</Text>
        </View>
        <View style={{width: '90%', alignSelf: 'center', padding: 10}}>
          <View
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              // backgroundColor: 'pink',
              width: '80%',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '900',
                  color: AppColours.Dark,
                }}>
                1. Proof of Identity
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '900',
                  color: AppColours.Dark,
                }}>
                Passport/Driver`s Licence
              </Text>
            </View>
            <TouchableOpacity
             onPress={getProofOfIdentityImg}
              style={{
                backgroundColor: proofOfIdentity ? '#38b000' : 'white',
                flexDirection: 'row',
                alignItems: 'center',
                width: 90,
                justifyContent: 'space-evenly',
                borderWidth: 1,
                borderRadius: 100,
                height: 22,
              }}>
              <Clip />
              <Text style={{fontSize: 12, color: proofOfIdentity ? 'white' : 'gray',}}>Attach a file</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              // backgroundColor: 'pink',
              width: '80%',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '900',
                  color: AppColours.Dark,
                }}>
                2. Disclosure and Barring
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '900',
                  color: AppColours.Dark,
                }}>
                {'Service (DBS)'}
              </Text>
            </View>
            <TouchableOpacity
            onPress={getDBSImg}
              style={{
                // backgroundColor: 'red',
                backgroundColor: DBS ? '#38b000' : 'white',
                flexDirection: 'row',
                alignItems: 'center',
                width: 90,
                justifyContent: 'space-evenly',
                borderWidth: 1,
                borderRadius: 100,
                height: 22,
              }}>
              <Clip />
              <Text style={{fontSize: 12, color: DBS ? 'white' : 'gray',}}>Attach a file</Text>
          
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              // backgroundColor: 'pink',
              width: '80%',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '900',
                  color: AppColours.Dark,
                }}>
                3. Bank Statement
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '900',
                  color: AppColours.Dark,
                }}>
                {'from last month'}
              </Text>
            </View>
            <TouchableOpacity
            onPress={getbankStatmentImg}
              style={{
                backgroundColor: bankStatement? '#38b000' : 'white',
                // backgroundColor: 'red',
                flexDirection: 'row',
                alignItems: 'center',
                width: 90,
                justifyContent: 'space-evenly',
                borderWidth: 1,
                borderRadius: 100,
                height: 22,
              }}>
              <Clip />
              <Text style={{fontSize: 12, color: bankStatement ? 'white' : 'gray',}}>Attach a file</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              // marginBottom: 10,
              flexDirection: 'row',
              // backgroundColor: 'pink',
              width: '80%',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '900',
                  color: AppColours.Dark,
                }}>
                {'4. Profile Photo (Recent)'}
              </Text>
              {/* <Text style={{fontSize:12,fontWeight:'900',color:AppColours.Dark}}>Passport/Driver`s Licence</Text> */}
            </View>
            <TouchableOpacity
            onPress={getProfileImg}
              style={{
                // backgroundColor: 'red',
                backgroundColor: profilePhoto ? '#38b000' : 'white',
                flexDirection: 'row',
                alignItems: 'center',
                width: 90,
                justifyContent: 'space-evenly',
                borderWidth: 1,
                borderRadius: 100,
                height: 22,
              }}>
              <Clip />
              <Text style={{fontSize: 12, color: profilePhoto ? 'white' : 'gray',}}>Attach a file</Text>
            </TouchableOpacity>
          </View>

          {/* <View
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              // backgroundColor: 'pink',
              width: '80%',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{fontSize:12,fontWeight:'900',color:AppColours.Dark}}>1. Proof of Identity</Text>
              <Text style={{fontSize:12,fontWeight:'900',color:AppColours.Dark}}>Passport/Driver`s Licence</Text>
            </View>
            <TouchableOpacity
              style={{
                // backgroundColor: 'red',
                flexDirection: 'row',
                alignItems: 'center',
                width: 90,
                justifyContent: 'space-evenly',
                borderWidth: 1,
                borderRadius: 100,
                height:22
              }}>
              <Clip />
              <Text style={{fontSize: 12}}>Attach a file</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    );
  };
  const drivingLicenseSection = () => {
    const Templat = (line1, line2) => {
      <View
        style={{
          marginBottom: 10,
          flexDirection: 'row',
          // backgroundColor: 'pink',
          width: '80%',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{fontSize: 12, fontWeight: '900', color: AppColours.Dark}}>
            {line1}
          </Text>
          <Text
            style={{fontSize: 12, fontWeight: '900', color: AppColours.Dark}}>
            {line2}
          </Text>
        </View>
        <TouchableOpacity
        onPress={getDLVAPlasticLicenseImg}
          style={{
            // backgroundColor: 'red',
            backgroundColor: DLVAPlasticLicense ? '#38b000' : 'white',
            flexDirection: 'row',
            alignItems: 'center',
            width: 90,
            justifyContent: 'space-evenly',
            borderWidth: 1,
            borderRadius: 100,
            height: 22,
          }}>
          <Clip />
          <Text style={{fontSize: 12, color: DLVAPlasticLicense ? 'white' : 'gray',}}>Attach a file</Text>
        </TouchableOpacity>
      </View>;
    };
    return (
      <View style={{}}>
        <View style={{backgroundColor: '#3A3A3A', paddingHorizontal: 15}}>
          <Text style={{color: AppColours.color_0_white_base}}>
            Driving Licence
          </Text>
        </View>
        <View style={{width: '90%', alignSelf: 'center', padding: 10}}>
          <View
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              // backgroundColor: 'pink',
              width: '80%',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '900',
                  color: AppColours.Dark,
                }}>
                1. DVLA Plastic Driving
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '900',
                  color: AppColours.Dark,
                }}>
                Licence
              </Text>
            </View>
            <TouchableOpacity
            onPress={getDLVAPlasticLicenseImg}
              style={{
                backgroundColor: DLVAPlasticLicense ? '#38b000' : 'white',
                // backgroundColor: 'red',
                flexDirection: 'row',
                alignItems: 'center',
                width: 90,
                justifyContent: 'space-evenly',
                borderWidth: 1,
                borderRadius: 100,
                height: 22,
              }}>
              <Clip />
              <Text style={{fontSize: 12, color: DLVAPlasticLicense ? 'white' : 'gray',}}>Attach a file</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              // backgroundColor: 'pink',
              width: '80%',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '900',
                  color: AppColours.Dark,
                }}>
                2. DVLA Electronic
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '900',
                  color: AppColours.Dark,
                }}>
                Counterpart Check Code
              </Text>
            </View>
            <TouchableOpacity
            onPress={getDLVAElectronicCounterpartCheckCodeImg}
              style={{
                // backgroundColor: 'red',
                backgroundColor: DLVAElectronicCounterpartCheckCode ? '#38b000' : 'white',
                flexDirection: 'row',
                alignItems: 'center',
                width: 90,
                justifyContent: 'space-evenly',
                borderWidth: 1,
                borderRadius: 100,
                height: 22,
              }}>
              <Clip />
              <Text style={{fontSize: 12, color: DLVAElectronicCounterpartCheckCode ? 'white' : 'gray',}}>Attach a file</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              // backgroundColor: 'pink',
              width: '80%',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '900',
                  color: AppColours.Dark,
                }}>
                1. Insurance Certificate 
              </Text>
            </View>
            <TouchableOpacity
            onPress={getinsuranceCertificateImg}
              style={{
                backgroundColor: insuranceCertificate ? '#38b000' : 'white',
                // backgroundColor: 'red',
                flexDirection: 'row',
                alignItems: 'center',
                width: 90,
                justifyContent: 'space-evenly',
                borderWidth: 1,
                borderRadius: 100,
                height: 22,
              }}>
              <Clip />
              <Text style={{fontSize: 12, color: insuranceCertificate ? 'white' : 'gray',}}>Attach a file</Text>
          
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              // backgroundColor: 'pink',
              width: '80%',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '900',
                  color: AppColours.Dark,
                }}>
                2. Insurance Supporting
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '900',
                  color: AppColours.Dark,
                }}>
                Documents
              </Text>
            </View>
            <TouchableOpacity
              onPress={getinsuranceSupportingDocumentImg}
              style={{
                // backgroundColor: 'red',
                backgroundColor: insuranceSupportingDocument ? '#38b000' : 'white',
                flexDirection: 'row',
                alignItems: 'center',
                width: 90,
                justifyContent: 'space-evenly',
                borderWidth: 1,
                borderRadius: 100,
                height: 22,
              }}>
              <Clip />
              <Text style={{fontSize: 12, color: insuranceSupportingDocument ? 'white' : 'gray',}}>Attach a file</Text>
          
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              // backgroundColor: 'pink',
              width: '80%',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '900',
                  color: AppColours.Dark,
                }}>
                3. MOT Test Certificate
              </Text>
              {/* <Text style={{fontSize:12,fontWeight:'900',color:AppColours.Dark}}>
              Documents
</Text> */}
            </View>
            <TouchableOpacity
            onPress={getMOTTestCertificateImg}
              style={{
                // backgroundColor: 'red',
                backgroundColor: MOTTestCertificate ? '#38b000' : 'white',
                flexDirection: 'row',
                alignItems: 'center',
                width: 90,
                justifyContent: 'space-evenly',
                borderWidth: 1,
                borderRadius: 100,
                height: 22,
              }}>
              <Clip />
              <Text style={{fontSize: 12, color: MOTTestCertificate ? 'white' : 'gray',}}>Attach a file</Text>
          
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              // backgroundColor: 'pink',
              width: '80%',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '900',
                  color: AppColours.Dark,
                }}>
                4. National Insurance
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '900',
                  color: AppColours.Dark,
                }}>
                {'Number (Photo)'}
              </Text>
            </View>
            <TouchableOpacity
            onPress={getnationalInsuranceNumberImg}
              style={{
                // backgroundColor: 'red',
                backgroundColor: nationalInsuranceNumber ? '#38b000' : 'white',
                flexDirection: 'row',
                alignItems: 'center',
                width: 90,
                justifyContent: 'space-evenly',
                borderWidth: 1,
                borderRadius: 100,
                height: 22,
              }}>
              <Clip />
              <Text style={{fontSize: 12, color: nationalInsuranceNumber ? 'white' : 'gray',}}>Attach a file</Text>
              </TouchableOpacity>
          </View>

          <View
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              // backgroundColor: 'pink',
              width: '80%',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '900',
                  color: AppColours.Dark,
                }}>
                5. Private Hire Vehicle
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '900',
                  color: AppColours.Dark,
                }}>
                {'Licence (PHV)'}
              </Text>
            </View>
            <TouchableOpacity
            onPress={getPHVImg}
               style={{
                // backgroundColor: 'red',
                backgroundColor: PHV ? '#38b000' : 'white',
                flexDirection: 'row',
                alignItems: 'center',
                width: 90,
                justifyContent: 'space-evenly',
                borderWidth: 1,
                borderRadius: 100,
                height: 22,
              }}>
              <Clip />
              <Text style={{fontSize: 12, color: PHV ? 'white' : 'gray',}}>Attach a file</Text>
               </TouchableOpacity>
          </View>

          <View
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              // backgroundColor: 'pink',
              width: '80%',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '900',
                  color: AppColours.Dark,
                }}>
                6. Public Liability Insurance
              </Text>
            </View>
            <TouchableOpacity
          onPress={getpublicLiabilityInsuranceImg}
              style={{
                // backgroundColor: 'red',
                backgroundColor: publicLiabilityInsurance ? '#38b000' : 'white',
                flexDirection: 'row',
                alignItems: 'center',
                width: 90,
                justifyContent: 'space-evenly',
                borderWidth: 1,
                borderRadius: 100,
                height: 22,
              }}>
              <Clip />
              <Text style={{fontSize: 12, color: publicLiabilityInsurance ? 'white' : 'gray',}}>Attach a file</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              // backgroundColor: 'pink',
              width: '80%',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '900',
                  color: AppColours.Dark,
                }}>
                {'7. Logbook (V5C)'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={getlogBookImg}
              style={{
                // backgroundColor: 'red',
                backgroundColor: logBook ? '#38b000' : 'white',
                flexDirection: 'row',
                alignItems: 'center',
                width: 90,
                justifyContent: 'space-evenly',
                borderWidth: 1,
                borderRadius: 100,
                height: 22,
              }}>
              <Clip />
              <Text style={{fontSize: 12, color: logBook ? 'white' : 'gray',}}>Attach a file</Text>
            </TouchableOpacity>
          </View> 
        </View>
      </View>
    );
  };
  const tncSection = () => {
    return (
      <View style={{paddingVertical: 20}}>
        <View style={{backgroundColor: '#3A3A3A', paddingHorizontal: 15}}>
          <Text style={{color: AppColours.color_0_white_base}}>
            Terms and Conditions
          </Text>
        </View>
        <View style={{width: '90%', alignSelf: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <CheckBox
              // title="Click on agree to continue"
              checked={isChecked}
              onPress={handleCheckboxToggle}
            />
            <Text style={{marginLeft: -20}}>I agree to the following</Text>
            <Text style={{marginLeft: 4}}>Terms & Conditions</Text>
          </View>
        </View>
      </View>
    );
  };
  const renderFooter = () => {
    return (
      <TouchableOpacity
      disabled={!proofOfIdentity || !DBS||!bankStatement||!profilePhoto||!DLVAPlasticLicense||!DLVAElectronicCounterpartCheckCode||!insuranceCertificate||!insuranceSupportingDocument||!MOTTestCertificate||!nationalInsuranceNumber||!PHV||!publicLiabilityInsurance||!logBook||!profileimage||!isChecked}
      
        style={{
          borderWidth: 0.5,
          width: '90%',
          borderRadius: 100,
          padding: 15,
          alignSelf: 'center',
          alignItems: 'center',
          backgroundColor: AppColours.AppBackGroundDefalut,
        }}
        onPress={() => handleNextButton()}>
          {loading?<ActivityIndicator color={AppColours.color_0_white_base}/>:<Text style={{color: 'white'}}>Save Data</Text>}
        
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView>
      <View style={{height: height + 300}}>
        <SafeAreaView>
          <StatusBar backgroundColor={AppColours.AppBackGroundDefalut} />
          <View style={{paddingVertical: 20}}>
            {renderHeader()}
            {identitySection()}
            {drivingLicenseSection()}
            {tncSection()}
            {renderFooter()}
          </View>
          
          {/* <View 
        style={{
          // backgroundColor: 'pink',
           height: height
           }}>
          {renderCredenialsInput()}
          {renderOprButtons()}
          {renderFooter()}
        </View> */}
        </SafeAreaView>
      </View>
    </ScrollView>
  );
}