const express = require('express');
const Blog = require('../models/blog');
const { getBlog, postBlog } = require('../controlers/blogControler');
const routerBlog = express.Router();

// GET ALL BLOGS
routerBlog.get("/", getBlog());

// GET SINGLE BLOG
routerBlog.get("/:id", postBlog());

// ADD NEW BLOG
routerBlog.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes | 0,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  const populatedBlog = await savedBlog
    .populate("user", { username: 1, name: 1 })
    .execPopulate();

  response.status(200).json(populatedBlog.toJSON());
});

// DELETE A BLOG
routerBlog.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    const user = request.user;

    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      return response.status(401).json({
        error: "you do not have permission to delete this blog",
      });
    }
  }
);

// UPDATE A BLOG
routerBlog.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  });

  if (updatedBlog) {
    response.json(updatedBlog);
  } else {
    return response.status(404).end();
  }
});

module.exports = routerBlog
