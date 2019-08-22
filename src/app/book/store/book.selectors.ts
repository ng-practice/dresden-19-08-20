import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookFeature, bookFeatureName } from '.';
import { selectRouteParam } from '../../reducers';

const bookFeature = createFeatureSelector<BookFeature>(bookFeatureName);

export const allBooks = createSelector(
  bookFeature,
  context => context.collection.all
);

export const currentBook = createSelector(
  allBooks,
  selectRouteParam('isbn'),
  (books, isbn) => books.find(book => book.isbn === isbn)
);
