import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { of } from 'rxjs';
import { instance, mock, when } from 'ts-mockito';
import { BookDataService } from '../shared/book-data.service';
import { loadAll, loadAllSuccess } from './book.actions';
import { BookEffects } from './book.effects';

fdescribe('Effect: Book', () => {
  let actions$: Actions;
  let service: BookDataService;
  let effects: BookEffects;

  beforeEach(() => {
    service = mock(service);

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

    it('yields an error when something went wrong', () => {});
  });
});
