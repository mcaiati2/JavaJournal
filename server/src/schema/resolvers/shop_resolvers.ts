import { Types } from 'mongoose';

import Shop from '../../models/Shop.js';
import Coffee from '../../models/Coffee.js';
import Context from '../../interfaces/Context.js';
import Recipe from '../../models/Recipe.js';

import { errorHandler } from '../helpers/index.js';
import { GraphQLError } from 'graphql';
import User from '../../models/User.js';



type ShopArguments = {
  name?: string;
  location?: string;
  rating?: number;
}

type CoffeeArguments = {
  title: string;
  body: string;
  flavor: string;
  shop: Types.ObjectId;
}

const shop_resolvers = {
  Query: {
    // Get all coffees
    async getAllCoffees() {
      const coffee = await Coffee.find().populate('shop');

      return coffee;
    },

    async savedRecipes(_: any, __: any, context: Context) {
      if (!context.req.user) {
        throw new GraphQLError('You are not authorized to perform this action');
      }

      try {
        const user = await User.findById(context.req.user._id).populate('recipes');
        if (!user) {
          throw new GraphQLError('User not found');
        }
        return user.recipes;
      } catch (error) {
        throw new GraphQLError('Error fetching saved recipes');
      }
    },

    // Get user shops
    async getUserShops(_: any, __: any, context: Context) {

      if (!context.req.user) {
        return {
          errors: ['You are not authorized to perform this action']
        }
      }

      const shops = await Shop.find({
        owner: context.req.user._id
      });

      return shops;
    },

    // Get shops' coffees
    async getCoffeesForShop(_: any, args: { shop_id: Types.ObjectId }) {
      const coffee = await Coffee.find({
        shop: args.shop_id
      });

      return coffee;
    },
  },

  

  

  Mutation: {
    // Create a shop

    async createShop(_: any, args: ShopArguments, context: Context) {

      if (!context.req.user) {
        return {
          errors: ['You are not authorized to perform this action']
        }
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
        }

      } catch (error) {
        const errorMessage = errorHandler(error);

        throw new GraphQLError(errorMessage);
      }
    },

    // Create a coffee for a shop
    async createCoffee(_: any, args: CoffeeArguments, context: Context) {

      if (!context.req.user) {
        return {
          errors: ['You are not authorized to perform this action']
        }
      }

      try {
        const coffee = await Coffee.create(args);

        await Shop.findByIdAndUpdate(args.shop, {
          $push: {
            coffees: coffee._id
          }
        });

        return {
          message: 'Coffee added successfully!'
        }
      } catch (error: any) {
        const errorMessage = errorHandler(error);

        throw new GraphQLError(errorMessage);
      }
    },

    async updateShopRating(_: any, { shopId, rating }: { shopId: string, rating: number }, context: Context) {
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
      } catch (error) {
        const errorMessage = errorHandler(error);
        throw new GraphQLError(errorMessage);
      }
    },

    async saveRecipe(_: any, args: { recipeId: string, title: string, ingredients: string[], instructions: string[] }, context: Context) {
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
      } catch (error: any) {
        console.error('Error saving recipe:', error); // Log the error
        throw new GraphQLError(error.message);
      }
    },

    async deleteSavedRecipe(_: any, { recipeId }: { recipeId: string }, context: Context) {
      if (!context.req.user) {
        throw new GraphQLError('You are not authorized to perform this action');
      }

      try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
          throw new GraphQLError('Recipe not found');
        }

        if (recipe.user.toString() !== context.req.user._id.toString()) {
          throw new GraphQLError('You are not authorized to delete this recipe');
        }

        await Recipe.findByIdAndDelete(recipeId);

        await User.findByIdAndUpdate(context.req.user._id, {
          $pull: { recipes: recipeId }
        });

        return {
          success: true,
          message: 'Recipe deleted successfully!'
        };
      } catch (error: any) {
        console.error('Error deleting recipe:', error); // Log the error
        throw new GraphQLError(error.message);
      }
    }
  }
};





shop_resolvers.Mutation.saveRecipe = async function(_: any, args: { recipeId: string, title: string, ingredients: string[], instructions: string[] }, context: Context) {
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
  } catch (error: any) {
    console.error('Error saving recipe:', error); // Log the error
    throw new GraphQLError(error.message);
  }
};

// shop_resolvers.Mutation.deleteSavedRecipe = async function(_: any, { recipeId }: { recipeId: string }, context: Context) {
//   if (!context.req.user) {
//     throw new GraphQLError('You are not authorized to perform this action');
//   }

//   try {
//     const recipe = await Recipe.findById(recipeId);
//     if (!recipe) {
//       throw new GraphQLError('Recipe not found');
//     }

//     if (recipe.user.toString() !== context.req.user._id.toString()) {
//       throw new GraphQLError('You are not authorized to delete this recipe');
//     }

//     await Recipe.findByIdAndDelete(recipeId);

//     await User.findByIdAndUpdate(context.req.user._id, {
//       $pull: { recipes: recipeId }
//     });

//     return {
//       message: 'Recipe deleted successfully!'
//     };
//   } catch (error: any) {
//     console.error('Error deleting recipe:', error); // Log the error
//     throw new GraphQLError(error.message);
//   }
// }

shop_resolvers.Mutation.createCoffee = async function(_: any, args: CoffeeArguments, context: Context) {
  if (!context.req.user) {
    return {
      errors: ['You are not authorized to perform this action']
    }
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
    }
  } catch (error: any) {
    const errorMessage = errorHandler(error);

    throw new GraphQLError(errorMessage);
  }
};

export default shop_resolvers;