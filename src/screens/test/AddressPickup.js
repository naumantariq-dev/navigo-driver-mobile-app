import React, {useContext} from 'react';
import {View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {AuthContext} from '../../contextApi/AuthProvider';

const AddressPickup = ({placeholder, fetchAddress}) => {
  const api = 'AIzaSyAXY0KXAGloxJe_eB22yrq_USUpT9lXezk';
//   let {dropName, setDropName, pickName, setPickName} = useContext(AuthContext);
  const onFetchAddress = (data, details) => {
    console.log('details=>', details);
    console.log('formatted_address=>', details.name);
    if (details && details.geometry && details.geometry.location) {
      // console.log('ehherher=>',details.geometry && details.geometry.location);
      const {lat, lng} = details.geometry.location;
      const name = details.name;
      fetchAddress(lat, lng, name);
    }
  };

  return (
    <View style={{flex: 1}}>
      <GooglePlacesAutocomplete
        fetchDetails={true}
        enableHighAccuracyLocation={true}
        styles={{width: 200, borderWidth: 1, alignSelf: 'center'}}
        placeholder={placeholder}
        onPress={onFetchAddress}
        query={{
          key: api,
          language: 'en',
        }}
      />
    </View>
  );
};

export default AddressPickup;
