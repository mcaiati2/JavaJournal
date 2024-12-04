import { faker } from '@faker-js/faker';

let uniqueUsername;
const password = 'password123';
let shopName;

function loginUser(cy) {
  cy.visit('/login');

  cy.get('input[name="email"]').type(uniqueUsername + '@test.com');
  cy.get('input[name="password"]').type(password);
  cy.get('form button').click();

  // Wait for the dashboard to load
  cy.url().should('include', '/dashboard');
}

describe('Site Tests', () => {
  before(() => {
    uniqueUsername = faker.internet.userName();
  });

  it('Should register a new user', () => {
    // Visit the register page
    cy.visit('/register');

    // Select the username input and type a fake name
    cy.get('input[name="username"]').type(uniqueUsername);

    // Select the email input and type the fake name@test.com
    cy.get('input[name="email"]').type(uniqueUsername + '@test.com');

    // Select password input and type 'password123'
    cy.get('input[name="password"]').type(password);

    // Confirm password input
    cy.get('input[name="confirmPassword"]').type(password);

    // Ensure the form is fully loaded
    // cy.wait(1000); // Adjust the time as needed

    // Ensure the button is visible before clicking it
    cy.get('form').find('button[type="submit"]').should('be.visible').click({ force: true });

    // Ensure the form submission is successful
    cy.url().should('include', '/dashboard');
    cy.get('h3').contains('Your Shops');
  });

  it('Should login a user', () => {
    loginUser(cy);

    // Increase the timeout for the assertion
    cy.get('h3.mt-4.fw-light', { timeout: 20000 }).should('contain.text', 'Your Shops');
  });

  it('Should be able to navigate to the register page', () => {
    cy.visit('/');

    cy.get('nav a[href="/register"]').click();

    cy.get('form h2').contains('Register');
  });

  it('Should log a user out', () => {
    loginUser(cy);

    cy.get('nav a').contains('Settings').click();

    cy.get('nav a').contains('Log Out').click();

    cy.get('nav').should('not.contain', 'Dashboard');

    cy.get('h1').contains('JavaJournal');
  });

  it('Should be able to create a shop for the logged in user', () => {
    shopName = faker.company.name();

    loginUser(cy);

    cy.get('nav a[href="/shop"]').click();

    cy.get('input[name="name"]').type(shopName);
    cy.get('input[name="location"]').type('USA');
    cy.get('.react-stars > :nth-child(5)').click(); // Adjust the selector as needed

    cy.get('form button').click();

    // Check that the shop shows up on the dashboard
    cy.get('.shop-output').contains(shopName);
  });

  it('Should add a coffee for a shop', () => {
    const coffeeTitle = 'Coffee for ' + shopName;

    loginUser(cy);

    cy.get('article')
      .contains(shopName)
      .get('button')
      .first()
      .click();

    cy.get('input[name="title"]').type(coffeeTitle);
    cy.get('textarea[name="body"]').type('test');

    cy.get('.modal-footer button').last().click();

    cy.get('article')
      .contains(shopName)
      .get('button')
      .contains('View Coffees')
      .click();

    cy.get('.modal-body').contains(coffeeTitle);
  });
});