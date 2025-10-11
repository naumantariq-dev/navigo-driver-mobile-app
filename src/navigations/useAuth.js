import React, { useContext, useEffect,useState } from "react";
import { getAuth, onAuthStateChanged, User } from "@react-native-firebase/auth";
import { AuthContext } from "../contextApi/AuthProvider";

const auth = getAuth();

export function useAuth() {
    let {user, setUser, online, isOnline, logout} = useContext(AuthContext);
  useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
      } else {
        // User is signed out
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStateChanged;
  }, []);

  return {
    user,
  };
}