const gql = String.raw;

const typeDefs = gql`
  type Coffee {
    _id: ID
    title: String
    body: String
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
  }

  type Response {
    user: User
    message: String
    errors: [String]
  }

  type Query {
    # Auth Queries
    getUser: Response

    # Shop Queries
    getAllCoffees: [Coffee]
    getUserShops: [Shop]
    getCoffeesForShop(shop_id: ID): [Coffee]
  }

  type Mutation {
    # Auth Resolvers
    registerUser(username: String, email: String, password: String): Response
    loginUser(email: String, password: String): Response
    logoutUser: Response

    # Coffee/Shop Resolvers
    createShop(name: String, location: String, rating: Int): Response
    createCoffee(title: String, body: String, shop: ID): Response
  }
`;

export default typeDefs;