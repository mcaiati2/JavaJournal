const gql = String.raw;
const typeDefs = gql `
  type Coffee {
    _id: ID
    title: String
    body: String
    flavor: String
    shop: Shop
  }

  type Shop {
    _id: ID
    name: String
    location: String
    rating: Int
    owner: User
    coffees: [Coffee]
  }

  type User {
    _id: ID
    username: String
    email: String
    shops: [Shop]
    recipes: [Recipe]
    coffees: [Coffee]
  }

  type Recipe {
  id: ID!
  title: String!
  ingredients: [String!]!
  instructions: [String!]!
  user: User!
}

  type Response {
    user: User
    message: String
    errors: [String]
  }
  type MessageResponse {
    message: String
}

  type Query {
    # Auth Queries
    getUser: Response

    # Shop Queries
    getAllCoffees: [Coffee]
    getUserShops: [Shop]
    getCoffeesForShop(shop_id: ID): [Coffee]
    recipes: [Recipe]
    savedRecipes: [Recipe]
  }

  type Mutation {
    # Auth Resolvers
    registerUser(username: String, email: String, password: String): Response
    loginUser(email: String, password: String): Response
    logoutUser: Response

    # Coffee/Shop Resolvers
    createShop(name: String, location: String, rating: Int): Response
    createCoffee(title: String, body: String, flavor: String, shop: ID): Response
    updateShopRating(shopId: ID!, rating: Int!): Shop
    saveRecipe(recipeId: ID!, title: String!, ingredients: [String!]!, instructions: [String!]!): Recipe
    changePassword(currentPassword: String!, newPassword: String!): MessageResponse!

  }
`;
export default typeDefs;
