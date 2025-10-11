import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import AppColours from '../../appStyles/AppColours';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const BottombbBar = () => {
  return (
    <View style={styles.bbCont}>
      <View style={styles.bbBar}>
        {/* <Text style={styles.text}>This is the bottom bbBar</Text> */}
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View
            style={{
              backgroundColor: '#00BB13',
              borderRadius: 100,
              alignItems: 'center',
              width: '20%',
            }}>
            <Text style={{color: 'white'}}>Online</Text>
          </View>
          <View
            style={{
              backgroundColor: '#6AB9BF',
              borderRadius: 100,
              alignItems: 'center',
              width: '20%',
            }}>
            <Text style={{color: 'white'}}>Offline</Text>
          </View>
        </View>
        <View style={styles.bbIconnsBar}>
          <FontAwesome5
            name="location-arrow"
            size={30}
            color={'white'}
            // style={{alignSelf: 'center'}}
          />
          <FontAwesome5
            name="signal"
            size={30}
            color={'white'}
            // style={{alignSelf: 'center'}}
          />
          <Ionicons
            name="notifications"
            size={30}
            color={'white'}
            // style={{alignSelf: 'center'}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bbCont: {
    // position: 'absolute',
    // bottom: 0,
    width: '100%',
    // top:50,
  },
  bbbbBar: {
    backgroundColor: AppColours.AppBackGroundDefalut,
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    height: '30%',
    justifyContent: 'space-evenly',
    // padding:20
  },
  bbIconnsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor:'pink'
  },
  // text: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   color: 'white',
  // },
});

export default BottombbBar;
