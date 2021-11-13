import React, { createRef } from 'react';
import { YellowBox } from 'react-native';
import {
  NavigationContainer,
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import screenNames from './screenNames';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import TabNavigator from './TabNavigator';
import { ScreenRoute } from '../common/Types';
import { ArtisitDetails,LyricsScreen } from '../screens'

YellowBox.ignoreWarnings(['']);

export const navigationRef = createRef<NavigationContainerRef>();

export const navigate = (route: ScreenRoute) => {
  navigationRef.current?.navigate(route?.name, route?.params);
};

export const replace = (route: ScreenRoute) => {
  navigationRef.current?.dispatch(
    StackActions.replace(route?.name, route?.params),
  );
};

export const push = (route: ScreenRoute) => {
  navigationRef.current?.dispatch(StackActions.push(route?.name, route?.params));
};

export const pop = (count: number = 1) => {
  navigationRef.current?.dispatch(StackActions.pop(count));
};

export const reset = (routes: ScreenRoute[], index: number = 0) => {
  navigationRef?.current?.reset({
    routes,
    index,
  });
};

export const canGoBack = () => {
  return navigationRef?.current?.canGoBack();
};

export const goBack = () => {
  return navigationRef?.current?.goBack();
};

const { Screen, Navigator } = createNativeStackNavigator();

const MainStack = () => (
  <Navigator
    screenOptions={({ route }) => {
      return {
        headerShown: false,
      };
    }}>
    <Screen name={screenNames.App} component={TabNavigator} />
    <Screen
        name={screenNames.ArtisitDetails}
        component={ArtisitDetails}
      />
      <Screen
        name={screenNames.LyricsScreen}
        component={LyricsScreen}
      />
  </Navigator>
);

const AppNavigator = () => (
  <NavigationContainer ref={navigationRef}>
    <MainStack />
  </NavigationContainer>
);

export default AppNavigator;
