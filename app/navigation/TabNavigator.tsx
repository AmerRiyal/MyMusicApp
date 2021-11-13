import React, {useState} from 'react';
import screenNames from './screenNames';
import {
  TracksScreen,
  AlbumsScreen,
  ArtistsScreen,
  SearchScreen
} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppColors} from '../theme';
import {dimensionsCalculation, getBottomSpace, isIOS, isIphoneX} from '../utils';
import {AppIcon, Languages} from '../common';
import {
  BottomTabBarButtonProps,
  LabelPosition,
} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {StyleSheet, Text} from 'react-native';
import {AppTouchableOpacity} from '../components';


const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: AppColors.white,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height: dimensionsCalculation((isIOS ? 55 : 60) + getBottomSpace()),
    paddingBottom: getBottomSpace(),
    borderTopWidth: 1,
    overflow: 'visible',
  },
  activeTab: {
    color: AppColors.commonText,
    fontSize: dimensionsCalculation(13),
    width: '100%',
    textAlign: 'center',
    marginBottom: isIphoneX() ? 0 : 1,
  },
});

const {Navigator, Screen} = createBottomTabNavigator();

const renderTabBar = (props: {
  focused: boolean;
  color: string;
  position: LabelPosition;
  title: string;
}) =>
  props.title ? <Text style={[styles.activeTab, props.focused ? {color:AppColors.primary} : {color: AppColors.inactiveTab}]}>{props.title}</Text> : null;

const renderTabBarIcon = (props: {
  focused: boolean;
  color: string;
  icon: string;
  useDefaultColors?: boolean;
}) => {
  return (
    <AppIcon
      name={props.icon}
      type="Image"
      color={props?.focused ? AppColors.primary : AppColors.inactiveTab}
      size={
        props?.useDefaultColors
          ? dimensionsCalculation(36)
          : dimensionsCalculation(26)
      }
      useDefaultColors={props?.useDefaultColors}
    />
  );
};

const TabNavigator = () => {
  const renderTabBarButton = (props: BottomTabBarButtonProps) => {
    return (
      <AppTouchableOpacity
        {...props}
        activeOpacity={0.9}
        androidRippleColor={AppColors.androidRippleColor.black15}
        borderless
        style={[props.style, {borderRadius: 0}]}>
        {props.children}
      </AppTouchableOpacity>
    );
  };

  return (
    <Navigator
      tabBarOptions={{
        style: styles.tabBarStyle,
        keyboardHidesTabBar: true,
        activeTintColor: AppColors.black,
      }}
      initialRouteName={screenNames.ArtistsScreen}>
      <Screen
        name={screenNames.ArtistsScreen}
        component={ArtistsScreen}
        options={{
          tabBarButton: renderTabBarButton,
          tabBarLabel: (props) =>
            renderTabBar({...props, title: Languages.TabBar.Artists}),
          tabBarIcon: (props) =>
            renderTabBarIcon({
              ...props,
              icon: require('../../assets/icons/singer.png'),
            }),
        }}
      />
      <Screen
        name={screenNames.AlbumsScreen}
        component={AlbumsScreen}
        options={{
          tabBarButton: renderTabBarButton,
          tabBarLabel: (props) =>
            renderTabBar({...props, title: Languages.TabBar.Albums}),
          tabBarIcon: (props) =>
            renderTabBarIcon({
              ...props,
              icon: require('../../assets/icons/music-album.png'),
            }),
        }}
      />
      <Screen
        name={screenNames.TracksScreen}
        component={TracksScreen}
        options={{
          tabBarButton: renderTabBarButton,
          tabBarLabel: (props) =>
            renderTabBar({...props, title: Languages.TabBar.Tracks}),
          tabBarIcon: (props) =>
            renderTabBarIcon({
              ...props,
              icon: require('../../assets/icons/music-note.png'),
            }),
        }}
      />
      <Screen
        name={screenNames.SearchScreen}
        component={SearchScreen}
        options={{
          tabBarButton: renderTabBarButton,
          tabBarLabel: (props) =>
            renderTabBar({...props, title: Languages.TabBar.Search}),
          tabBarIcon: (props) =>
            renderTabBarIcon({
              ...props,
              icon: require('../../assets/icons/magnifier.png'),
            }),
        }}
      />
    </Navigator>
  );
};

export default TabNavigator;
