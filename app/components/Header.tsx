import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppIcon } from '../common';
import {
    HeaderProps,
  } from '../common/Types';
import {AppColors} from '../theme';
import {
dimensionsCalculation,
} from '../utils';
import {goBack} from '../navigation';


const Header = (props: HeaderProps) => {
  return (
    <View style={styles.container}>
        {props.hasBack && 
        <TouchableOpacity onPress={()=>{goBack()}}>
        <AppIcon type={"AntDesign"} name={"leftcircle"} color={'#000'} size={25} style={styles.iconStyle}/>
        </TouchableOpacity>}
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
      flexDirection:'row',
      alignItems:'center',
      marginBottom:dimensionsCalculation(20),
      borderBottomWidth:1,
      paddingBottom:10,
      borderColor:AppColors.f2
  },
  title:{
    fontWeight:'bold',
    fontSize:24,
    color:AppColors.black,
},
iconStyle:{
    marginRight:dimensionsCalculation(10)
}
});
