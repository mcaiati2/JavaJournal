import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser {
    getUser {
      user {
        _id
        username
      }
    }
  }
`;

export const GET_ALL_COFFEES = gql`
  query GetAllCoffees {
    getAllCoffees {
      _id
      body
      title
      flavor
      shop {
        name
      }
    }
  }
`;

export const GET_USER_SHOPS = gql`
  query GetUserShops {
    getUserShops {
      _id
      rating
      name
      location
      coffees {
        _id
      }
    }
  }
`;

export const GET_COFFEES_FOR_SHOP = gql`
  query GetCoffeesForShop($shopId: ID) {
    getCoffeesForShop(shop_id: $shopId) {
      _id
      body
      title
      flavor
    }
  }
`;

export const GET_SHOP_RATINGS = gql`
  query GET_SHOP_RATINGS($shopId: ID!) {
    shop(id: $shopId) {
      id
      name
      coffees {
        rating
      }
    }
  }
`;