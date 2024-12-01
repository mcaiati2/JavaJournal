import Shop from '../../models/Shop.js';
import Coffee from '../../models/Coffee.js';
import { errorHandler } from '../helpers/index.js';
import { GraphQLError } from 'graphql';
const shop_resolvers = {
    Query: {
        // Get all coffees
        async getAllCoffees() {
            const coffee = await Coffee.find().populate('shop');
            return coffee;
        },
        // Get user shops
        async getUserShops(_, __, context) {
            if (!context.req.user) {
                return {
                    errors: ['You are not authorized to perform this action']
                };
            }
            const shops = await Shop.find({
                owner: context.req.user._id
            });
            return shops;
        },
        // Get shops' coffees
        async getCoffeesForShop(_, args) {
            const coffee = await Coffee.find({
                shop: args.shop_id
            });
            return coffee;
        }
    },
    Mutation: {
        // Create a shop
        async createShop(_, args, context) {
            if (!context.req.user) {
                return {
                    errors: ['You are not authorized to perform this action']
                };
            }
            try {
                const shop = await Shop.create({
                    ...args,
                    owner: context.req.user._id
                });
                context.req.user.shops.push(shop._id);
                await context.req.user.save();
                return {
                    message: 'S added successfully!'
                };
            }
            catch (error) {
                const errorMessage = errorHandler(error);
                throw new GraphQLError(errorMessage);
            }
        },
        // Create a coffee for a shop
        async createCoffee(_, args, context) {
            if (!context.req.user) {
                return {
                    errors: ['You are not authorized to perform this action']
                };
            }
            try {
                const coffee = await Coffee.create(args);
                await Shop.findByIdAndUpdate(args.shop, {
                    $push: {
                        coffees: coffee._id
                    }
                });
                return {
                    message: 'Coffee created successfully!'
                };
            }
            catch (error) {
                const errorMessage = errorHandler(error);
                throw new GraphQLError(errorMessage);
            }
        }
    }
};
export default shop_resolvers;