import { Component, OnInit } from '@angular/core';
import {Album, Image} from '../../statemanagement/state/data/data.state';
import {AlbumService} from '../album.service';
import {ActivatedRoute} from '@angular/router';
import {SelectedAlbumService} from '../../selected-album.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit {
  selectedImage: Image;
  album: Album;
  actions = {
    handleClickCard: (image) => this._setSelectedImage(image)
  };

  constructor(private _route: ActivatedRoute,
              private _albumService: AlbumService,
              private _selectedAlbumService: SelectedAlbumService) { }

  private _setSelectedImage(image: Image) {
    this.selectedImage = image;
  }

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    this._albumService.getSingleAlbum(id).subscribe(album => {
      this.album = album;
      this._selectedAlbumService.setSelectedAlbum(album);
    });
  }

}
