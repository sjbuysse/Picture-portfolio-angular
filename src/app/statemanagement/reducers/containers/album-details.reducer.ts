import {ActionReducer} from '@ngrx/store';
import * as albumDetailsActions from 'app/statemanagement/actions/containers/album-details.actions';
import {AlbumDetailsState, initialAlbumDetailsState} from 'app/statemanagement/state/containers/album-details.state';

export const albumDetailsReducer: ActionReducer<AlbumDetailsState> = (
  state = initialAlbumDetailsState, action: albumDetailsActions.Actions) => {
  switch (action.type) {
    case albumDetailsActions.ActionTypes.SET_IMAGE_FORM:
      return Object.assign({}, state, {showImageForm: action.payload.showImageForm} );
    case albumDetailsActions.ActionTypes.SET_UPLOAD_PROGRESS:
      return Object.assign({}, state, {uploadProgress: action.payload.uploadProgress} );
    case albumDetailsActions.ActionTypes.SET_PROGRESS_BAR:
      return Object.assign({}, state, {showProgressbar: action.payload.showProgressbar} );

    default:
      return state;
  }
}
