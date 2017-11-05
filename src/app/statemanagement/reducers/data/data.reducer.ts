import { DataState, initialDataState } from '../../state/data/data.state';
import {albumReducer} from './albums.reducer';
import {Action, combineReducers} from '@ngrx/store';
import {selectedAlbumReducer} from './selected-album.reducer';

export function dataReducer(state: DataState, action: Action) {
  return combineReducers({
    albums: albumReducer,
    selectedAlbum: selectedAlbumReducer,
    selectedImage: null
  }, initialDataState)(state, action);
};
