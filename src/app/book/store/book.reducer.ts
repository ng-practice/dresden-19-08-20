import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Book } from '../shared/book';
import {
  createSuccess,
  loadAllSuccess,
  updateBookSuccess
} from './book.actions';

export interface BookSlice extends EntityState<Book> {}

export const adapter = createEntityAdapter<Book>({
  selectId: book => book.isbn
});

const initialState: BookSlice = adapter.getInitialState();

export const bookReducer = createReducer(
  initialState,
  on(loadAllSuccess, (slice, { books }) => adapter.addAll(books, slice)),
  on(createSuccess, (slice, { book }) => adapter.addOne(book, slice)),
  on(updateBookSuccess, (slice, { book }) =>
    adapter.updateOne({ id: book.isbn, changes: book }, slice)
  )
);
