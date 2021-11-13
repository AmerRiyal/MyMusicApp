import * as React from 'react';
import { Text, View, StyleSheet,FlatList } from 'react-native';
import {
    ArtistDetailsProps,
  } from '../common/Types';
  import {Constants, Languages} from '../common';
  import { Header,TrackItem,Loader,ErrorView } from '../components'
  import { AppColors } from '../theme';
  import {
    dimensionsCalculation,
  } from '../utils';
  import axios from "axios";

  

const ArtistDetails = ({route}: ArtistDetailsProps) => {
    const [loading, setLoading] = React.useState(true);
    const [tracks, setTracks] = React.useState([]);
    const {artistId,albumId} = route?.params;
    const [error, setError] = React.useState(false);
    const [albumImg, setAlbumImg] = React.useState("");
    const [albumName, setAlbumName] = React.useState("");


    React.useEffect(() => {
      getTracks();
    },[]);
    
    const getTracks = () =>{
      setLoading(true);
      axios.get(`${Constants.url}/artists/${artistId}/albums/${albumId}/tracks?apikey=${Constants.apiKey}`).then((response) => {
        setLoading(false);
        if(response.data.success){
          setTracks(response.data.result.tracks)
          setAlbumImg(response.data.result.cover);
          setAlbumName(response.data.result.artist);
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

    const renderItem = ({ item }: any) => (
      <TrackItem
        trackTitle={item.track}
        artist={albumName}
        trackImg={albumImg}
        hasLyrics={item.haslyrics}
        lyricsApi={item.api_lyrics}
      />
    );

    const renderMainView = () =>{
      if(error){
        return (
          <ErrorView onPress={()=>{
            getTracks()
          }}/>
        )
      }else{
        return (
          <FlatList
        data={tracks}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id_track} />
        )
      }
    }

  return (
    <View style={styles.container}>
        <Header title={Languages.ArtistTracks} hasBack/>
        {loading ? (
          <Loader />
        ):(
          renderMainView())}
    </View>
  );
};

export default ArtistDetails;

const styles = StyleSheet.create({
  container: {
      flex:1,
    backgroundColor:AppColors.white,
    padding:dimensionsCalculation(15),
    }
});
