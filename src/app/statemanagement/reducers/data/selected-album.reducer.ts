import {ActionReducer} from '@ngrx/store';
import {Album} from 'app/model/album.interface';
import * as selectedAlbumActions from 'app/statemanagement/actions/data/selected-album.actions';

export const selectedAlbumReducer: ActionReducer<Album> = (
    state: Album, action: selectedAlbumActions.Actions) => {
    switch (action.type) {
        case selectedAlbumActions.ActionTypes.SET_SELECTED_ALBUM:
        return action.payload.album;

        default:
        return state;
    }
}
