/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import AppNavigator from './app/navigation';
import { AppColors } from './app/theme';
import { Provider } from 'react-redux';
import Store, { persistor } from './app/store';
import Toast from 'react-native-toast-message';


const App = () => {
  return (
    <Provider store={Store}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle="dark-content"
        translucent
      />
      <View style={{ flex: 1 }}>
        <AppNavigator />
        <Toast />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
