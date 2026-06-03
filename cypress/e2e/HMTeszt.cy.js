describe("template spec", () => {
  it("Oldal látogatás", () => {
    cy.visit("https://nonamedod.github.io/littlegoblins/test/almok_test.html");
  });
  it("Memoria játék funkcionalitás (nem random)", () => {
    cy.visit("https://nonamedod.github.io/littlegoblins/test/almok_test.html");
    let offset = 6;
    let sorRend = [0, 0 + offset, 1, 1 + offset, 2, 2 + offset,
       3, 3 + offset, 4, 4 + offset, 5, 5 + offset];
    for (let i = 0; i < sorRend.length; i++) {
      cy.get('.card').eq(sorRend[i]).click();
    }
    for (let i = 0; i < sorRend.length; i++) {
      cy.get('.card').eq(sorRend[i])
      .should('have.class', 'border-success');
    }
    cy.get('.col-12').should('be.visible');
  });
});

