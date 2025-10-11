import React, {useEffect, useRef, useState} from 'react';
import {Animated, Text, View} from 'react-native';

const CountdownComponent = () => {
  const [progress, SetProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, 60],
    outputRange: ['0%', '100%'],
  });

  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 20,
          borderRadius: 20,
          backgroundColor: '#00000020',
        }}>
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: '#473FA5',
            },
            {
              width: progressAnim,
            },
          ]}></Animated.View>
      </View>
    );
  };

  return <View style={{alignItems: 'center'}}>{renderProgressBar()}</View>;
};

export default CountdownComponent;
