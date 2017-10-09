import {ActionReducer} from '@ngrx/store';
import {Album} from '../../state/data/data.state';
import * as albumActions from '../../actions/data/albums.actions';

export const albumReducer: ActionReducer<Album[]> = (
  state = [], action: albumActions.Actions
) => {
  switch (action.type) {
    case albumActions.ActionTypes.ADD_ALBUM:
      return state.concat(action.payload.album);

    case albumActions.ActionTypes.REMOVE_ALBUM:
      return state.filter(album => album.id !== action.payload.id);

    case albumActions.ActionTypes.UPDATE_ALBUM:
      return state.map(album =>
        (album.id === action.payload.id) ?
          Object.assign({}, action.payload.album) :
          album );

    default:
      return state;
  }
}
