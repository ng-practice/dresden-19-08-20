import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Book } from '../shared/book';
import { BookDataService } from '../shared/book-data.service';
// import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'book-detail',
  templateUrl: 'book-detail.component.html',
  styleUrls: ['book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  public book$: Observable<Book>;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookDataService
  ) {}

  ngOnInit() {
    this.book$ = this.route.params.pipe(
      switchMap((params: { isbn: string }) =>
        this.bookService.getBookByIsbn(params.isbn)
      )
    );
  }
}
