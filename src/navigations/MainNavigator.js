import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Appstack from './AppStack';
import {AuthContext, AuthProvider} from '../contextApi/AuthProvider';
import AuthStack from './AuthStack';
import Routes from './Routes';
import FlashMessage from 'react-native-flash-message';

//bridge
export default function NavProvider() {
  // let {user, setUser, online, isOnline} = useContext(AuthContext);
  // // useEffect(() => {
  // //   onAuthStateChanged = user => {
  // //     setUser(user);
  // //     // if (initializing) setInitializing(false);
  // //   };
  // // }, []);
  return (
    <AuthProvider>
      <NavigationContainer>
        <Appstack />
        {/* <Routes/> */}
        <FlashMessage position="top" />
      </NavigationContainer>
    </AuthProvider>
  );
}

// export default MainNavigator();
