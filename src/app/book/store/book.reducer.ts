import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Book } from '../shared/book';
import {
  createSuccess,
  loadAllSuccess,
  updateBookSuccess
} from './book.actions';

export interface BookSlice extends EntityState<Book> {
  all: Readonly<Book[]>;
}

const adapter = createEntityAdapter<Book>({
  selectId: book => book.isbn
});

const initialState: BookSlice = adapter.getInitialState({
  all: []
});

export const bookReducer = createReducer(
  initialState,
  on(loadAllSuccess, (slice, { books }) => adapter.addAll(books, slice)),
  // on(loadAllSuccess, (slice, { books }) => ({
  //   ...slice,
  //   all: books,
  // })),
  on(createSuccess, (slice, { book }) => ({
    ...slice,
    all: [book, ...slice.all]
  })),
  on(updateBookSuccess, (slice, { book: updatedBook }) => ({
    ...slice,
    all: slice.all.map(book =>
      book.isbn === updatedBook.isbn ? updatedBook : book
    )
  }))
);
