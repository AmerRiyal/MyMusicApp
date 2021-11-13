import React, {ReactNode} from 'react';
import {
  View,
  TouchableOpacity,
  ColorValue,
  Platform,
  TouchableOpacityProps,
  Keyboard,
  TouchableNativeFeedback,
} from 'react-native';

import {dimensionsCalculation} from '../utils';

export interface AppTouchableOpacityProps extends TouchableOpacityProps {
  androidRippleColor: ColorValue;
  borderless?: boolean;
  children?: ReactNode;
}

export default function AppTouchableOpacity(props: AppTouchableOpacityProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      {...props}
      onPress={(e) => {
        Keyboard.dismiss();
          props?.onPress(e);
      }}>
      {props.children}
    </TouchableOpacity>
  );
}
