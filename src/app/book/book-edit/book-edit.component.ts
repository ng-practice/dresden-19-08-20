import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Book } from '../shared/book';
import { BookDataService } from '../shared/book-data.service';
import { State } from '../store';
import { updateBook } from '../store/book.actions';
import { currentBook } from '../store/book.selectors';

@Component({
  selector: 'book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit, OnDestroy {
  book: Book;
  sink = new Subscription();

  constructor(
    private store: Store<State>,
    private bookService: BookDataService
  ) {}

  ngOnInit(): void {
    this.sink.add(
      this.store
        .pipe(select(currentBook))
        .subscribe(book => (this.book = { ...book }))
    );
  }

  ngOnDestroy(): void {
    this.sink.unsubscribe();
  }

  onSubmit() {
    this.store.dispatch(updateBook({ book: this.book }));
  }
}
