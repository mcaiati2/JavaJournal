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

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      _id
      body
      title
      pet {
        name
      }
    }
  }
`;

export const GET_USER_PETS = gql`
  query GetUserPets {
    getUserPets {
      _id
      age
      name
      type
      posts {
        _id
      }
    }
  }
`;

export const GET_POSTS_FOR_PET = gql`
  query GetPostsForPet($petId: ID) {
    getPostsForPet(pet_id: $petId) {
      _id
      body
      title
    }
  }
`;