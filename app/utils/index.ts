import {Constants, Languages} from '../common';
import {
  Dimensions,
  Platform,
  StatusBar,
  I18nManager,
} from 'react-native';

export const {width, height} = Dimensions.get('window');

export const isIOS = Platform.OS == 'ios';
export const isRTL = I18nManager.isRTL;

export const isIphoneX = () => {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  );
};

export const ifIphoneX = (iphoneXStyle:any, regularStyle:any) => {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
};

export const getStatusBarHeight = (safe?: boolean) => {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight,
    default: 0,
  });
};

export const getBottomSpace = () => {
  return isIphoneX() ? 34 : 0;
};

export const validateEmail = (email: string) => {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email?.trim() || '').toLowerCase());
};

export const validatePassword = (password: string) => {
  var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return re.test(String(password));
};

export const validateURL = (url: string) => {
  var re =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  return re.test(String(url));
};

export const dimensionsCalculation = (IPhonePixel:any) => {
  return (width * IPhonePixel) / 375;
};

