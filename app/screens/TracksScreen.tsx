import * as React from 'react';
import { Text, View, StyleSheet, FlatList, Dimensions } from 'react-native';
import {
  TracksScreenProps,
  MyMusicStore
} from '../common/Types';
import { AppColors } from '../theme';
import { Header, Loader, TrackItem } from '../components'
import axios from "axios";
import { Constants, Languages } from '../common';
import ErrorView from '../components/ErrorView';
import {
  dimensionsCalculation,
} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TracksScreen = (props: TracksScreenProps) => {
  const [loading, setLoading] = React.useState(false);
  const [tracks, setTracks] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [albumImg, setAlbumImg] = React.useState("");
  const [isEmptyData, setIsEmptyData] = React.useState(false);
  const [albumName, setAlbumName] = React.useState("");

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      // for onChange of tab
      const artistId = await AsyncStorage.getItem('artistId');
      const albumId = await AsyncStorage.getItem('albumId');
      artistId != null && albumId != null ? getTracks(artistId, albumId) : setIsEmptyData(true)
    });

    return unsubscribe;
  }, [props.navigation]);

  const renderItem = ({ item }: any) => (
    <TrackItem
      trackTitle={item.track}
      artist={albumName}
      trackImg={albumImg}
      hasLyrics={item.haslyrics}
      lyricsApi={item.api_lyrics}
    />)


  const getTracks = (artistId: string, albumId: string) => {
    setLoading(true);
    axios.get(`${Constants.url}/artists/${artistId}/albums/${albumId}/tracks?apikey=${Constants.apiKey}`).then((response) => {
      setLoading(false);
      if (response.data.success) {
        setTracks(response.data.result.tracks)
        setAlbumImg(response.data.result.cover);
        setAlbumName(response.data.result.artist);
        setError(false)
      } else {
        setError(true)
        setLoading(false);
        console.log("Error", response.data.error)
      }
    }).catch(function (error) {
      // handle error
      setError(true)
      setLoading(false);
      console.log("Error", error);
    })
  }

  const renderMainView = () => {
    if (loading) {
      return (<Loader />)
    }
    else if (error) {
      return (
        <ErrorView onPress={async () => {
          const artistId = await AsyncStorage.getItem('artistId');
          const albumId = await AsyncStorage.getItem('albumId');
          if (artistId != null && albumId != null) getTracks(artistId, albumId);
        }} />
      )
    } else {
      if (isEmptyData) {
        return (
          <View style={styles.emptyDataView}>
            <Text style={styles.emptyText}>{Languages.YouHaveToSelect + " " + Languages.TabBar.Artists + " and " + Languages.TabBar.Albums}</Text>
          </View>
        )
      } else {
        return (
          <FlatList
            data={tracks}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.id_track} />
        )
      }
    }
  }

  return (
    <View style={styles.container}>
      <Header title={Languages.TabBar.Tracks} />
      {renderMainView()}
    </View>
  );
};

export default TracksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    padding: dimensionsCalculation(15),
  },
  emptyDataView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: AppColors.black,
    fontSize: 18,
    width: Dimensions.get('screen').width * 0.5,
    textAlign: 'center'
  },
});
