import { Schema, model, Document } from 'mongoose';

interface IRecipe extends Document {
  title: string;
  ingredients: string[];
  instructions: string[];
  user: Schema.Types.ObjectId;
}

const recipeSchema = new Schema<IRecipe>({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: [String], required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Recipe = model<IRecipe>('Recipe', recipeSchema);

export default Recipe;