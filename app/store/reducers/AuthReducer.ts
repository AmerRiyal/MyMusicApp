import {AuthReducer} from '../../common/Types';
import actions from '../actions/types';

const initialState: AuthReducer = {
  artistId: "",
  albumId: "",
  trackId: "",
};

export default (state = initialState, {type, payload}:any): AuthReducer => {
  switch (type) {

    case actions.SAVE_ARTIST_ID: {
      return {
        ...state,
        artistId: payload,
      };
    }

    case actions.SAVE_ALBUM_ID: {
      return {
        ...state,
        albumId: payload,
      };
    }


    case actions.SAVE_ARTIST_ID: {
      return {
        ...state,
        trackId: payload?.trackId,
      };
    }

    default:
      return state;
  }
};
