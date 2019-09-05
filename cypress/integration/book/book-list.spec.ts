describe('View: Book list', () => {
  beforeEach(() => {
    cy.server();
    cy.route('GET', 'http://localhost:4730/books', 'fixture:books.json');

    cy.visit('http://localhost:4200');
  });

  context('When the page is loaded', () => {
    it('displays the title "BookMonkey"', () => {
      cy.get('.navbar-brand').contains('BookMonkey');
    });

    it('loads some books', () => {
      cy.get('[data-testid=book-item]').should('have.length', 2);
    });
  });

  context('Book creation', () => {
    const isbn = 'f-dlr93485323';

    it('adds a book to the list after creating it', () => {
      let count = 0;

      cy.get('[data-testid=book-item]')
        .as('books')
        .then(books => (count = books.length));
      cy.get('[data-testid=create-navigation-button]').click();
      cy.get('[formControlName=isbn]').type(isbn);
      cy.get('[formControlName=title]').type('Hi from cypress');
      cy.get('[formControlName=author]').type('Glen');
      cy.get('[data-testid=create-book-btn]').click();

      cy.get('@books').then(books => expect(books.length).to.eq(count + 1));
    });

    afterEach(() =>
      cy.request('DELETE', `http://localhost:4730/books/${isbn}`)
    );
  });
});
