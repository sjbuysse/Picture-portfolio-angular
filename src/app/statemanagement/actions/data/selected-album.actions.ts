import {type} from '../util';
import {Action} from '@ngrx/store';
import {Album} from 'app/model/album.interface';

export const ActionTypes = {
  SET_SELECTED_ALBUM: type<'SET_SELECTED_ALBUM'>('SET_SELECTED_ALBUM'),
}

export class SetSelectedAlbum implements Action {
  type = ActionTypes.SET_SELECTED_ALBUM;
  payload: Readonly<{album: Album}>;
  constructor(album: Album) {
    this.payload = {album};
  }
}

export type Actions =
  SetSelectedAlbum;
