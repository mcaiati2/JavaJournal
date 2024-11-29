import dotenv from 'dotenv';
// import { Types } from 'mongoose';
dotenv.config();
import auth_resolvers from './resolvers/auth_resolvers.js';
import pet_resolvers from './resolvers/pet_resolvers.js';
// import { User as UserInterface } from '../interfaces/User.js';
// import User from '../models/User.js';
// import Context from '../interfaces/Context';
const resolvers = {
    Query: {
        ...auth_resolvers.Query,
        ...pet_resolvers.Query
    },
    Mutation: {
        ...auth_resolvers.Mutation,
        ...pet_resolvers.Mutation
    }
};
export default resolvers;
