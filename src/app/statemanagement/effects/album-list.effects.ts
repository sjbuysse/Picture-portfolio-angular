import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import * as actions from '../actions/data/albums.actions';
import * as albumListActions from '../actions/containers/album-list.actions';
import { createCardSate } from '../state/containers/album-list.state';

@Injectable()
export class AlbumListEffects {
  @Effect() createAlbumCardState$: Observable<Action> = this.actions$.ofType(actions.ActionTypes.ADD_ALBUM)
    .map((action: actions.AddAlbum) => new albumListActions.AddCardState(createCardSate(action.payload.album.id)));

  @Effect() SetAllAlbumCardStates$: Observable<Action> = this.actions$.ofType(actions.ActionTypes.ADD_All_ALBUMS)
    .map((action: actions.AddAllAlbum) => {
      const cardStates = action.payload.albums.map(album => createCardSate(album.id));
      return new albumListActions.SetAllCardStates(cardStates);
    });

  constructor(private actions$: Actions) {
  }
}
