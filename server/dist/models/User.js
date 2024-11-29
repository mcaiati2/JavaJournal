import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const { Schema, model } = mongoose;
const { hash, compare } = bcrypt;
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minLength: [2, 'Your username must be at least 2 characters in length']
    },
    email: {
        type: String,
        // The unique rule only works when the collection is first created
        // You cannot create a custom error message with the array syntax on the unique rule
        unique: true,
        required: true,
        // Ensure the value is a valid email string
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        // Ensure the string is at least 6 chars long
        minLength: [6, 'Your password must be at least 6 characters in length']
    },
    // The notes property is going to be an array of note ids
    pets: [{
            type: Schema.Types.ObjectId,
            ref: 'Pet'
        }]
}, {
    collection: 'pet_app_users',
    toJSON: {
        transform(_, user) {
            delete user.password;
            delete user.__v;
            return user;
        }
    }
});
// Encrypt the user's password before the user is saved to the users collection
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isNew) {
        user.password = await hash(user.password, 10);
    }
    next();
});
// Setup a validation function that we can use to check that a user's password is valid (formPassword vs encrypted password)
userSchema.methods.validatePassword = async function (formPassword) {
    return await compare(formPassword, this.password);
};
const User = model('User', userSchema);
export default User;
