import {ActionReducer} from '@ngrx/store';
import * as albumListActions from 'app/statemanagement/actions/containers/album-list.actions';
import { AlbumListState, initialAlbumListState } from '../../state/containers/album-list.state';

export const albumListReducer: ActionReducer<AlbumListState> = (
  state = initialAlbumListState, action: albumListActions.Actions) => {
  switch (action.type) {
    case albumListActions.ActionTypes.SET_ALBUM_FORM:
      return Object.assign({}, state, {showAlbumForm: action.payload.showAlbumForm} );
    case albumListActions.ActionTypes.SET_UPLOAD_PROGRESS:
      return Object.assign({}, state, {uploadProgress: action.payload.uploadProgress} );
    case albumListActions.ActionTypes.SET_PROGRESS_BAR:
      return Object.assign({}, state, {showProgressbar: action.payload.showProgressbar} );
    case albumListActions.ActionTypes.ADD_CARD_STATE:
      return {
        ...state,
        cardStates: state.cardStates.concat(action.payload.cardState)
      };
    case albumListActions.ActionTypes.SET_ALL_CARD_STATES:
      return {
        ...state,
        cardStates: action.payload.cardStates
      };

    default:
      return state;
  }
}
