import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
dotenv.config();
import User from '../../models/User.js';
import { errorHandler } from '../helpers/index.js';
const { sign } = jwt;
function createToken(user_id) {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return sign({ user_id: user_id }, process.env.JWT_SECRET);
}
const auth_resolvers = {
    Query: {
        // Get user
        async getUser(_, __, context) {
            if (!context.req.user) {
                return {
                    user: null
                };
            }
            return {
                user: context.req.user
            };
        }
    },
    Mutation: {
        /***
         *** AUTH RESOLVERS ***
        ***/
        // Register a user
        async registerUser(_, args, context) {
            try {
                const user = await User.create(args);
                const token = createToken(user._id);
                context.res.cookie('pet_token', token, {
                    httpOnly: true,
                    secure: process.env.PORT ? true : false,
                    sameSite: true
                });
                return {
                    user: user
                };
            }
            catch (error) {
                const errorMessage = errorHandler(error);
                throw new GraphQLError(errorMessage);
            }
        },
        // Log a user in
        async loginUser(_, args, context) {
            const user = await User.findOne({
                email: args.email
            });
            if (!user) {
                throw new GraphQLError('No user found with that email address');
            }
            const valid_pass = await user.validatePassword(args.password);
            if (!valid_pass) {
                throw new GraphQLError('Password is incorrect');
            }
            const token = createToken(user._id);
            context.res.cookie('pet_token', token, {
                httpOnly: true,
                secure: process.env.PORT ? true : false,
                sameSite: true
            });
            return {
                user: user
            };
        },
        // Log out user
        logoutUser(_, __, context) {
            context.res.clearCookie('pet_token');
            return {
                message: 'Logged out successfully!'
            };
        }
    }
};
export default auth_resolvers;
