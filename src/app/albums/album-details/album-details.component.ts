import {Component, OnDestroy, OnInit} from '@angular/core';
import {Album} from 'app/model/album.interface';
import {Image} from 'app/model/image.interface';
import {ActivatedRoute} from '@angular/router';
import {SelectedAlbumSandbox} from '../../sandboxes/selected-album.sandbox';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {AlbumSandbox} from '../../sandboxes/albums.sandbox';
import {SelectedImageSandbox} from '../../sandboxes/selected-image.sandbox';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit, OnDestroy {
  album: Album;
  actions = {
    handleClickCard: (image) => this._selectedImageSandbox.setSelectedImage(image)
  };
  selectedImage$: Observable<Image> = this._selectedImageSandbox.selectedImage$;

  constructor(private _route: ActivatedRoute,
              private _albumSandbox: AlbumSandbox,
              private _selectedAlbumSandbox: SelectedAlbumSandbox,
              private _selectedImageSandbox: SelectedImageSandbox) { }

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    this._albumSandbox.getAlbum(id).subscribe(album => {
      this.album = album;
      this._selectedAlbumSandbox.setSelectedAlbum(album);
    });
  }

  ngOnDestroy(): void {
    this._selectedAlbumSandbox.setSelectedAlbum(null);
    this._selectedImageSandbox.setSelectedImage(null);
  }
}
