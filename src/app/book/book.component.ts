import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadAll } from './store/book.actions';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.store.dispatch(loadAll());
  }
}
