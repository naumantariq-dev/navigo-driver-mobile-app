import React, { useContext, useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import AppColours from '../../../appStyles/AppColours';
import { StackActions, useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contextApi/AuthProvider';

const { width } = Dimensions.get('screen');

export default function CreatePassword() {
  const { user, register, error, setError } = useContext(AuthContext);
  const navigator = useNavigation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleConfirm = async () => {
    if (!password || !confirmPassword) {
      setError('Please fill in both password fields');
    } else if (password.length < 6) {
      setError('Password should be at least 6 characters');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError(null); // Reset error state
      const registrationSuccessful = await register(
        user?.email,
        confirmPassword,
        user?.firstName,
        user?.lastName,
        user?.phno,
        user?.city
      );

      // if (registrationSuccessful) {
        navigator.dispatch(StackActions.replace('vs'));
        // navigator.navigate('vs')
      // }
    }
  };

  useEffect(() => {
    // Optional: You can put additional logic here if needed
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <View>
      <SafeAreaView>
        <StatusBar backgroundColor={AppColours.AppBackGroundDefalut} />
        <View style={{ paddingVertical: 50, width: '90%', alignSelf: 'center' }}>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.createPasswordText}>Create Password</Text>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TextInput
              placeholder="Enter password"
              style={styles.input}
              autoCapitalize="none"
              secureTextEntry={true}
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                setError(null);
              }}
            />
            <TextInput
              placeholder="Re-enter password"
              style={styles.input}
              secureTextEntry={true}
              autoCapitalize="none"
              value={confirmPassword}
              onChangeText={(value) => {
                setConfirmPassword(value);
                setError(null);
              }}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>
            Already have an account?{' '}
            <Text
              style={styles.signInLink}
              onPress={() => navigator.dispatch(StackActions.replace('login'))}>
              Sign In
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = {
  createPasswordText: {
    color: AppColours.Dark,
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    paddingLeft: 15,
    borderWidth: 0.5,
    marginBottom: 20,
    width: '100%',
    borderRadius: 100,
  },
  errorText: {
    color: 'red',
    fontWeight: '300',
    fontSize: 10,
    paddingLeft: 15,
  },
  buttonContainer: {
    alignSelf: 'center',
    marginBottom: 40,
  },
  confirmButton: {
    backgroundColor: AppColours.AppBackGroundDefalut,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    borderRadius: 100,
  },
  buttonText: {
    color: AppColours.color_0_white_base,
  },
  signInContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  signInText: {
    color: AppColours.color_0_white_darkest,
  },
  signInLink: {
    color: '#6AB9BF',
  },
};
