export interface HomeScreenProps {}

export interface TracksScreenProps {
  navigation :any
}

export interface AlbumsScreenProps {
  navigation :any
}

export interface ArtistsScreenProps {}

export interface SearchScreenProps {}

export interface LoaderProps {}

export interface MyMusicStore {
  auth: AuthReducer;
}

export interface LyricsProps{
  route: {
    params: {
      lyricsApi: string;
    };
  };
}

export interface AuthReducer {
  artistId: string;
  albumId: string;
  trackId: string;
}


export interface TrackItemProps {
  trackTitle:string ,
  artist:string,
  lyricsApi:string,
  hasLyrics:boolean,
  trackImg:any
}

export interface ErrorViewProps {
  errorText?:string
  onPress: () => void
}

export interface ArtistDetailsProps{
  route: {
    params: {
      artistId: string;
      albumId: string;
    };
  };
}

export interface HeaderProps{
  title:string,
  hasBack?:boolean
}

export interface ArtistsProps {
  id:string,
  title: string,
  cover:string
}


export interface ScreenRoute {
  name: string;
  params?: any;
}

export type AppIconType =
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'Fontisto'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialIcons'
  | 'MaterialCommunityIcons'
  | 'Octicons'
  | 'Zocial'
  | 'SimpleLineIcons'
  | 'Image';
