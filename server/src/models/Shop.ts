import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const shopSchema = new Schema({
  name: {
    type: String,
    required: [true, 'You must provide the coffee\'s name'],
    minLength: [2, 'Your coffee name must be at least 2 characters in length']
  },
  type: {
    type: String,
    required: [true, 'You must provide the animal\'s type']
  },
  age: {
    type: Number,
    min: [1, 'You must enter an age greater than zero'],
    required: [true, 'You must provide the animal\'s age']
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: [true, 'You must attach the owner user _id'],
    ref: 'User'
  },
  coffees: [{
    type: Schema.Types.ObjectId,
    ref: 'Coffee'
  }]
});

const Shop = model('Shop', shopSchema);

export default Shop;