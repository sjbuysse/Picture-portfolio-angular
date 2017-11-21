import {type} from '../util';
import {Action} from '@ngrx/store';

export const ActionTypes = {
  SET_IMAGE_FORM: type<'CONTAINERS_ALBUM_DET_SET_IMAGE_FORM'>('CONTAINERS_ALBUM_DET_SET_IMAGE_FORM'),
  SET_UPLOAD_PROGRESS: type<'CONTAINERS_ALBUM_DET_SET_UPLOAD_PROGRESS'>('CONTAINERS_ALBUM_DET_SET_UPLOAD_PROGRESS'),
  SET_PROGRESS_BAR: type<'CONTAINERS_ALBUM_DET_SET_PROGRESS_BAR'>('CONTAINERS_ALBUM_DET_SET_PROGRESS_BAR'),
}

export class SetImageForm implements Action {
  type = ActionTypes.SET_IMAGE_FORM;
  payload: Readonly<{showImageForm: boolean}>;
  constructor(showImageForm: boolean) {
    this.payload = {showImageForm};
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
  SetImageForm |
  SetUploadProgress |
  SetProgressBar;
