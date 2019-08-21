import { Action, combineReducers } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { BookSlice, reducer } from './book.reducer';

export const bookFeatureName = 'book';

interface BookFeature {
  collection: BookSlice;
}

export interface State extends fromRoot.State {
  [bookFeatureName]: BookFeature;
}

export function bookReducers(state: BookFeature, action: Action) {
  return combineReducers<BookFeature>({
    collection: reducer
  })(state, action);
}
