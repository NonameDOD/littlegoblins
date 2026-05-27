describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://nonamedod.github.io/littlegoblins/test/almok_test.html");
  });
  it("passes", () => {
    cy.visit("https://nonamedod.github.io/littlegoblins/test/almok_test.html");
cy.get(':nth-child(1) > .card').click();
cy.get(':nth-child(7) > .card').click().should('have.class', 'border-success');
  });
});
