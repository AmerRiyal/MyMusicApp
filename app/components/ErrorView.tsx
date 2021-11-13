import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { Languages } from '../common';
import {
    ErrorViewProps,
  } from '../common/Types';
import { AppColors } from '../theme';
import {
    dimensionsCalculation,
    } from '../utils';


const ErrorView = (props: ErrorViewProps) => {
  return (
    <View style={styles.container}>
    <Image source={require('../../assets/images/warning.png')} style={{
        width:50,
        height:50
    }}/>
      <Text style={styles.errorText}>{Languages.ErrorText}</Text>
      <TouchableOpacity style={styles.btn} onPress={() => {props.onPress()}}>
          <Text style={{color:'#fff'}}>{Languages.Reload}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorView;

const styles = StyleSheet.create({
  container: {
      flex:1,
      justifyContent:'center',
      alignItems:"center",
  },
  btn:{
      backgroundColor:AppColors.primary,
      paddingHorizontal:dimensionsCalculation(25),
      paddingVertical:dimensionsCalculation(8)
  },
  btnText:{
      color:AppColors.white,
      fontSize:18,
  },
  errorText:{
    textAlign:'center',
    color:AppColors.black,
    width:'80%',
    marginVertical:dimensionsCalculation(15),
    fontSize:22,
  }
});
