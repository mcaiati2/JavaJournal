import React from 'react';
import { mount } from 'cypress/react18';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';

import Header from '../../src/components/Header';
import { LOGOUT_USER } from '../../src/graphql/mutations';
import { StoreProvider } from '../../src/store';

const mocks = [
  {
    request: {
      query: LOGOUT_USER,
    },
    result: {
      data: {
        logoutUser: {
          message: 'Logged out successfully',
        },
      },
    },
  },
];

describe('<Header />', () => {
  it('Should render and display navigation links', () => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <StoreProvider>
            <Header />
          </StoreProvider>
        </MemoryRouter>
      </MockedProvider>
    );

    cy.get('.nav-wrap').should('exist');
    cy.get('.nav-link').contains('About').should('exist');
    cy.get('.nav-link').contains('Contact').should('exist');
  });

  it('Should log out the user', () => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <StoreProvider>
            <Header />
          </StoreProvider>
        </MemoryRouter>
      </MockedProvider>
    );

    cy.get('.nav-link').contains('Log Out').click();
    cy.get('.nav-link').contains('Log In').should('exist');
  });
});