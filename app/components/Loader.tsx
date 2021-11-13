import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
    LoaderProps,
  } from '../common/Types';
  import Spinner from 'react-native-spinkit';
  import { AppColors } from '../theme';

const Loader = (props: LoaderProps) => {
  return (
    <View style={styles.loadingView}>
            <Spinner style={styles.spinner} isVisible={true} size={40} type={'Wave'} color={AppColors.primary}/>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
    loadingView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
      spinner:{

    },
});
