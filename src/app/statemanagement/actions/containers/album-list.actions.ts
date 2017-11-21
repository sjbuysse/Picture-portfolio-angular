import {type} from '../util';
import {Action} from '@ngrx/store';

export const ActionTypes = {
  SET_ALBUM_FORM: type<'CONTAINERS_ALBUM_LIST_SET_ALBUM_FORM'>('CONTAINERS_ALBUM_LIST_SET_ALBUM_FORM'),
  SET_UPLOAD_PROGRESS: type<'CONTAINERS_ALBUM_LIST_SET_ALBUM_UPLOAD_PROGRESS'>('CONTAINERS_ALBUM_LIST_SET_ALBUM_UPLOAD_PROGRESS'),
  SET_PROGRESS_BAR: type<'CONTAINERS_ALBUM_LIST_SET_ALBUM_PROGRESS_BAR'>('CONTAINERS_ALBUM_LIST_SET_ALBUM_PROGRESS_BAR'),
}

export class SetAlbumForm implements Action {
  type = ActionTypes.SET_ALBUM_FORM;
  payload: Readonly<{showAlbumForm: boolean}>;
  constructor(showAlbumForm: boolean) {
    this.payload = {showAlbumForm};
  }
}

export class SetUploadProgress implements Action {
  type = ActionTypes.SET_UPLOAD_PROGRESS;
  payload: Readonly<{uploadProgress: number}>;
  constructor(uploadProgress: number) {
    this.payload = {uploadProgress};
  }
}
export class SetProgressBar implements Action {
  type = ActionTypes.SET_PROGRESS_BAR;
  payload: Readonly<{showProgressbar: boolean}>;
  constructor(showProgressbar: boolean) {
    this.payload = {showProgressbar};
  }
}

export type Actions =
  SetAlbumForm
  | SetUploadProgress
  | SetProgressBar;
