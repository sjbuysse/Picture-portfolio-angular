import {type} from '../util';
import {Action} from '@ngrx/store';
import { Image } from 'app/model/image.interface';

export const ActionTypes = {
  SET_SELECTED_IMAGE: type<'SET_SELECTED_IMAGE'>('SET_SELECTED_IMAGE'),
}

export class SetSelectedImage implements Action {
  type = ActionTypes.SET_SELECTED_IMAGE;
  payload: Readonly<{image: Image}>;
  constructor(image: Image) {
    this.payload = {image};
  }
}

export type Actions =
  SetSelectedImage;
