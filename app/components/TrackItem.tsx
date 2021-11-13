import * as React from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';
import {
    TrackItemProps
} from '../common/Types';
import { AppColors } from '../theme';
import {
    dimensionsCalculation,
  } from '../utils';
  import {navigate} from '../navigation';
import screenNames from '../navigation/screenNames';
import Toast from 'react-native-toast-message';
import { Languages } from '../common';


const TrackItem = (props: TrackItemProps) => {
    const showToast = (text:string) => {
        Toast.show({
          type: 'error',
          text1: text,
          visibilityTime:2000,
        });
      }
    return (
        <TouchableOpacity style={styles.container} onPress={()=>{
            if(props.hasLyrics){
              navigate({name: screenNames.LyricsScreen , params : { lyricsApi:props.lyricsApi}});  
            }else{
                showToast(Languages.noLyrics);
            }
        }}>
            <Image source={{
                uri: props.trackImg,
            }} style={styles.trackImg}/>
            <View style={{flex:1,marginLeft:10}}>
                <Text style={styles.titleText}>{props.trackTitle}</Text>
                <Text style={styles.subText}>{props.artist}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default TrackItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems:'center',
        marginBottom:dimensionsCalculation(20)
    },
    trackImg:{
        width:Dimensions.get('screen').width*0.18,
        height:Dimensions.get('screen').width*0.18,
    },
    titleText:{
        fontSize:16,
        fontWeight:'bold',
        color:AppColors.black
    },
    subText:{
        fontSize:16,
        color:AppColors.inactiveTab
    }
});
