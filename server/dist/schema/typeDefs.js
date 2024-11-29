const gql = String.raw;
const typeDefs = gql `
  type Post {
    _id: ID
    title: String
    body: String
    pet: Pet
  }

  type Pet {
    _id: ID
    name: String
    type: String
    age: Int
    owner: User
    posts: [Post]
  }

  type User {
    _id: ID
    username: String
    email: String
    pets: [Pet]
  }

  type Response {
    user: User
    message: String
    errors: [String]
  }

  type Query {
    # Auth Queries
    getUser: Response

    # Pet Queries
    getAllPosts: [Post]
    getUserPets: [Pet]
    getPostsForPet(pet_id: ID): [Post]
  }

  type Mutation {
    # Auth Resolvers
    registerUser(username: String, email: String, password: String): Response
    loginUser(email: String, password: String): Response
    logoutUser: Response

    # Pet Resolvers
    createPet(name: String, type: String, age: Int): Response
    createPost(title: String, body: String, pet: ID): Response
  }
`;
export default typeDefs;
