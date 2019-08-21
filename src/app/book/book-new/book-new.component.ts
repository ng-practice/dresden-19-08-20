import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../store';
import { create } from '../store/book.actions';

@Component({
  selector: 'book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.css']
})
export class BookNewComponent {
  form: FormGroup;

  constructor(private store: Store<State>, private fb: FormBuilder) {
    this.form = this.setupCreationForm();
  }

  onSubmit() {
    this.store.dispatch(
      create({
        book: {
          id: this.form.value.isbn,
          isbn: this.form.value.isbn,
          title: this.form.value.title,
          author: this.form.value.author,
          subtitle: '',
          abstract: '',
          numPages: 123,
          publisher: {
            name: '',
            url: ''
          }
        }
      })
    );
  }

  private setupCreationForm(): FormGroup {
    return this.fb.group({
      isbn: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13)
        ])
      ],
      title: ['', Validators.required],
      author: ['', Validators.required]
    });
  }
}
