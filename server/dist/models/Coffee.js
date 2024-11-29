import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const coffeeSchema = new Schema({
    title: {
        type: String,
        required: [true, 'You must provide a coffee title'],
        minLength: [3, 'Your coffee title must be at least 3 characters in length']
    },
    body: {
        type: String,
        required: [true, 'You must provide a coffee message'],
        minLength: [3, 'Your coffee body must be at least 3 characters in length']
    },
    shop: {
        type: Schema.Types.ObjectId,
        required: [true, 'You must attach the shop _id to the coffee'],
        ref: 'Shop'
    }
}, {
    collection: 'shop_app_coffees'
});
const Coffee = model('Coffee', coffeeSchema);
export default Coffee;
