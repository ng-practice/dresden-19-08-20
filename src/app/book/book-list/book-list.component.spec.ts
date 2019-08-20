import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BookDataService } from '../shared/book-data.service';
import { BookStaticAsyncDataService } from './../shared/book-static-async-data.service';
import { BookListComponent } from './book-list.component';

describe('BookListComponent', () => {
  let fixture: ComponentFixture<BookListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookListComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: BookDataService,
          useClass: BookStaticAsyncDataService
        }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    fixture.detectChanges();
  });

  it('should receive 3 Books', () => {
    const renderedBooks = fixture.debugElement.queryAll(By.css('.book-row'));
    expect(renderedBooks.length).toBe(3);
  });

  it('should display the title of each book', () => {
    const renderedBooks = fixture.debugElement.queryAll(By.css('.book-row'));
    const titleLinks: HTMLAnchorElement[] = renderedBooks.map(
      renderedBook => renderedBook.query(By.css('a[href]')).nativeElement
    );
    const hasTitlesSet = titleLinks.every(link => !!link.innerHTML);
    expect(hasTitlesSet).toBe(true);
  });

  it('should link to the edit page of each book', () => {
    const renderedBooks = fixture.debugElement.queryAll(By.css('.book-row'));
    const titleLinks: HTMLAnchorElement[] = renderedBooks.map(
      renderedBook => renderedBook.query(By.css('a[href]')).nativeElement
    );
    const hasLinksSet = titleLinks.every(link => !!link.getAttribute('href'));
    expect(hasLinksSet).toBe(true);
  });
});
