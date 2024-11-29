import dotenv from 'dotenv';
dotenv.config();
import auth_resolvers from './resolvers/auth_resolvers.js';
import shop_resolvers from './resolvers/shop_resolvers.js';
const resolvers = {
    Query: {
        ...auth_resolvers.Query,
        ...shop_resolvers.Query
    },
    Mutation: {
        ...auth_resolvers.Mutation,
        ...shop_resolvers.Mutation
    }
};
export default resolvers;
