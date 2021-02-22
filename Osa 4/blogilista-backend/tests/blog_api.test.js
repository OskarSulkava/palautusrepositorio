const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)


const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
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

describe('Updating blogs', () => {
  test('succeeds with status code 200 if ok', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const blog = {
      title: 'TestiBlogi', 
      author: 'Testi Tero', 
      url: 'https://randomtekstiäesittämässälinkkiä.com', 
      likes: 88,
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const blogToView = blogsAtEnd[0]
    const processedBlog = JSON.parse(JSON.stringify(blogToView))
    
    expect(processedBlog).toContain(
      {
        title: 'TestiBlogi', 
        author: 'Testi Tero', 
        url: 'https://randomtekstiäesittämässälinkkiä.com', 
        likes: 88,
      }
    )
  })
})

describe('Deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})