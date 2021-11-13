import {AppIcon, Languages} from '../common';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  RefreshControl,
  SectionList,
  StatusBar,
  ScrollView,
} from 'react-native';
import {AppColors} from '../theme';
import {dimensionsCalculation} from '../utils';
import {
  HomeScreenProps,
} from '../common/Types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.commonBG,
  }
});

const HomeScreen = (props: HomeScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>dsa Hello Home</Text>
    </View>
  );
};

export default HomeScreen;
