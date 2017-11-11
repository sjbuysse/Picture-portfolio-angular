import {ActionReducer} from '@ngrx/store';
import {Album} from 'app/model/album.interface';
import * as selectedImageActions from 'app/statemanagement/actions/data/selected-image.actions';
import {Image} from 'app/model/image.interface';

export const selectedImageReducer: ActionReducer<Image> = (
  state: Image, action: selectedImageActions.Actions) => {
  switch (action.type) {
    case selectedImageActions.ActionTypes.SET_SELECTED_IMAGE:
      return action.payload.image;

    default:
      return state;
  }
}
