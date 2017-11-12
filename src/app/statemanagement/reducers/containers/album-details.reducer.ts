import {ActionReducer} from '@ngrx/store';
import * as albumDetailsActions from 'app/statemanagement/actions/containers/album-details.actions';
import {AlbumDetailsState, initialAlbumDetailsState} from 'app/statemanagement/state/containers/album-details.state';

export const albumDetailsReducer: ActionReducer<AlbumDetailsState> = (
  state = initialAlbumDetailsState, action: albumDetailsActions.Actions) => {
  switch (action.type) {
    case albumDetailsActions.ActionTypes.SET_IMAGE_FORM:
      return {showImageForm: action.payload.showImageForm};

    default:
      return state;
  }
}
