describe('web-angular', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display welcome message', () => {
    cy.contains('Fullstack Nx18 Angular').should('exist'); // or your actual title text
  });
});
