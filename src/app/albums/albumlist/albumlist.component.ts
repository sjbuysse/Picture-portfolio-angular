import { Component, OnInit } from '@angular/core';
import {AlbumService} from '../album.service';
import {Album} from '../../statemanagement/state/data/data.state';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-albums',
  templateUrl: './albumlist.component.html',
  styleUrls: ['./albumlist.component.css']
})
export class AlbumsComponent implements OnInit {
  albums: Observable<Album[]>;

  constructor(private _albumService: AlbumService) { }

  ngOnInit() {
    this.albums = this._albumService.getAlbums();
  }

}
