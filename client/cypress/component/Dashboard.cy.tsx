import React from 'react'
import { mount } from 'cypress/react18'
import { MockedProvider } from '@apollo/client/testing';

import { GET_USER_PETS } from '../../src/graphql/queries';
import Dashboard from '../../src/pages/Dashboard/index'

import 'bootstrap/dist/css/bootstrap.min.css'

const mocks = [
  {
    request: {
      query: GET_USER_PETS
    },
    result: {
      data: {
        getUserPets: [
          {
            _id: '1',
            name: 'Fluffy',
            type: 'Cat',
            age: 3
          },
          {
            _id: '2',
            name: 'Spot',
            type: 'Dog',
            age: 5
          },
        ],
      },
    },
  },
];

describe('<Dashboard />', () => {
  it('Should render and show the pets', () => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Dashboard />
      </MockedProvider>
    );

    cy.get('.pet-output')
      .should('contain.text', 'Fluffy')
      .and('contain.text', 'Spot');
  });
});