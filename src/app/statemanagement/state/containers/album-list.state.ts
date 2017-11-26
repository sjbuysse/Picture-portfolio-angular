export type AlbumListState = Readonly<{
  showAlbumForm: boolean,
  cardStates: CardState[],
  uploadProgress: number,
  showProgressbar: boolean,
}>;

export const initialAlbumListState: AlbumListState = {
  showAlbumForm: false,
  cardStates: [],
  uploadProgress: 0,
  showProgressbar: false,
};

export interface CardState {
  id: string;
  showAlbumForm: boolean;
  uploadProgress: number;
  showProgressbar: boolean;
}

export function createCardSate(id: string): CardState {
  return {
    id: id,
    showAlbumForm: false,
    uploadProgress: 0,
    showProgressbar: false,
  };
}
