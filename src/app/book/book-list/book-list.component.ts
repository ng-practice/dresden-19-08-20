import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from '../shared/book';
import { BookDataService } from '../shared/book-data.service';
import { State } from '../store';
import { loadAllSuccess } from '../store/book.actions';

@Component({
  selector: 'book-list',
  templateUrl: 'book-list.component.html',
  styleUrls: ['book-list.component.css']
})
export class BookListComponent implements OnInit {
  books$: Observable<Book[]>;

  constructor(private store: Store<State>, private bookData: BookDataService) {}

  ngOnInit() {
    this.books$ = this.store.pipe(select(state => state.book.collection.all));

    // TODO refactor
    this.bookData.getBooks().subscribe(books => {
      this.store.dispatch(loadAllSuccess({ books }));
    });
  }
}
