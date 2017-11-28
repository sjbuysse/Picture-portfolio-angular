import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import * as actions from '../actions/data/albums.actions';
import * as albumListActions from '../actions/containers/album-list.actions';
import { CardState, createCardSate } from '../state/containers/album-list.state';
import { Card } from '../../components/card/card.model';
import { Album } from '../../model/album.interface';

@Injectable()
export class AlbumListEffects {
  @Effect() createAlbumCardState$: Observable<Action> = this.actions$.ofType(actions.ActionTypes.ADD_ALBUM)
    .map((action: actions.AddAlbum) => new albumListActions.AddCardState(action.payload.album, createCardSate()));

  @Effect() SetAllAlbumCardStates$: Observable<Action> = this.actions$.ofType(actions.ActionTypes.ADD_All_ALBUMS)
    .map((action: actions.AddAllAlbum) => {
      const cardStates: WeakMap<Album, CardState> = new WeakMap();
      action.payload.albums.forEach(album => cardStates.set(album, createCardSate()));
      return new albumListActions.SetAllCardStates(cardStates);
    });

  constructor(private actions$: Actions) {
  }
}
