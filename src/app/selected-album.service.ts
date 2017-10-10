import { Injectable } from '@angular/core';
import {Album} from './statemanagement/state/data/data.state';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class SelectedAlbumService {
  private _selectedAlbum = new Subject<Album>();

  constructor() { }

  getSelectedAlbum(): Observable<Album> {
    return this._selectedAlbum.asObservable();
  }

  setSelectedAlbum(newAlbum: Album) {
    this._selectedAlbum.next(newAlbum);
  }

  getSelectedAlbumTitle(): Observable<string> {
    return this.getSelectedAlbum().map(album => album.name);
  }

}
