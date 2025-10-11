import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AddressPickup from './AddressPickup';
import { showErrorToast, showSuccessToast } from '../../toaster/Toast';
import { AuthContext } from '../../contextApi/AuthProvider';

const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');



const TestScreen = (props) => {
  let {dropName, setDropName, pickName, setPickName,setRideOngoingFlag} = useContext(AuthContext);
  const navigator = useNavigation();
  // const[pickUpName,setPickUpName]=useState(null)
  // const[dropOffName,setDropOffName]=useState(null)
  const [ride, setRide] = useState({
    pickupCords: {},
    dropLocation: {},
  });
const{
  pickupCords,
  dropLocation}=ride

const validator=()=>{
  if (Object.keys(pickupCords).length===0) {
    showErrorToast('Location dalo bhae pehle')
    return false
  }
  if (Object.keys(dropLocation).length===0) {
    showErrorToast('Location dalo bhae pehle')
    return false
  }
  return true
}



const forPickup = (lat, lng,name) => {
    console.log('pickup =>>', lat, lng);
    setPickName(name)
    setRide((prevRide) => ({
      ...prevRide,
      pickupCords: {
        latitude: lat,
        longitude: lng,
      },
    }));
  };

  const forDropOff = (lat, lng,name) => {
    console.log('dropOff =>>', lat, lng);
    setDropName(name)
    setRide((prevRide) => ({
      ...prevRide,
      dropLocation: {
        latitude: lat,
        longitude: lng,
      },
    }));
  };

  const onDone = () => {
    const flag= validator();
    console.log(flag);
    if (flag) {
      props.route.params.getCords({
        pickupCords,
        dropLocation,
      });
      setRideOngoingFlag(true)
      // props.route.params.getCords({
      //   dropLocation
      // });
      // console.log(props);
      showSuccessToast('mubarkan mubarkan :>')
      navigator.goBack();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <AddressPickup placeholder="where from?" fetchAddress={forPickup} />
        <AddressPickup placeholder="where to?" fetchAddress={forDropOff} />
        <TouchableOpacity
          style={{
            backgroundColor: 'pink',
            justifyContent: 'center',
            width: '50%',
            alignSelf: 'center',
            alignItems: 'center',
          }}
          onPress={onDone}
        >
          <Text>gooo</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default TestScreen;
