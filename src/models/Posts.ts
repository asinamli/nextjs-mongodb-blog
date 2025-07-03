import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  slug: {type: String, unique: true},
  author: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  published: {type: Boolean, default: false}
},{
  timestamps: true,
});

export default mongoose.models.Post || mongoose.model('Post', postSchema);