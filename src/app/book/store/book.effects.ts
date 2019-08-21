import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { BookDataService } from '../shared/book-data.service';
import {
  create,
  createSuccess,
  loadAll,
  loadAllError,
  loadAllSuccess
} from './book.actions';

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

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(create),
      switchMap(({ book }) => this.bookService.createBook(book)),
      map(createdBook => createSuccess({ book: createdBook }))
    )
  );

  navigateAfterBookCreation$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createSuccess),
        tap(() => this.router.navigateByUrl('/'))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private bookService: BookDataService,
    private router: Router
  ) {}
}
