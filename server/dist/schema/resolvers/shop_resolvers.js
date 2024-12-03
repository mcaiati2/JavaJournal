import Shop from '../../models/Shop.js';
import Coffee from '../../models/Coffee.js';
import Recipe from '../../models/Recipe.js';
import { errorHandler } from '../helpers/index.js';
import { GraphQLError } from 'graphql';
import User from '../../models/User.js';
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
                await coffee.save();
                await Shop.findByIdAndUpdate(args.shop, {
                    $push: {
                        coffees: coffee._id
                    }
                });
                return {
                    message: 'Coffee added successfully!'
                };
            }
            catch (error) {
                const errorMessage = errorHandler(error);
                throw new GraphQLError(errorMessage);
            }
        },
        async updateShopRating(_, { shopId, rating }, context) {
            if (!context.req.user) {
                throw new GraphQLError('You are not authorized to perform this action');
            }
            try {
                const shop = await Shop.findById(shopId);
                if (!shop) {
                    throw new GraphQLError('Shop not found');
                }
                shop.rating = rating;
                await shop.save();
                return shop; // Return the shop object
            }
            catch (error) {
                const errorMessage = errorHandler(error);
                throw new GraphQLError(errorMessage);
            }
        },
        async saveRecipe(_, args, context) {
            if (!context.req.user) {
                throw new GraphQLError('You are not authorized to perform this action');
            }
            try {
                const recipe = await Recipe.create({
                    title: args.title,
                    ingredients: args.ingredients,
                    instructions: args.instructions,
                    user: context.req.user._id
                });
                console.log('Recipe saved:', recipe); // Log the saved recipe
                return recipe;
            }
            catch (error) {
                console.error('Error saving recipe:', error); // Log the error
                throw new GraphQLError(error.message);
            }
        }
    }
};
export default shop_resolvers;
shop_resolvers.Mutation.saveRecipe = async function (_, args, context) {
    if (!context.req.user) {
        throw new GraphQLError('You are not authorized to perform this action');
    }
    try {
        const recipe = await Recipe.create({
            title: args.title,
            ingredients: args.ingredients,
            instructions: args.instructions,
            user: context.req.user._id
        });
        await User.findByIdAndUpdate(context.req.user._id, {
            $push: { recipes: recipe._id }
        });
        console.log('Recipe saved:', recipe); // Log the saved recipe
        return recipe;
    }
    catch (error) {
        console.error('Error saving recipe:', error); // Log the error
        throw new GraphQLError(error.message);
    }
};
shop_resolvers.Mutation.createCoffee = async function (_, args, context) {
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
        await User.findByIdAndUpdate(context.req.user._id, {
            $push: { coffees: coffee._id }
        });
        return {
            message: 'Coffee added successfully!'
        };
    }
    catch (error) {
        const errorMessage = errorHandler(error);
        throw new GraphQLError(errorMessage);
    }
};
