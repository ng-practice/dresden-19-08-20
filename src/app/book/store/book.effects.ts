import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BookDataService } from '../shared/book-data.service';
import { loadAll, loadAllError, loadAllSuccess } from './book.actions';

@Injectable()
export class BookEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAll),
      switchMap(_action => this.bookService.getBooks()),
      // returned action is dispatched automatically for you
      map(books => loadAllSuccess({ books })),
      catchError(err => {
        // displaying error messages should be done by the respective service.
        console.warn('Caught error in BookEffects', err);
        return of(loadAllError());
      })
    )
  );

  constructor(
    private actions$: Actions,
    private bookService: BookDataService
  ) {}
}
