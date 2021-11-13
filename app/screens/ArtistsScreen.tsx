import * as React from 'react';
import { Text, View, StyleSheet,FlatList,Image,Dimensions, TouchableOpacity,ActivityIndicator } from 'react-native';
import {
  dimensionsCalculation,
} from '../utils';
import {
    ArtistsScreenProps,
  } from '../common/Types';
import { AppColors } from '../theme';
import { Header,Loader } from '../components'
import axios from "axios";
import {Constants, Languages} from '../common';
import ErrorView from '../components/ErrorView';
import {navigate} from '../navigation';
import screenNames  from '../navigation/screenNames';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ArtistsScreen = (props: ArtistsScreenProps) => {
  const [artists, setArtists] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [fetchData, setFetchData] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [moreData, setMoreData] = React.useState(false);

  const storeData = async (key:string,value:string) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      // saving error
    }
  }

  const getAlbum = async (artistId:string) =>{
    setFetchData(true);
    axios.get(`${Constants.url}/artists/${artistId}/albums?apikey=${Constants.apiKey}`).then((response) => {
      if(response.data.success){
        let albumId =response.data.result.albums[0].id_album;
        storeData("artistId",artistId);
        storeData("albumId",albumId);
        navigate({name: screenNames.ArtisitDetails , params : { artistId:artistId,albumId: albumId}});
        setFetchData(false);
      }else{
        setError(true)
        setFetchData(false);
        console.log("Error",response.data.error)
      }
    }).catch(function (error) {
      // handle error
      setError(true)
      setFetchData(false);
      console.log("Error",error);
    })
  }

  //for render Artist Item
  const renderItem = ({ item }:any) => (
    <TouchableOpacity style={styles.item} onPress={()=>{
      getAlbum(item.id_artist);
    }}>
      <Image
        style={styles.artistImg}
        source={{
          uri: item.cover,
        }}
      />
    <Text style={styles.subHeader}>{item.artist}</Text>
  </TouchableOpacity>
  );

  //for rendering flatlist footer for more data
  const renderFooter = () =>(
    moreData ? (
      <Loader />
    ) : null
  )

  // function to get the artisit list
  const getArtists= () =>{
    axios.get(`${Constants.url}/artists?page=${page}&apikey=${Constants.apiKey}`).then((response) => {
      setLoading(false);
      if(response.data.success){
        setArtists(artists.concat(response.data.result));
        setTotalPages(response.data.pages);
        setError(false)
      }else{
        setError(true)
        setLoading(false);
        console.log("Error",response.data.error)
      }
    }).catch(function (error) {
      // handle error
      setError(true)
      setLoading(false);
      console.log("Error",error);
    })
  }

// action on update of page
  React.useEffect(() => {
    setMoreData(true);
    getArtists()
}, [page]);


const renderMainView = () =>{
  if(error){
    return (
      <ErrorView onPress={()=>{
        setLoading(true);
        getArtists()
      }}/>
    )
  }else{
    return (
      <FlatList
        data={artists}
        onEndReached={()=>{
          if(page < totalPages){
            setPage(page + 1);
          }
        }}
        columnWrapperStyle={{
          justifyContent:'space-between'
        }}
        numColumns={2}
        renderItem={renderItem}
        ListFooterComponent={renderFooter()}
        keyExtractor={(item:any) => item.id_artist}/>
    )
  }
}

  return (
    <View style={styles.container}>
      <Header title={Languages.TabBar.Artists}/>
      {fetchData ? <Loader /> : renderMainView()}
    </View>
  );
};

export default ArtistsScreen;

const styles = StyleSheet.create({
  container: {
      flex:1, 
      backgroundColor:AppColors.white,
      padding:dimensionsCalculation(15),
  },
  title:{
      fontWeight:'bold',
      fontSize:24,
      color:AppColors.black,
      paddingBottom:dimensionsCalculation(20),
      marginBottom:dimensionsCalculation(20),
      borderBottomWidth:1,
      borderColor:AppColors.f2
  },
  listView:{
    justifyContent:'space-between'
  },
  artistImg:{
    width:Dimensions.get('screen').width * 0.44,
    height:Dimensions.get('screen').width * 0.44,
    borderRadius:10
  },
  item:{
    marginBottom:dimensionsCalculation(25),
    width:Dimensions.get('screen').width * 0.44,
  },
  subHeader:{
    marginVertical:dimensionsCalculation(10),
    color:AppColors.black,
    fontWeight:'bold',
    fontSize:16,
    width:'100%'
  }
});
