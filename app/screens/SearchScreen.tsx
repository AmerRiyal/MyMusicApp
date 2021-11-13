import * as React from 'react';
import { Text, View, StyleSheet, TextInput,Dimensions, FlatList } from 'react-native';
import axios from "axios";
import { AppIcon, Constants, Languages } from '../common';
import { TrackItem } from '../components'
import {
    SearchScreenProps,
  } from '../common/Types';
import { Loader } from '../components';
  import { AppColors } from '../theme';
  import {
    dimensionsCalculation,
  } from '../utils';


  const data =  [
    {
      "track": "Aux Sombres Héros De L'Amer",
      "id_track": 13227678,
      "haslyrics": true,
      "artist": "Noir Désir",
      "id_artist": 26594,
      "album": "Soyons Désinvoltes, N'Ayons L'Air De Rien",
      "id_album": 159328,
      "bpm": 126,
      "lang": "fr",
      "cover": "https://api.happi.dev/v1/music/cover/159328",
      "api_artist": "https://api.happi.dev/v1/music/artists/26594",
      "api_albums": "https://api.happi.dev/v1/music/artists/26594/albums",
      "api_album": "https://api.happi.dev/v1/music/artists/26594/albums/159328",
      "api_tracks": "https://api.happi.dev/v1/music/artists/26594/albums/159328/tracks",
      "api_track": "https://api.happi.dev/v1/music/artists/26594/albums/159328/tracks/13227678",
      "api_lyrics": "https://api.happi.dev/v1/music/artists/26594/albums/159328/tracks/13227678/lyrics"
    }]

const SearchScreen = (props: SearchScreenProps) => {
  const [searchText, setSearchText] = React.useState("");
  const [searchList, setSearchList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const renderItem = ({ item }: any) => {
    return(<TrackItem
      trackTitle={item.track}
      artist={item.artist}
      trackImg={item.cover}
      hasLyrics={item.haslyrics}
      lyricsApi={item.api_lyrics}
    />)
  }

  const getTracks = () =>{
    setLoading(true);
    axios.get(`${Constants.url}?q=${searchText}&apikey=${Constants.apiKey}`).then((response) => {
      setLoading(false);
      if(response.data.success){
        setSearchList(response.data.result)
      }else{
        setLoading(false);
        console.log("Error",response.data.error)
      }
    }).catch(function (error) {
      // handle error
      setLoading(false);
      console.log("Error",error);
    })
  }

  React.useEffect(() => {
    getTracks();
  },[searchText]);

  const renderMainView = () =>{
    if(loading){
      return (<Loader />)
    }else{
      if(searchList.length <= 0){
        return(
          <View style={styles.emptyDataView}>
          <Text style={styles.emptyText}>{Languages.EmptySearchText}</Text>
        </View>
        )
      }else{
        return(
          <FlatList
          data={searchList}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id_track}
          />
        )
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <AppIcon 
          type={"Ionicons"}
          name={"search"}
          color={AppColors.inactiveTab}
          size={20}
        />
        <TextInput 
          style={styles.input}
          onChangeText={(text)=>{
            setSearchText(text);
          }}
          value={searchText}
          placeholder={Languages.SearchPlaceholder}
        />
      </View>
      
      {renderMainView()}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
      flex:1,
      backgroundColor: AppColors.white,
      padding: dimensionsCalculation(15),
  },
  inputView:{
    marginBottom:dimensionsCalculation(15),
    paddingBottom:dimensionsCalculation(2),
    borderBottomWidth:1,
    borderColor:AppColors.inactiveTab,
    flexDirection:'row',
    alignItems:'center',
  },
  input:{
  },
  emptyDataView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  emptyText:{
    color:AppColors.black,
    fontSize:18,
    width:Dimensions.get('screen').width*0.5,
    textAlign:'center'
  },
});
