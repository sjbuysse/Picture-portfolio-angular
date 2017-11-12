import {AlbumDetailsState, initialAlbumDetailsState} from './album-details.state';

export type ContainersState = Readonly<{
  albumDetails: AlbumDetailsState
}>;

export const initialContainersState: ContainersState = {
  albumDetails: initialAlbumDetailsState
}
