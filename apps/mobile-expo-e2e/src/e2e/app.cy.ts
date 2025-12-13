describe('mobile-expo web', () => {
  it('shows the main screen', () => {
    cy.visit('/');

    // Update text to something you actually see in App.tsx
    cy.contains(/Fullstack Nx18 Workspace – Mobile Projects/i).should('exist');
  });
});
