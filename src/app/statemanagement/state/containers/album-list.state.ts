import { Album } from '../../../model/album.interface';

export type AlbumListState = Readonly<{
  showAlbumForm: boolean,
  cardStates: Map<string, CardState>,
  uploadProgress: number,
  showProgressbar: boolean,
}>;

export const initialAlbumListState: AlbumListState = {
  showAlbumForm: false,
  cardStates: new Map(),
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
