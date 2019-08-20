import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Book } from '../shared/book';
import { BookDataService } from '../shared/book-data.service';
import { BookStaticAsyncDataService } from './../shared/book-static-async-data.service';
import { BookEditComponent } from './book-edit.component';

describe('BookEditComponent', () => {
  let component: BookEditComponent;
  let fixture: ComponentFixture<BookEditComponent>;
  let compiled;
  let service: BookDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookEditComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: BookDataService, useClass: BookStaticAsyncDataService }
      ]
    }).compileComponents();

    service = TestBed.get(BookDataService);
  });

  // async have to stay since we use template driven forms
  beforeEach(async(() => {
    fixture = TestBed.createComponent(BookEditComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  }));

  it('should display the isbn of the loaded book', () => {
    const isbn = '978-0-20163-361-0';
    component.book = { isbn } as Book;

    const isbnInput: HTMLInputElement = fixture.debugElement.query(
      By.css('[data-testid=isbn-input]')
    ).nativeElement;

    expect(isbnInput.value).toBe(isbn);
  });

  it('should validate that title is required and show an error message', () => {
    const isbn = '978-0-20163-361-0';
    component.book = { isbn } as Book;

    const titleInput: HTMLInputElement = fixture.debugElement.query(
      By.css('[data-testid=title-input]')
    ).nativeElement;
    titleInput.value = '';
    titleInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const validationMessage: HTMLElement = fixture.debugElement.query(
      By.css('[data-testid=title-validation-message]')
    ).nativeElement;

    expect(validationMessage.hasAttribute('hidden')).toBe(false);
  });

  it('should submit the whole form on click on the submit button', () => {
    const updateBookSpy = spyOn(service, 'updateBook');

    const submitButton: HTMLButtonElement = fixture.debugElement.query(
      By.css('[data-testid=book-submit]')
    ).nativeElement;

    submitButton.click();
    fixture.detectChanges();

    expect(updateBookSpy).toHaveBeenCalled();
  });
});
