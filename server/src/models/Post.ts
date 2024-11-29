import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, 'You must provide a post title'],
    minLength: [3, 'Your post title must be at least 3 characters in length']
  },
  body: {
    type: String,
    required: [true, 'You must provide a post message'],
    minLength: [3, 'Your post body must be at least 3 characters in length']
  },
  pet: {
    type: Schema.Types.ObjectId,
    required: [true, 'You must attach the pet _id to the post'],
    ref: 'Pet'
  }
}, {
  collection: 'pet_app_posts'
});

const Post = model('Post', postSchema);

export default Post;