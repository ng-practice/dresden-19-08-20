import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';

/* tslint:disable:no-unused-variable */

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, NavigationComponent],
      imports: [RouterTestingModule]
    });
  });

  it('should render an app title', () => {
    const fixture = TestBed.createComponent(AppComponent);

    // import { By } from '@angular/platform-browser'
    const appTitleContainer: HTMLElement = fixture.debugElement.query(
      By.css('.navbar-brand')
    ).nativeElement;

    expect(appTitleContainer.innerHTML).toContain('🐵');
  });

  it('default test', () => {
    expect(true).toBeTruthy();
  });
});
