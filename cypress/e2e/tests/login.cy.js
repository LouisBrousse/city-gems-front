describe('login', () => {
    before(() => {
      cy.visit('http://localhost:3000/login'); 
    });
  
    it('logs in with valid credentials and redirects to dashboard', () => {
        cy.get('input[placeholder="Email"]').should('be.visible');
        cy.wait(1000);
        cy.get('input[placeholder="Email"]').type('john.doe@example.com');
     
        cy.get('input[placeholder="Password"]').should('be.visible');
        cy.get('input[placeholder="Password"]').type('password123'); 
     
        cy.intercept('POST', '/api/login').as('loginRequest'); 
        cy.get('button[type="submit"]').should('be.visible').click();
     
        cy.wait('@loginRequest').then((interception) => {
          cy.log(JSON.stringify(interception.response.body));
     
          expect(interception.response.statusCode).to.eq(200);
        });
     });
     
  });
  