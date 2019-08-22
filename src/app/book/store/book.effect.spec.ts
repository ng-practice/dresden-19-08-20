import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, throwError } from 'rxjs';
import { anything, instance, mock, when } from 'ts-mockito';
import { Book } from '../shared/book';
import { BookDataService } from '../shared/book-data.service';
import {
  loadAll,
  loadAllError,
  loadAllSuccess,
  updateBook,
  updateBookSuccess
} from './book.actions';
import { BookEffects } from './book.effects';

describe('Effect: Book', () => {
  let actions$: Actions;
  let service: BookDataService;
  let effects: BookEffects;

  beforeEach(() => {
    service = mock(BookDataService);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        BookEffects,
        provideMockActions(() => actions$),
        {
          provide: BookDataService,
          useFactory: () => instance(service)
        }
      ]
    });

    effects = TestBed.get(BookEffects);
  });

  describe('When books are loaded', () => {
    it('yields a collection of books on success', () => {
      when(service.getBooks()).thenReturn(of([]));
      actions$ = of(loadAll());

      effects.loadAll$.subscribe(action => {
        expect(action.type).toBe(loadAllSuccess.type);
        expect((action as any).books).toEqual([]);
      });
    });

    it('yields an error when something went wrong', () => {
      when(service.getBooks()).thenReturn(throwError({}));
      actions$ = of(loadAll());

      effects.loadAll$.subscribe(action => {
        expect(action.type).toBe(loadAllError.type);
      });
    });
  });

  describe('When a book is updated', () => {
    it('yields the updated book on success', () => {
      const book = { isbn: '1-2-3' } as Book;
      when(service.updateBook(anything(), anything())).thenReturn(of(book));
      actions$ = of(updateBook({ book }));

      effects.update$.subscribe(action => {
        expect(action.type).toBe(updateBookSuccess.type);
        expect((action as any).book).toEqual({ id: book.isbn, changes: book });
      });
    });
  });
});
