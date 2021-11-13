import actions from './types';


export const saveArtistId = (artistId:string) => {
  return {
    type: actions.SAVE_ARTIST_ID,
    payload:artistId,
  }; 
};

export const saveAlbumId = (albumId:string) => {
  return {
    type: actions.SAVE_ALBUM_ID,
    payload:albumId,
  };
};

export const saveTrackId = (trackId:string) => {
  return {
    type: actions.SAVE_TRACK_ID,
    payload:trackId,
  };
};


