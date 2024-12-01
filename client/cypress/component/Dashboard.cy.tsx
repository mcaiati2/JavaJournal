import React from 'react'
import { mount } from 'cypress/react18'
import { MockedProvider } from '@apollo/client/testing';

import { GET_USER_SHOPS } from '../../src/graphql/queries';
import Dashboard from '../../src/pages/Dashboard/index'

import 'bootstrap/dist/css/bootstrap.min.css'

const mocks = [
  {
    request: {
      query: GET_USER_SHOPS
    },
    result: {
      data: {
        getUserShops: [
          {
            _id: '1',
            name: 'Coffee Beanz',
            location: 'USA',
            rating: 3
          },
          {
            _id: '2',
            name: 'Brew Masters',
            location: 'UK',
            rating: 4
          },
        ],
      },
    },
  },
];

describe('<Dashboard />', () => {
  it('Should render and show the shops', () => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Dashboard />
      </MockedProvider>
    );

    cy.get('.shop-output')
      .should('contain.text', 'Coffee Beanz')
      .and('contain.text', 'Brew Masters');
  });
});