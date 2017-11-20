import { Component, OnInit } from '@angular/core';
import {Album, createAlbum} from 'app/model/album.interface';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import {AlbumSandbox} from '../../sandboxes/albums.sandbox';
import {AngularFireAuth} from 'angularfire2/auth';
import {SelectedAlbumSandbox} from '../../sandboxes/album-details.sandbox';

@Component({
  selector: 'app-albums',
  templateUrl: './albumlist.component.html',
  styleUrls: ['./albumlist.component.css']
})
export class AlbumsComponent implements OnInit {
  albums: Observable<Album[]>;
  actions = {
    handleClickCard: (album) => {
      this._router.navigate([`/albums/${album.id}`]);
    }
  };

  constructor(
    private _router: Router,
    private _albumSandbox: AlbumSandbox,
    public  afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.albums = this._albumSandbox.albums$;
    this._albumSandbox.loadAlbums();
  }

  createAlbum() {
    // this._selectedAlbumSandbox.setSelectedAlbum(createAlbum());
    this._router.navigate([`/albums/new`]);
  }
}
