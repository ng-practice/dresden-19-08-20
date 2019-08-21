import { createReducer, on } from '@ngrx/store';
import { Book } from '../shared/book';
import { loadAllSuccess } from './book.actions';

export interface BookSlice {
  all: Book[];
}

const initialState: BookSlice = { all: [] };

export const reducer = createReducer(
  initialState,
  on(loadAllSuccess, (slice, { books }) => ({
    ...slice,
    all: books
  }))
  // Longer version
  //
  // on(loadAllSuccess, (state, action) => {
  //   const newState = { ...state };
  //   newState.all = action.books;
  //   return newState;
  // })
);
