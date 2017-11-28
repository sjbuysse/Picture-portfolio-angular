import {ActionReducer} from '@ngrx/store';
import * as albumListActions from 'app/statemanagement/actions/containers/album-list.actions';
import { AlbumListState, CardState, initialAlbumListState } from '../../state/containers/album-list.state';

let newCardState: CardState;
export const albumListReducer: ActionReducer<AlbumListState> = (
  state = initialAlbumListState, action: albumListActions.Actions) => {
  switch (action.type) {
    case albumListActions.ActionTypes.SET_ALBUM_FORM:
      newCardState = {
        ...state.cardStates.get(action.payload.album),
        showAlbumForm: action.payload.showAlbumForm
      }
      return {
        ...state,
        cardStates: state.cardStates.set(action.payload.album, newCardState)
      };
    case albumListActions.ActionTypes.SET_UPLOAD_PROGRESS:
      return Object.assign({}, state, {uploadProgress: action.payload.uploadProgress} );
    case albumListActions.ActionTypes.SET_PROGRESS_BAR:
      newCardState = {
        ...state.cardStates.get(action.payload.album),
        showProgressbar: action.payload.showProgressbar
      }
      return {
        ...state,
        cardStates: state.cardStates.set(action.payload.album, newCardState)
      };
    case albumListActions.ActionTypes.ADD_CARD_STATE:
      return {
        ...state,
        cardStates: state.cardStates.set(action.payload.album, action.payload.cardState)
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
