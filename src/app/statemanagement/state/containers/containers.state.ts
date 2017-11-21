import {AlbumDetailsState, initialAlbumDetailsState} from './album-details.state';
import { AlbumListState, initialAlbumListState } from './album-list.state';

export type ContainersState = Readonly<{
  albumDetails: AlbumDetailsState
  albumList: AlbumListState
}>;

export const initialContainersState: ContainersState = {
  albumDetails: initialAlbumDetailsState,
  albumList: initialAlbumListState
}
