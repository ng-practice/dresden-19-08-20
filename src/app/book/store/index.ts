import { Action, combineReducers } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { bookReducer, BookSlice } from './book.reducer';

export const bookFeatureName = 'book';

export interface BookFeature {
  collection: BookSlice;
}

export interface State extends fromRoot.State {
  [bookFeatureName]: BookFeature;
}

export function bookReducers(state: BookFeature, action: Action) {
  return combineReducers<BookFeature>({
    collection: bookReducer
  })(state, action);
}
