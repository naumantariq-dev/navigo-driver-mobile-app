import {showMessage} from 'react-native-flash-message';
const showErrorToast = message => {
  showMessage({
    message,
    type: 'danger',
    icon: 'danger',
  });
};

const showSuccessToast = message => {
  showMessage({
    message,
    type: 'success',
    icon: 'success',
  });
};

export {showErrorToast, showSuccessToast};
