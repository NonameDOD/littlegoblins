describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://nonamedod.github.io/littlegoblins/test/almok_test.html");
  });
  it("passes", () => {
    cy.visit("https://nonamedod.github.io/littlegoblins/test/almok_test.html");
    let offset = 6;
    let sorRend = [1,1+offset,2,2+offset,3,3+offset,4,4+offset,5,5+offset,6,6+offset];
    //cy.get('.card').eq(1).click();
    //cy.get('.card').eq(7).click().should('have.class', 'border-success');
    for(let i = 1;i<sorRend.length;i++){
      cy.get('.card').eq(sorRend[i]).click();
    }
  });
});
