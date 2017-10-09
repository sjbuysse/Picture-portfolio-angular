import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { rootReducer } from './statemanagement/reducers/root.reducer';
import { initialAppState } from './statemanagement/state/app.state';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(rootReducer, {
      initialState: initialAppState
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
