import {ActionReducer} from '@ngrx/store';
import * as albumListActions from 'app/statemanagement/actions/containers/album-list.actions';
import { AlbumListState, CardState, initialAlbumListState } from '../../state/containers/album-list.state';

let newCardState: CardState;
export const albumListReducer: ActionReducer<AlbumListState> = (
  state = initialAlbumListState, action: albumListActions.Actions) => {
  switch (action.type) {
    case albumListActions.ActionTypes.SET_ALBUM_CARD_FORM:
      newCardState = {
        ...state.cardStates.get(action.payload.album.id),
        showAlbumForm: action.payload.showAlbumForm
      }
      return {
        ...state,
        cardStates: state.cardStates.set(action.payload.album.id, newCardState)
      };
    case albumListActions.ActionTypes.SET_ALBUM_CARD_UPLOAD_PROGRESS:
      newCardState = {
        ...state.cardStates.get(action.payload.album.id),
        uploadProgress: action.payload.uploadProgress
      }
      return {
        ...state,
        cardStates: state.cardStates.set(action.payload.album.id, newCardState)
      };
    case albumListActions.ActionTypes.SET_ALBUM_CARD_PROGRESS_BAR:
      newCardState = {
        ...state.cardStates.get(action.payload.album.id),
        showProgressbar: action.payload.showProgressbar
      }
      return {
        ...state,
        cardStates: state.cardStates.set(action.payload.album.id, newCardState)
      };
    case albumListActions.ActionTypes.ADD_CARD_STATE:
      return {
        ...state,
        cardStates: state.cardStates.set(action.payload.album.id, action.payload.cardState)
      };
    case albumListActions.ActionTypes.SET_ALL_CARD_STATES:
      return {
        ...state,
        cardStates: action.payload.cardStates
      };

    case albumListActions.ActionTypes.SET_ALBUM_FORM:
      return Object.assign(state, {showAlbumForm: action.payload.showAlbumForm});

    case albumListActions.ActionTypes.SET_ALBUM_PROGRESS_BAR:
      return Object.assign(state, {showProgressbar: action.payload.showProgressbar});

    case albumListActions.ActionTypes.SET_ALBUM_UPLOAD_PROGRESS:
      return Object.assign(state, {uploadProgress: action.payload.uploadProgress});

    default:
      return state;
  }
}
