import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Album} from 'app/model/album.interface';
import {SelectedAlbumSandbox} from '../../sandboxes/selected-album.sandbox';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  selectedAlbum$: Observable<Album> = this._selectedAlbumSandbox.selectedAlbum$;

  constructor(private _selectedAlbumSandbox: SelectedAlbumSandbox,
              public  afAuth: AngularFireAuth
              ) { }

  ngOnInit() {
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
