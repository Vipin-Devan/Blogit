const mongoose = require('./index');
const { Schema } = mongoose;
const BlogSchema = Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    category: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
