import { Schema, model } from 'mongoose';
const recipeSchema = new Schema({
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: [String], required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});
const Recipe = model('Recipe', recipeSchema);
export default Recipe;
