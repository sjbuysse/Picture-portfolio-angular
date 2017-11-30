import {type} from '../util';
import {Action} from '@ngrx/store';
import { CardState } from '../../state/containers/album-list.state';
import { Album } from '../../../model/album.interface';

export const ActionTypes = {
  SET_ALBUM_CARD_FORM: type<'CONTAINERS_ALBUM_CARD_SET_ALBUM_FORM'>('CONTAINERS_ALBUM_CARD_SET_ALBUM_FORM'),
  SET_ALBUM_FORM: type<'CONTAINERS_ALBUM_LIST_SET_ALBUM_FORM'>('CONTAINERS_ALBUM_LIST_SET_ALBUM_FORM'),
  SET_ALBUM_CARD_UPLOAD_PROGRESS: type<'CONTAINERS_ALBUM_CARD_SET_ALBUM_UPLOAD_PROGRESS'>('CONTAINERS_ALBUM_CARD_SET_ALBUM_UPLOAD_PROGRESS'),
  SET_ALBUM_UPLOAD_PROGRESS: type<'CONTAINERS_ALBUM_SET_ALBUM_UPLOAD_PROGRESS'>('CONTAINERS_ALBUM_SET_ALBUM_UPLOAD_PROGRESS'),
  SET_ALBUM_CARD_PROGRESS_BAR: type<'CONTAINERS_ALBUM_CARD_SET_ALBUM_PROGRESS_BAR'>('CONTAINERS_ALBUM_CARD_SET_ALBUM_PROGRESS_BAR'),
  SET_ALBUM_PROGRESS_BAR: type<'CONTAINERS_ALBUM_SET_ALBUM_PROGRESS_BAR'>('CONTAINERS_ALBUM_SET_ALBUM_PROGRESS_BAR'),
  ADD_CARD_STATE: type<'CONTAINERS_ADD_CARD_STATE'>('CONTAINERS_ADD_CARD_STATE'),
  SET_ALL_CARD_STATES: type<'CONTAINERS_SET_ALL_CARD_STATES'>('CONTAINERS_SET_ALL_CARD_STATES'),
};

export class SetAlbumForm implements Action {
  type = ActionTypes.SET_ALBUM_FORM;
  payload: Readonly<{showAlbumForm: boolean}>;
  constructor(showAlbumForm: boolean) {
    this.payload = {showAlbumForm};
  }
}
export class SetAlbumProgressBar implements Action {
  type = ActionTypes.SET_ALBUM_PROGRESS_BAR;
  payload: Readonly<{showProgressbar: boolean}>;
  constructor(showProgressbar: boolean) {
    this.payload = {showProgressbar};
  }
}

export class SetAlbumCardForm implements Action {
  type = ActionTypes.SET_ALBUM_CARD_FORM;
  payload: Readonly<{album: Album, showAlbumForm: boolean}>;
  constructor(album: Album, showAlbumForm: boolean) {
    this.payload = {album, showAlbumForm};
  }
}

export class SetAlbumCardUploadProgress implements Action {
  type = ActionTypes.SET_ALBUM_CARD_UPLOAD_PROGRESS;
  payload: Readonly<{album: Album, uploadProgress: number}>;
  constructor(album: Album, uploadProgress: number) {
    this.payload = {album, uploadProgress};
  }
}

export class SetAlbumUploadProgress implements Action {
  type = ActionTypes.SET_ALBUM_UPLOAD_PROGRESS;
  payload: Readonly<{uploadProgress: number}>;
  constructor(uploadProgress: number) {
    this.payload = {uploadProgress};
  }
}

export class SetAlbumCardProgressBar implements Action {
  type = ActionTypes.SET_ALBUM_CARD_PROGRESS_BAR;
  payload: Readonly<{album: Album, showProgressbar: boolean}>;
  constructor(album: Album, showProgressbar: boolean) {
    this.payload = {album, showProgressbar};
  }
}

export class AddCardState implements Action {
  type = ActionTypes.ADD_CARD_STATE;
  payload: Readonly<{album: Album, cardState: CardState}>;
  constructor(album: Album, cardState: CardState) {
    this.payload = {album, cardState};
  }
}

export class SetAllCardStates implements Action {
  type = ActionTypes.SET_ALL_CARD_STATES;
  payload: Readonly<{cardStates: Map<string, CardState>}>;
  constructor(cardStates: Map<string, CardState>) {
    this.payload = {cardStates};
  }
}

export type Actions =
  SetAlbumCardForm
  | AddCardState
  | SetAlbumUploadProgress
  | SetAlbumForm
  | SetAlbumProgressBar
  | SetAllCardStates
  | SetAlbumCardUploadProgress
  | SetAlbumCardProgressBar;
