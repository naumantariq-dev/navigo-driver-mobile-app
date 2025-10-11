import axios from 'axios';

const server = `https://us-central1-navigo-taxi.cloudfunctions.net/driversApi`;

const getDriverUrl = `${server}/getDriver`;
const getPtmUrl = `${server}/getPtm`;
const getCitiesUrl=`${server}/cities`;
const getRidesHistoryUrl=`${server}/getRideHistory`;
const getRidesEarningsUrl=`${server}/getEarning`;


const setActivityFlagUrl = `${server}/onDriverActivity`;
const setUserDataUrl = `${server}/onDriverSignup`;
const updateActiveLocationUrl = `${server}/updateLocation`;
const forGoogleSigningOperationsUrl=`${server}/forGoogle`;
const setPaymentMethodUrl=`${server}/setPayment`;
const setSecurityFlagUrl=`${server}/setSecurityFlag`;
const setSecurityKeyUrl=`${server}/setKey`;
const setSecurityAnswersUrl=`${server}/setAnswers`;
const setStoragePathUrl=`${server}/links`;
const setDocUploadStatusUrl=`${server}/docStatus`;

const setRideStatusUrl=`${server}/rideCompleted`;

const setRideProgressFlagUrl=`${server}/rideStatus`;

const setRideProgressFlagForTimeoutUrl=`${server}/rideTimeout`;



export const setUserData = (data, token) => {
  return new Promise((resolve, reject) => {
    apiCall(data, setUserDataUrl, token, 'setUserData');
  });
};
export const setActivityFlag = (data, token) => {
  return new Promise((resolve, reject) => {
    apiCall(data, setActivityFlagUrl, token, 'setActivityStatus');
  });
};
export const setDocUploadStatus = (data, token) => {
  return new Promise((resolve, reject) => {
    resolve(apiCall(data, setDocUploadStatusUrl, token, 'docStatus'));
  });
};

export const getDriver = (data, token) => {
  return new Promise((resolve, reject) => {
    resolve(apiCall(data, getDriverUrl, token, 'getDriver'));
  });
};

export const updateActiveLocation = (data, token) => {
  return new Promise((resolve, reject) => {
    apiCall(data, updateActiveLocationUrl, token, 'updateActiveLocation');
  });
};

export const forGoogleSigningOperations = (data, token) => {
  return new Promise((resolve, reject) => {
    resolve(apiCall(data, forGoogleSigningOperationsUrl, token, 'forGoogle'));
  });
};

export const setPaymentMethod = (data, token) => {
  return new Promise((resolve, reject) => {
    apiCall(data, setPaymentMethodUrl, token, 'updateActiveLocation');
  });
};

export const setSecurityFlag = (data, token) => {
  return new Promise((resolve, reject) => {
    resolve(apiCall(data, setSecurityFlagUrl, token, 'setSecurityFlag'));
  });
};

export const setSecurityKey = (data, token) => {
  return new Promise((resolve, reject) => {
    apiCall(data, setSecurityKeyUrl, token, 'setKey');
  });
};

export const setSecurityAnswers = (data, token) => {
  return new Promise((resolve, reject) => {
    apiCall(data, setSecurityAnswersUrl, token, 'setAnswers');
  });
};

export const getPtm = (data, token) => {
  return new Promise((resolve, reject) => {
    resolve(apiCall(data, getPtmUrl, token, 'getPtm'));
  });
};

export const setStoragePath = (data, token) => {
  return new Promise((resolve, reject) => {
    resolve(apiCall(data, setStoragePathUrl, token, 'links'));
  });
};

export const getCities = (data, token) => {
  return new Promise((resolve, reject) => {
    resolve(apiCall(data, getCitiesUrl, token, 'cities'));
  });
};

export const setRideStatus = (data, token) => {
  return new Promise((resolve, reject) => {
    resolve(apiCall(data, setRideStatusUrl, token, 'rideCompleted'));
  });
};

export const setRideProgressFlag = (data, token) => {
  return new Promise((resolve, reject) => {
    resolve(apiCall(data, setRideProgressFlagUrl, token, 'rideStatus'));
  });
};

export const getRidesHistory = (data, token) => {
  return new Promise((resolve, reject) => {
    resolve(apiCall(data, getRidesHistoryUrl, token, 'getRideHistory'));
  });
};

export const getDriverEarnings = (data, token) => {
  return new Promise((resolve, reject) => {
    resolve(apiCall(data, getRidesEarningsUrl, token, 'getEarning'));
  });
};

export const setRideProgressFlagForTimeout = (data, token) => {
  return new Promise((resolve, reject) => {
    resolve(apiCall(data, setRideProgressFlagForTimeoutUrl, token, 'rideTimeout'));
  });
};

const apiCall = async (eventData, apiUrl, Token, name) => {
  try {
    //console.log('api calling mixes', eventData, apiUrl);
    const url = apiUrl;
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Max-Age': '0',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Authorization',
      authorization: Token,
    };
    const APIData = await axios.post(
      url,
      {
        ...eventData,
      },
      {
        headers: headers,
      },
    );
    //console.log('API Response', APIData.data,name);
    container = JSON.stringify(APIData);
    // console.log('wild west=>',container);

    return APIData.data;
  } catch (error) {
    // crashlytics().recordError(error);
    console.log('error in api=>',error);
  }
};

// const res = {
//   additionalUserInfo: {
//     isNewUser: true,
//     profile: {
//       aud: '864608395746-mgu26rcs616f8fa6137sp44g5s08gk8j.apps.googleusercontent.com',
//       azp: '864608395746-npvlve6abf90hkvbevpioq16d0n7b300.apps.googleusercontent.com',
//       email: 'qutb.arfeen@boomaenterprises.com',
//       email_verified: true,
//       exp: 1691848730,
//       family_name: 'Arfeen',
//       given_name: 'Qutb ul',
//       iat: 1691845130,
//       iss: 'https://accounts.google.com',
//       locale: 'en',
//       name: 'Qutb ul Arfeen',
//       picture:
//         'https://lh3.googleusercontent.com/a/AAcHTtfwXxZd7_fsHYoSxy6JC_ZlDhWiWoLtcola3yg6F4bJ=s96-c',
//       sub: '104187644032464153385',
//     },
//     providerId: 'google.com',
//   },
//   user: {
//     displayName: 'Qutb ul Arfeen',
//     email: 'qutb.arfeen@boomaenterprises.com',
//     emailVerified: true,
//     isAnonymous: false,
//     metadata: [Object],
//     multiFactor: [Object],
//     phoneNumber: null,
//     photoURL:
//       'https://lh3.googleusercontent.com/a/AAcHTtfwXxZd7_fsHYoSxy6JC_ZlDhWiWoLtcola3yg6F4bJ=s96-c',
//     providerData: [Array],
//     providerId: 'firebase',
//     tenantId: null,
//     uid: 'ur8dYkcvP9Mzmhpr2rcRh1jfM2R2',
//   },
// };
