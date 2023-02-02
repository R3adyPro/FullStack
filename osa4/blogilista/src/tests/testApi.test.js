const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../App')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
})
describe('identification and json', () => {
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
})
describe('making changes to blog as autorized user', () => {
    let token = null
    beforeAll(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('salainen', 10)
        const user = await new User({ username: 'testi', passwordHash})
        await user.save()
        const userForToken = {username: user.username, id: user._id}
        return (token = jwt.sign(userForToken, config.SECRET))
})

    test('blog added only by authorized user', async () => {
        const newBlog = {
            title: 'testi',
            author: 'Testi author',
            url: 'www.testi.com',
            likes: 12,
        }

        await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
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
            .set('Authorization', `Bearer ${token}`)
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
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)
    })

    
    test('blog is deleted', async () => {
        const response = await Blog.find({}).populate('user')
        console.log(response)
    
        await api.delete(`/api/blogs/${response[0].id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)
        
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(response.length - 1)
        
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})