import { Album } from '../../../model/album.interface';

export type AlbumListState = Readonly<{
  showAlbumForm: boolean,
  cardStates: WeakMap<Album, CardState>,
  uploadProgress: number,
  showProgressbar: boolean,
}>;

export const initialAlbumListState: AlbumListState = {
  showAlbumForm: false,
  cardStates: new WeakMap(),
  uploadProgress: 0,
  showProgressbar: false,
};

export interface CardState {
  showAlbumForm: boolean;
  uploadProgress: number;
  showProgressbar: boolean;
}

export function createCardSate(): CardState {
  return {
    showAlbumForm: false,
    uploadProgress: 0,
    showProgressbar: false,
  };
}
