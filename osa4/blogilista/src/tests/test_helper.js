const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'testi1',
    author: 'testi1',
    url: 'testi1',
    likes: 1,
  },
  {
    title: 'testi2',
    author: 'testi2',
    url: 'testi2',
    likes: 2,
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}