import { faker } from '@faker-js/faker';

const username = faker.internet.userName();
const shopName = faker.company.name();

function loginUser(cy) {
  cy.visit('/login');

  cy.get('input[name="email"]').type(username + '@test.com');

  cy.get('input[name="password"]').type('password123');

  cy.get('form button').click();

  // Wait for the dashboard to load
  cy.url().should('include', '/dashboard');
}

describe('Site Tests', () => {
  // Other tests...

  it('Should login a user', () => {
    loginUser(cy);

    // Increase the timeout for the assertion
    cy.get('h3', { timeout: 10000 }).contains('Your Shops');
  });
  it('Should be able to navigate to the register page', () => {
    cy.visit('/');

    cy.get('nav a[href="/register"]').click();

    cy.get('form h2').contains('Register');
  });

  it('Should register a new user', () => {
    const uniqueUsername = faker.internet.userName();

    // Visit the register page
    cy.visit('/register');

    // Select the username input and type a fake name
    cy.get('input[name="username"]').type(uniqueUsername);

    // Select the email input and type the fake name@test.com
    cy.get('input[name="email"]').type(uniqueUsername + '@test.com');

    // Select password input and type 'password123'
    cy.get('input[name="password"]').type('password123');

    // Select the Submit button and click it
    cy.get('form button').click();

    // You should be able to select the header on the dashboard that contains the text Your Shops
    cy.get('h3').contains('Your Shops');
  });

  it('Should login a user', () => {
    loginUser(cy);

    cy.get('h3').contains('Your Shops');
  });

  // Log out test
  it('Should log a user out', () => {
    loginUser(cy);

    cy.get('nav a').contains('Profile Menu').click();

    cy.get('nav a').contains('Log Out').click();

    cy.get('nav').should('not.contain', 'Dashboard');

    cy.get('h1').contains('JavaJournal');
  });

  it('Should be able to create a shop for the logged in user', () => {
    const uniqueShopName = faker.company.name();

    loginUser(cy);

    cy.get('nav a[href="/shop"]').click();

    cy.get('input[name="name"]').type(uniqueShopName);

    cy.get('input[name="location"]').type('USA');

    cy.get('input[name="rating"]').type(5);

    cy.get('form button').click();

    // Check that the shop shows up on the dashboard
    cy.get('.shop-output').contains(uniqueShopName);
  });

  // Adds a coffee for a shop
  it('Should add a coffee for a shop', () => {
    const coffeeTitle = 'Coffee for ' + shopName;

    loginUser(cy);

    cy.get('article')
      .contains(shopName)
      .get('button')
      .first()
      .click();

    cy.get('input[name="title"]').type(coffeeTitle);
    cy.get('textarea[name="body"]').type('Oh happy day, I gets a tweat');

    cy.get('.modal-footer button').last().click();

    cy.get('article')
      .contains(shopName)
      .get('button')
      .contains('View Coffees')
      .click();

    cy.get('.modal-body').contains(coffeeTitle);
  });
});