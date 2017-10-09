import { DataState, initialDataState } from '../../state/data/data.state';
import {albumReducer} from './albums.reducer';
import {Action, combineReducers} from '@ngrx/store';

export function dataReducer(state: DataState, action: Action) {
  return combineReducers({
    albums: albumReducer,
  }, initialDataState)(state, action);
};
