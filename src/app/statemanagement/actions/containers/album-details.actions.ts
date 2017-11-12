import {type} from '../util';
import {Action} from '@ngrx/store';

export const ActionTypes = {
  SET_IMAGE_FORM: type<'SET_IMAGE_FORM'>('SET_IMAGE_FORM'),
}

export class SetImageForm implements Action {
  type = ActionTypes.SET_IMAGE_FORM;
  payload: Readonly<{showImageForm: boolean}>;
  constructor(showImageForm: boolean) {
    this.payload = {showImageForm};
  }
}

export type Actions =
  SetImageForm;
