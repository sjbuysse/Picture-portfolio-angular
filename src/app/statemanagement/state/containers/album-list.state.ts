export type AlbumListState = Readonly<{
  showAlbumForm: boolean,
  uploadProgress: number,
  showProgressbar: boolean,
}>;

export const initialAlbumListState: AlbumListState = {
  showAlbumForm: false,
  uploadProgress: 0,
  showProgressbar: false,
};
