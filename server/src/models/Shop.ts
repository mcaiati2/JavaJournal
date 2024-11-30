import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const shopSchema = new Schema({
  name: {
    type: String,
    required: [true, 'You must provide the coffee\'s name'],
    minLength: [2, 'Your coffee name must be at least 2 characters in length']
  },
  location: {
    type: String,
    required: [true, 'You must provide the shop\'s location']
  },
  rating: {
    type: Number,
    min: [1, 'You must enter an rating greater than zero'],
    required: [true, 'You must provide the shop\'s rating']
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