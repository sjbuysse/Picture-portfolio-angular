import { Component, OnInit } from '@angular/core';
import { Album } from 'app/model/album.interface';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import {AlbumSandbox} from '../../sandboxes/albums.sandbox';

@Component({
  selector: 'app-albums',
  templateUrl: './albumlist.component.html',
  styleUrls: ['./albumlist.component.css']
})
export class AlbumsComponent implements OnInit {
  albums: Observable<Album[]>;
  actions = {
    handleClickCard: (album) => this._navigateToAlbumDetails(album)
  };

  constructor(private _albumSandbox: AlbumSandbox, private _router: Router) { }

  _navigateToAlbumDetails(album: Album) {
    this._router.navigate([`/albums/${album.id}`]);
  }

  ngOnInit() {
    this.albums = this._albumSandbox.albums$;
  }

}
