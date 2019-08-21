import { createAction, props } from '@ngrx/store';
import { Book } from '../shared/book';

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
