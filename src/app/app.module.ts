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

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    AlbumDetailsComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(rootReducer, {
      initialState: initialAppState
    }),
    RouterModule.forRoot([
      {path: 'albums', component: AlbumsComponent},
      {path: 'albums/:id', component: AlbumDetailsComponent},
      {path: '', redirectTo: 'albums', pathMatch: 'full'}
    ])
  ],
  providers: [
    AlbumService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
