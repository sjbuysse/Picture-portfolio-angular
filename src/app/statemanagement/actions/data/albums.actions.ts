import {type} from '../util';
import {Action} from '@ngrx/store';
import {Album} from 'app/model/album.interface';
import {Image} from '../../../model/image.interface';

export const ActionTypes = {
  ADD_ALBUM: type<'DATA_ADD_ALBUM'>('DATA_ADD_ALBUM'),
  REMOVE_ALBUM: type<'DATA_REMOVE_ALBUM'>('DATA_REMOVE_ALBUM'),
  UPDATE_ALBUM: type<'DATA_UPDATE_ALBUM'>('DATA_UPDATE_ALBUM'),
}

export class AddAlbum implements Action {
  type = ActionTypes.ADD_ALBUM;
  payload: Readonly<{album: Album}>;
  constructor(album: Album) {
    this.payload = {album};
  }
}

export class RemoveAlbum implements Action {
  type = ActionTypes.REMOVE_ALBUM;
  payload: Readonly<{id: string}>;
  constructor(id: string) {
    this.payload = {id};
  }
}

export type Actions =
  AddAlbum
  | RemoveAlbum;
