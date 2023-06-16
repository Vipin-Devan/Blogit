const dotenv = require('dotenv').config();
const Blog = require('../models/Blog.js');
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

const response = (res, status, result) => {
  res.status(status).json(result);
};
async function blogGetRouter(req, res) {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let blogs;
    if (username) {
      blogs = await User.findOne({ username: username })
        .then((user) => Blog.find({ author: user._id }).populate('author').sort({ createdAt: -1 }))

        .catch((err) => console.log(err));
    } else if (catName) {
      blogs = await Blog.find({ category: catName }).populate('author', '-password').sort({ createdAt: -1 }).limit(20);
    } else {
      blogs = await Blog.find().populate('author', '-password').sort({ createdAt: -1 }).limit(20);
    }
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function blogPostRouter(req, res) {
  const { title, content, image, category } = req.body;

  const postDoc = await Blog.create({
    title,
    content,
    category,
    image,
    author: req.userId,
  });
  res.json(postDoc);
}
async function blogDeleteRouter(req, res) {
  try {
    const blog = await Blog.findOneAndDelete({ author: req.userId, _id: req.params.id });
    if (!blog) {
      response(res, 404, { error: 'no blog' });
    }
    response(res, 200, { msg: 'blog deleted' });
  } catch (error) {
    response(res, 400, { error: error });
  }
}
async function blogUpdateRouter(req, res) {
  const { title, image, content } = req.body;
  await Blog.findOneAndUpdate(
    { author: req.userId, _id: req.params.id },
    {
      title,
      content,
      image,
    }
  )
    .then((result) => response(res, 200, { msg: 'blog updated', blog: result }))
    .catch((error) => response(res, 400, error));
}
async function blogGetByIdRouter(req, res) {
  try {
    const post = await Blog.findById(req.params.id).populate('author', '-password');
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
}
module.exports = { blogGetRouter, blogPostRouter, blogDeleteRouter, blogUpdateRouter, blogGetByIdRouter };
