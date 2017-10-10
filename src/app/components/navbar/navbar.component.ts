import {Component, Input, OnInit} from '@angular/core';
import {SelectedAlbumService} from '../../selected-album.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title: Observable<string> = this._selectedAlbumService.getSelectedAlbumTitle();

  constructor(private _selectedAlbumService: SelectedAlbumService) { }

  ngOnInit() {
  }

}
