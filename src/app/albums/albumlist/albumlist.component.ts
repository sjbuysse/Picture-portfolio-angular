import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { Album } from '../../statemanagement/state/data/data.state';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

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

  constructor(private _albumService: AlbumService, private _router: Router) { }

  _navigateToAlbumDetails(album: Album) {
    this._router.navigate([`/albums/${album.id}`]);
  }

  ngOnInit() {
    this.albums = this._albumService.getAlbums();
  }

}
