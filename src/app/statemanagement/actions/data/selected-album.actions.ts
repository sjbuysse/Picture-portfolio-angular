import {type} from '../util';
import {Action} from '@ngrx/store';
import {Album} from 'app/model/album.interface';
import {Image} from 'app/model/image.interface';

export const ActionTypes = {
  SET_SELECTED_ALBUM: type<'SET_SELECTED_ALBUM'>('SET_SELECTED_ALBUM'),
  UPDATE_ALBUM: type<'UPDATE_ALBUM'>('UPDATE_ALBUM'),
  ADD_IMAGE: type<'DATA_ADD_IMAGE'>('DATA_ADD_IMAGE'),
  ADD_ALL_IMAGES: type<'ADD_ALL_IMAGES'>('ADD_ALL_IMAGES'),
}

export class SetSelectedAlbum implements Action {
  type = ActionTypes.SET_SELECTED_ALBUM;
  payload: Readonly<{album: Album}>;
  constructor(album: Album) {
    this.payload = {album};
  }
}

export class AddImage implements Action {
  type = ActionTypes.ADD_IMAGE;
  payload: Readonly<{image: Image}>;
  constructor(image: Image) {
    this.payload = {image};
  }
}

export class UpdateAlbum implements Action {
  type = ActionTypes.UPDATE_ALBUM;
  payload: Readonly<{album: Album}>;
  constructor(album: Album) {
    this.payload = {album};
  }
}

export type Actions =
  SetSelectedAlbum
  | UpdateAlbum
  | AddImage;
