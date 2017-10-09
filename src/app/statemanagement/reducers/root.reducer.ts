import { AppState } from '../state/app.state';
import {dataReducer} from './data/data.reducer';
import {ActionReducerMap} from '@ngrx/store';

export const rootReducer: ActionReducerMap<AppState> = {
  data: dataReducer,
};
