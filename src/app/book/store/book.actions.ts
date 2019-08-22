import { createAction, props } from '@ngrx/store';
import { Book } from '../shared/book';

export const create = createAction(
  '[Book/API] Create new book',
  props<{ book: Book }>()
);

export const createSuccess = createAction(
  '[Book/API] Create new book successful',
  props<{ book: Book }>()
);

export const updateBook = createAction(
  '[Book/API] Update book',
  props<{ book: Book }>()
);

export const updateBookSuccess = createAction(
  '[Book/API] Update book success',
  (payload: { book: Book }) => ({
    book: {
      id: payload.book.isbn,
      changes: payload.book
    }
  })
);

// trigger http request loading books
export const loadAll = createAction('[Book/API] Load all books');

// store loaded books on http request success
export const loadAllSuccess = createAction(
  '[Book/API] Load all books successful',
  props<{ books: Book[] }>()
);

export const loadAllError = createAction(
  '[Book/API] Books could not be loaded'
);
