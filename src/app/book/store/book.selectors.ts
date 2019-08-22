import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookFeature, bookFeatureName } from '.';
import { selectRouteParam } from '../../reducers';
import { adapter } from './book.reducer';

const bookFeature = createFeatureSelector<BookFeature>(bookFeatureName);

const bookEntitiesState = createSelector(
  bookFeature,
  book => book.collection
);

export const { selectAll: allBooks } = adapter.getSelectors(bookEntitiesState);

export const currentBook = createSelector(
  allBooks,
  selectRouteParam('isbn'),
  (books, isbn) => books.find(book => book.isbn === isbn)
);
