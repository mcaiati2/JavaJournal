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
  mutation CreateShop($name: String, $location: String, $rating: Int) {
    createShop(name: $name, location: $location, rating: $rating) {
      message
    }
  }
`;

export const CREATE_COFFEE = gql`
  mutation CreateCoffee($title: String, $body: String, $flavor: String, $shop: ID) {
    createCoffee(title: $title, body: $body, flavor: $flavor, shop: $shop) {
      message
    }
  }
`;

export const UPDATE_SHOP_RATING = gql`
  mutation UpdateShopRating($shopId: ID!, $rating: Int!) {
    updateShopRating(shopId: $shopId, rating: $rating) {
      _id
      rating
    }
  }
`;

export const SAVE_RECIPE = gql`
mutation SAVE_RECIPE($recipeId: ID!, $title: String!, $ingredients: [String!]!, $instructions: [String!]!) {
  saveRecipe(recipeId: $recipeId, title: $title, ingredients: $ingredients, instructions: $instructions) {
    id
    title
    ingredients
    instructions
  }
}
`;
