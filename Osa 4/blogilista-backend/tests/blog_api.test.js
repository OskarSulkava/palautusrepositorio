const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)


const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
})

test('Correct amount of blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('Identifying field is id', async () => {
  const response = await api.get('/api/blogs')

  const blogs = response.body.map(r => r)

  for (let blog of blogs) {
    expect(blog.id).toBeDefined()
  }
})

test('A valid blog can be added', async () => {
  const newBlog = {
    title: 'TestiBlogi', 
    author: 'Testi Tero', 
    url: 'https://randomtekstiäesittämässälinkkiä.com', 
    likes: 88,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).toContain(
    'TestiBlogi'
  )
})

test('Blog without likes defaults to 0 likes', async () => {
  const newBlog = {
    title: 'TestiBlogi', 
    author: 'Testi Tero', 
    url: 'https://randomtekstiäesittämässälinkkiä.com', 
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
  
  const postedBlog = response.body
  expect(postedBlog.likes).toBe(0)
})

test('Cannot add a blog without author or url', async () => {
  const newBlog = {
    title: 'TestiBlogi', 
    author: '', 
    url: '', 
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})