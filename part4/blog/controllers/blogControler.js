const { request, response } = require('express');
const Blog = require('../models/blog');

const getBlog = async (request, response) => {
  try {
    //const blogs = await Blog.find({})
    response.json(blogs);
  } catch (error) {
    response.status(500).json({ msg: error.message });
  }
};

const postBlog = async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
};

module.exports = {
getBlog,
postBlog,
}
