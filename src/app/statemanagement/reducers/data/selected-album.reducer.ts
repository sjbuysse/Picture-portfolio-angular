import {ActionReducer} from '@ngrx/store';
import {Album} from 'app/model/album.interface';
import * as selectedAlbumActions from 'app/statemanagement/actions/data/selected-album.actions';

export const selectedAlbumReducer: ActionReducer<Album> = (
    state: Album, action: selectedAlbumActions.Actions) => {
    switch (action.type) {
        case selectedAlbumActions.ActionTypes.SET_SELECTED_ALBUM:
          return action.payload.album;

        case selectedAlbumActions.ActionTypes.ADD_IMAGE:
          return Object.assign({}, state, {images: state.images.concat(action.payload.image)});

        case selectedAlbumActions.ActionTypes.UPDATE_ALBUM:
          return Object.assign({}, state, action.payload.album, { id: state.id || action.payload.album.id });

      default:
        return state;
    }
}
