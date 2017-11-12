import {ContainersState, initialContainersState} from 'app/statemanagement/state/containers/containers.state';
import {Action, combineReducers} from '@ngrx/store';
import {albumDetailsReducer} from './album-details.reducer';

export function containersReducer(state: ContainersState, action: Action) {
  return combineReducers({
    albumDetails: albumDetailsReducer,
  }, initialContainersState)(state, action);
};
