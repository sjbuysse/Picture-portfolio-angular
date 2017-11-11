import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { rootReducer } from './statemanagement/reducers/root.reducer';
import { initialAppState } from './statemanagement/state/app.state';
import { StoreModule } from '@ngrx/store';
import { AlbumsComponent } from './albums/albumlist/albumlist.component';

import { AlbumService } from './albums/album.service';

import { AlbumDetailsComponent } from './albums/album-details/album-details.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardComponent } from './components/card/card.component';
import { ModalComponent } from './components/modal/modal.component';
import {SelectedAlbumSandbox} from './sandboxes/selected-album.sandbox';
import {AlbumSandbox} from './sandboxes/albums.sandbox';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SelectedImageSandbox} from './sandboxes/selected-image.sandbox';

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    AlbumDetailsComponent,
    NavbarComponent,
    CardComponent,
    ModalComponent,
    LoginComponent
  ],
  entryComponents: [
    CardComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    StoreModule.forRoot(rootReducer, {
      initialState: initialAppState
    }),
    RouterModule.forRoot([
      {path: 'admin', component: LoginComponent},
      {path: 'albums', component: AlbumsComponent},
      {path: 'albums/:id', component: AlbumDetailsComponent},
      {path: '', redirectTo: 'albums', pathMatch: 'full'},
    ]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [
    AlbumService,
    AlbumSandbox,
    SelectedAlbumSandbox,
    SelectedImageSandbox
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
