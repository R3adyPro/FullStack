const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../App')
const Blog = require('../models/blog')
const blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('identification is id', async () => {
    const response = await api.get('/api/blogs')

    const blogId = response.body.map((blog) => blog.id)

    for(id of blogId)
    expect(id).toBeDefined()
})

test('blog is added', async () => {
    const newBlog = {
        title: 'testi',
        author: 'Testi author',
        url: 'www.testi.com',
        likes: 12,
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('set likes to 0 if field is empty', async () => {
    const newBlog = {
        title: 'testi',
        author: 'Testi author',
        url: 'www.testi.com',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
    	.expect('Content-Type', /application\/json/)

    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
})

test('title or url is empty', async () => {
    const newBlog = {
        author: 'Testi author',
        likes: 12,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('blog is deleted', async () => {
    const response = await helper.blogsInDb()
    const ids = response.map((blogs) => blogs.id)
    console.log(ids[0])

    await api.delete(`/api/blogs/${ids[0]}`)
        .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(response.length - 1)
    
})

test('blog is updated', async () => {
    const response = await helper.blogsInDb()
    const id = response.map((blogs) => blogs.id)

    const update = {
        likes: 20,
    }
    console.log(id)

    await api
        .post(`api/blogs/${id[0]}`)
        .send(update)
        .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(response.length - 1)
})

afterAll(async () => {
    await mongoose.connection.close()
})