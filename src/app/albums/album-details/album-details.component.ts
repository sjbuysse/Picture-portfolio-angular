import {Component, OnDestroy, OnInit} from '@angular/core';
import {Album} from 'app/model/album.interface';
import {Image} from 'app/model/image.interface';
import {ActivatedRoute} from '@angular/router';
import {SelectedAlbumSandbox} from '../../sandboxes/selected-album.sandbox';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {AlbumSandbox} from '../../sandboxes/albums.sandbox';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit, OnDestroy {
  album: Album;
  actions = {
    handleClickCard: (image) => this._setSelectedImage(image)
  };

  private _selectedImageSubject = new Subject<Image>();
  selectedImage$: Observable<Image> = this._selectedImageSubject.asObservable();

  constructor(private _route: ActivatedRoute,
              private _albumSandbox: AlbumSandbox,
              private _selectedAlbumSandbox: SelectedAlbumSandbox) { }

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    this._albumSandbox.getAlbum(id).subscribe(album => {
      this.album = album;
      this._selectedAlbumSandbox.setSelectedAlbum(album);
    });
  }

  ngOnDestroy(): void {
    this._selectedAlbumSandbox.setSelectedAlbum(null);
  }


  private _setSelectedImage(image: Image) {
    this._selectedImageSubject.next(image);
  }


}
