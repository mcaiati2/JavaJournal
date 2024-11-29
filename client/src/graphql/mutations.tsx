import { gql } from '@apollo/client';

// Auth Mutations
export const REGISTER_USER = gql`
  mutation RegisterUser($username: String, $email: String, $password: String) {
    registerUser(username: $username, email: $email, password: $password) {
      errors
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
      errors
      user {
        _id
        username
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser {
      message
    }
  }
`;


// Shop Mutations
export const CREATE_SHOP = gql`
  mutation CreateShop($name: String, $type: String, $age: Int) {
    createShop(name: $name, type: $type, age: $age) {
      message
    }
  }
`;

export const CREATE_COFFEE = gql`
  mutation CreateCoffee($title: String, $body: String, $shop: ID) {
    createCoffee(title: $title, body: $body, shop: $shop) {
      message
    }
  }
`;