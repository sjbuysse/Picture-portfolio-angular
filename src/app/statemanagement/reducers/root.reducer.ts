import { AppState } from '../state/app.state';
import {dataReducer} from './data/data.reducer';
import {ActionReducerMap} from '@ngrx/store';
import {selectedAlbumReducer} from './data/selected-album.reducer';

export const rootReducer: ActionReducerMap<AppState> = {
  data: dataReducer,
};
