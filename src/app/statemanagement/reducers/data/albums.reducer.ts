import {ActionReducer} from '@ngrx/store';
import {Album} from 'app/model/album.interface';
import * as albumActions from 'app/statemanagement/actions/data/albums.actions';

export const albumReducer: ActionReducer<Album[]> = (
  state = [], action: albumActions.Actions
) => {
  switch (action.type) {
    case albumActions.ActionTypes.ADD_ALBUM:
      return state.concat(action.payload.album);

    case albumActions.ActionTypes.REMOVE_ALBUM:
      return state.filter(album => album.id !== action.payload.id);

    case albumActions.ActionTypes.ADD_All_ALBUMS:
      return action.payload.albums;

    case albumActions.ActionTypes.UPDATE_ALBUM:
      return state.map((item) => {
          if ( item.id !== action.payload.album.id ) {
            return item;
          } else {
            return action.payload.album;
          }
        })
;

    default:
      return state;
  }
}
