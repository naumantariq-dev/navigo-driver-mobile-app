import React from 'react';
import {
  View,
  TouchableOpacity,
  Button,
  Text,
  StyleSheet,
  Modal,
  SafeAreaView,
} from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import RoundCheckbox from 'rn-round-checkbox';
import {Calendar} from 'react-native-calendars';

const Stats2 = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [statsmodel, setstatsmodel] = useState(false);
  return (
    <View style={StyleSheet.mainContainer}>
      <Modal visible={statsmodel} animationType="slide">
        <Icon
          name={'close'}
          size={29}
          onPress={() => setstatsmodel(false)}
          style={{alignSelf: 'flex-end', marginRight: 19}}
        />
        {Box1()}
        {Buttons()}
        <Box2 />
        <Details />
        <Box3 />
      </Modal>
      <View style={{justifyContent: 'flex-end', alignItems: 'center'}}>
        <Icon name={'plus'} size={29} onPress={() => setstatsmodel(true)} />
      </View>
    </View>
  );
};

const Box1 = () => {
  const [balance, setbalance] = useState(150);

  return (
    <View style={ {   flexDirection: 'column',
    width: '90%',
    marginLeft: 20,
    borderRadius: 13,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 10,}}>
      <View style={{
    //backgroundColor:'blue',
    flexDirection: 'column',
    paddingHorizontal: 13,
    paddingVertical: 10,
  }}>
        <Text style={{color: 'black', fontSize: 14}}>Wallet Balance</Text>
        <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
          {balance}
        </Text>
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
    <View style={{
        flexDirection: 'row',
        //backgroundColor:'pink',
        justifyContent: 'space-around',
        marginTop: 10,
      }}>
      <TouchableOpacity style={{
    backgroundColor: '#6ABABD',
    width: 135,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  }}>
        <Text style={{color: 'black', fontSize: 14}}>Monthly</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
    backgroundColor: '#6ABABD',
    width: 135,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  }} onPress={handleShowGrayBox}>
        <Text style={{color: 'black', fontSize: 14}}>Filter By Date</Text>
      </TouchableOpacity>
      {showGrayBox && (
        <View style={{
            marginTop: 40,
            position: 'absolute',
            width: '90%',
            height: 200,
            borderRadius: 4,
            backgroundColor: '#ced4da',
            borderWidth: 1,
            paddingVertical: 5,
            borderColor: 'black',
            flexDirection: 'row',
            zIndex: 1,
          }}>
          <View>
            {Array.from({length: 7}).map((_, index) => (
              <View
                style={{
                  flexDirection: 'column',
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                }}
                key={index}>
                {/* <RoundCheckbox
                  size={15}
                  checked={true}
                  backgroundColor={'white'}
                  iconColor={'black'}
                  onValueChange={newValue => {
                    console.log(newValue);
                  }}
                /> */}
              </View>
            ))}
          </View>
          <View
            style={{
              flexDirection: 'column',
              paddingHorizontal: 10,
              paddingVertical: 4,
            }}>
            {data.map((x, index) => {
              return (
                <Text style={{marginBottom: 6}} key={index}>
                  {x}
                </Text>
              );
            })}
          </View>

          <Calendar />
        </View>
      )}
    </View>
  );
};

const Box2 = () => {
  const data = [
    {height: 9, day: 'Sun '},
    {height: 120, day: 'Sat '},
    {height: 60, day: 'Fri '},
    {height: 100, day: 'Thur'},
    {height: 140, day: 'Wed'},
    {height: 90, day: 'Tue '},
    {height: 70, day: 'Mon'},
  ];
  /*
      
      */
  const [date, setdate] = useState('10 Oct - 14 Oct');
  const [balance, setbalance] = useState(1213);
  return (
    <View style={{
        flexDirection: 'column',
        width: '90%',
        marginLeft: 20,
        borderRadius: 13,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 10,
      }}>
      <View style={{
    //backgroundColor:'blue',
    flexDirection: 'column',
    //paddingHorizontal:12,
    paddingVertical: 10,
    alignItems: 'center',
  }}>
        <Text style={{color: 'gray', fontSize: 12}}>{date}</Text>
        <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
          {balance}
        </Text>
      </View>
      <View style={{
    flexDirection: 'column',
    //backgroundColor:'green',
    paddingHorizontal: 3,
    paddingVertical: 3,
  }}>
        <View style={{
    //backgroundColor:'blue',
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 10,
    //alignItems:'center'
  }}>
          {data.map((item, index) => (
            <View key={index} style={{
                flexDirection: 'column-reverse',
                //backgroundColor:'pink',
                //alignItems: 'center',
                marginBottom: 0,
              }}>
              <View key={index} style={{flexDirection: 'column'}}>
                <Text
                  style={{marginLeft: 13, fontWeight: 'bold', color: 'black'}}>
                  {item.day}
                </Text>
              </View>

              <View style={[{width: 20,
    backgroundColor: '#6ABABD',
    borderRadius: 5,
    marginBottom: 0,
    marginLeft: 15,
  height: item.height}]} />
            </View>
          ))}
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
    <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        //backgroundColor:'pink',
        marginTop: 10,
        marginBottom: 10,
      }}>
      <View style={{flexDirection: 'column',}}>
        <Text>Earned Today</Text>
        <Text>{trips}</Text>
      </View>
      <View style={{flexDirection: 'column',}}>
        <Text>Time Online</Text>
        <Text>{timeOnline}</Text>
      </View>
      <View style={{flexDirection: 'column',}}>
        <Text>Total Distance</Text>
        <Text>{distance} miles</Text>
      </View>
    </View>
  );
};

const Box3 = () => {
  const [earning, setearning] = useState(15);
  const [trips, settrips] = useState(13);
  const [timeOnline, settimeOnline] = useState('8h 10m');
  const [distance, setdistance] = useState('57');

  return (
    <View style={{
        flexDirection: 'column',
        width: '90%',
        marginLeft: 20,
        borderRadius: 13,
        borderColor: 'black',
        borderWidth: 1,
      }}>
      <View style={{
    //backgroundColor:'blue',
    flexDirection: 'column',
    paddingHorizontal: 13,
    paddingVertical: 6,
  }}>
        <Text style={{fontSize: 14}}>Earned Today</Text>
        <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
          {earning}
        </Text>
      </View>
      <View style={{
    width: '90%',
    height: 1.2,
    backgroundColor: 'gray',
    marginLeft: 12,
  }} />
      <View style={{
    //backgroundColor:'green',
    flexDirection: 'row',
    paddingHorizontal: 13,
    paddingVertical: 6,
    justifyContent: 'space-between',
  }}>
        <View style={{
    flexDirection: 'column',
    //backgroundColor:'pink'
  }}>
          <Text style={{fontSize: 14}}>Total Trips</Text>
          <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
            {trips}
          </Text>
        </View>
        <View style={{
    flexDirection: 'column',
    //backgroundColor:'pink'
  }}>
          <Text style={{fontSize: 14}}>Time Online</Text>
          <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
            {timeOnline}
          </Text>
        </View>
        <View style={{
    flexDirection: 'column',
    //backgroundColor:'pink'
  }}>
          <Text style={{fontSize: 14}}>Total Distance</Text>
          <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
            {distance} miles
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  //---box1----
  box1: {
    flexDirection: 'column',
    width: '90%',
    marginLeft: 20,
    borderRadius: 13,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 10,
  },
  box1part1: {
    //backgroundColor:'blue',
    flexDirection: 'column',
    paddingHorizontal: 13,
    paddingVertical: 10,
  },

  line: {
    width: '90%',
    height: 1.2,
    backgroundColor: 'gray',
    marginLeft: 12,
  },
  //-----2 buttons box
  buttonconatiner: {
    flexDirection: 'row',
    //backgroundColor:'pink',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#6ABABD',
    width: 135,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  //---box2----
  box2: {
    flexDirection: 'column',
    width: '90%',
    marginLeft: 20,
    borderRadius: 13,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 10,
  },
  box2part1: {
    //backgroundColor:'blue',
    flexDirection: 'column',
    //paddingHorizontal:12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  box2part2container: {
    flexDirection: 'column',
    //backgroundColor:'green',
    paddingHorizontal: 3,
    paddingVertical: 3,
  },
  box2part2: {
    //backgroundColor:'blue',
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 10,
    //alignItems:'center'
  },
  barbox: {
    flexDirection: 'column-reverse',
    //backgroundColor:'pink',
    //alignItems: 'center',
    marginBottom: 0,
  },
  bar: {
    width: 20,
    backgroundColor: '#6ABABD',
    borderRadius: 5,
    marginBottom: 0,
    marginLeft: 15,
  },
  box2part2text: {
    //backgroundColor:'yellow',
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 10,

    //alignItems:'center'
  },

  //---box1----
  box3: {
    flexDirection: 'column',
    width: '90%',
    marginLeft: 20,
    borderRadius: 13,
    borderColor: 'black',
    borderWidth: 1,
  },
  box3part1: {
    //backgroundColor:'blue',
    flexDirection: 'column',
    paddingHorizontal: 13,
    paddingVertical: 6,
  },

  box3part2: {
    //backgroundColor:'green',
    flexDirection: 'row',
    paddingHorizontal: 13,
    paddingVertical: 6,
    justifyContent: 'space-between',
  },
  box3part2data: {
    flexDirection: 'column',
    //backgroundColor:'pink'
  },
  line: {
    width: '90%',
    height: 1.2,
    backgroundColor: 'gray',
    marginLeft: 12,
  },
  //----detailsContainer---
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    //backgroundColor:'pink',
    marginTop: 10,
    marginBottom: 10,
  },
  detailsContainerdata: {
    flexDirection: 'column',
    //backgroundColor:'green'
  },
  grayBox: {
    marginTop: 40,
    position: 'absolute',
    width: '90%',
    height: 200,
    borderRadius: 4,
    backgroundColor: '#ced4da',
    borderWidth: 1,
    paddingVertical: 5,
    borderColor: 'black',
    flexDirection: 'row',
    zIndex: 1,
  },
});

export default Stats2;
