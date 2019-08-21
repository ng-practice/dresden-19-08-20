import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookFeature, bookFeatureName } from '.';

const bookFeature = createFeatureSelector<BookFeature>(bookFeatureName);

export const allBooks = createSelector(
  bookFeature,
  context => context.collection.all
);
