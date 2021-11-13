import * as React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image, ImageBackground } from 'react-native';
import {
  AlbumsScreenProps,
  MyMusicStore
} from '../common/Types';
import { AppColors } from '../theme';
import { Header, Loader } from '../components'
import axios from "axios";
import { Constants, Languages } from '../common';
import ErrorView from '../components/ErrorView';
import { navigate } from '../navigation';
import screenNames from '../navigation/screenNames';
import {
  dimensionsCalculation, width,
} from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { saveAlbumId } from '../store/actions/AuthActions'
import AsyncStorage from '@react-native-async-storage/async-storage';

const imageWidth = Dimensions.get('screen').width * 0.44;


const AlbumsScreen = (props: AlbumsScreenProps) => {
  const [albums, setAlbums] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [isEmptyData, setIsEmptyData] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      // for onChange of tab
      const artistId = await AsyncStorage.getItem('artistId')
      artistId != null ? getAlbums(artistId) : setIsEmptyData(true);
      
    });

    return unsubscribe;
  }, [props.navigation]);

  const storeData = async (key:string,value:string) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      // saving error
    }
  }

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.item} onPress={() => {
      storeData("albumId",item.id_album);
    }}>
      <ImageBackground
        style={styles.albumImg}
        imageStyle={{ borderRadius: imageWidth / 2 }}
        source={{
          uri: item.cover,
        }}
      >
        <View style={styles.cdView}></View>
      </ImageBackground>
      <Text style={styles.subHeader}>{item.album}</Text>
    </TouchableOpacity>
  );


  const getAlbums = async (artistId:string) => {
    setLoading(true);
    axios.get(`${Constants.url}/artists/${artistId}/albums?apikey=${Constants.apiKey}`).then((response) => {
      setLoading(false);
      if (response.data.success) {
        setAlbums(response.data.result.albums)
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
          const artistId = await AsyncStorage.getItem('artistId')
          if(artistId != null) getAlbums(artistId)
        }} />
      )
    } else {
      if (isEmptyData) {
        return (
          <View style={styles.emptyDataView}>
            <Text style={styles.emptyText}>{Languages.YouHaveToSelect + " " + Languages.TabBar.Artists}</Text>
          </View>
        )
      } else {
        return (
          <FlatList
            data={albums}
            columnWrapperStyle={{
              justifyContent: 'space-between'
            }}
            numColumns={2}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.id_album} />
        )
      }

    }
  }

  return (
    <View style={styles.container}>
      <Header title={Languages.TabBar.Albums} />
      {renderMainView()}
    </View>
  );
};

export default AlbumsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    padding: dimensionsCalculation(15),
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
  albumImg: {
    width: imageWidth,
    height: imageWidth,
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
  item: {
    marginBottom: dimensionsCalculation(25),
    width: imageWidth,
  },
  subHeader: {
    marginVertical: dimensionsCalculation(10),
    color: AppColors.black,
    fontWeight: 'bold',
    fontSize: 16,
    width: '100%'
  },
  cdView: {
    backgroundColor: AppColors.white,
    width: dimensionsCalculation(40),
    height: dimensionsCalculation(40),
    borderRadius: dimensionsCalculation(20),
    borderWidth: 1,
    borderColor: AppColors.inactiveTab
  }
});
