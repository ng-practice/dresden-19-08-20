import { createReducer, on } from '@ngrx/store';
import { Book } from '../shared/book';
import { createSuccess, loadAllSuccess } from './book.actions';

export interface BookSlice {
  all: Readonly<Book[]>;
}

const initialState: BookSlice = { all: [] };

export const bookReducer = createReducer(
  initialState,
  on(loadAllSuccess, (slice, { books }) => ({
    ...slice,
    all: books
  })),
  on(createSuccess, (slice, { book }) => ({
    ...slice,
    all: [book, ...slice.all]
  }))
);
