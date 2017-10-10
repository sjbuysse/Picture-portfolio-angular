import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Album} from '../../statemanagement/state/data/data.state';
import {AlbumService} from '../album.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit {
  album: Album;

  constructor(private _route: ActivatedRoute, private _albumService: AlbumService) { }

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    this._albumService.getSingleAlbum(id).subscribe(album => this.album = album);
  }

}
