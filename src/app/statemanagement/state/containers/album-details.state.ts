export type AlbumDetailsState = Readonly<{
  showImageForm: boolean,
  uploadProgress: number,
  showProgressbar: boolean,
}>;

export const initialAlbumDetailsState: AlbumDetailsState = {
  showImageForm: false,
  uploadProgress: 0,
  showProgressbar: false,
};
