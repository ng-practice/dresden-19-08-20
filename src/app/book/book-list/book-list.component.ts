import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from '../shared/book';
import { State } from '../store';

@Component({
  selector: 'book-list',
  templateUrl: 'book-list.component.html',
  styleUrls: ['book-list.component.css']
})
export class BookListComponent {
  books$: Observable<Book[]>;

  constructor(private store: Store<State>) {
    this.books$ = this.store.pipe(select(state => state.book.collection.all));
  }
}
