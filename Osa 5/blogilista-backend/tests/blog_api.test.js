const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('When some blogs are saved', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('id field is properly named', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

test('A blog can be edited', async () => {
  const [ aBlog ] = await helper.blogsInDb()

  const editedBlog = { ...aBlog, likes: aBlog.likes + 1}
  console.log(editedBlog)
  await api
    .put(`/api/blogs/${aBlog.id}`)
    .send(editedBlog)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  const edited = blogsAtEnd.find(blog => blog.url === aBlog.url)
  expect(edited.likes).toBe(aBlog.likes + 1)
})

describe('When a blog is posted to api', () => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'janedoez',
      name: 'Jane Z. Doe',
      password: 'password'
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)
    
    headers = {
      'Authorization': `bearer ${result.body.token}`
    }
  })

  test('it is saved to database', async () => {
    const newBlog = {
      title: 'Great developer experience',
      author: 'Hector Ramos',
      url: 'https://jestjs.io/blog/2017/01/30/a-great-developer-experience',
      likes: 7
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain(
      'Great developer experience'
    )
  })

  test('likes get value 0 as default', async () => {
    const newBlog = {
      title: 'Blazing Fast Delightful Testing',
      author: 'Rick Hanlon',
      url: 'https://jestjs.io/blog/2017/01/30/a-great-developer-experience'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    const added = blogsAtEnd.find(blog => blog.url === newBlog.url)
    
    expect(added.likes).toBe(0)
  })

  test('operation fails with proper error if url is missing', async () => {
    const newBlog = {
      title: 'Blazing Fast Delightful Testing',
      author: 'Rick Hanlon',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('operation fails with proper error if token is missing', async () => {
    const newBlog = {
      title: 'Blazing Fast Delightful Testing',
      author: 'Rick Hanlon',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  describe('and it is saved to database', () => {
    let result
    beforeEach(async () => {
      const newBlog = {
        title: 'Great developer experience',
        author: 'Hector Ramos',
        url: 'https://jestjs.io/blog/2017/01/30/a-great-developer-experience',
        likes: 7
      }

      result = await api
        .post('/api/blogs')
        .send(newBlog)
        .set(headers)
    })

    test('it can be removed', async () => {
      const aBlog = result.body

      const initialBlogs = await helper.blogsInDb()
      await api
        .delete(`/api/blogs/${aBlog.id}`)
        .set(headers)
        .expect(204)
      
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(initialBlogs.length - 1)

      const titles = blogsAtEnd.map(blog => blog.title)
      expect(titles).not.toContain(
        aBlog.title
      )
    })
  })
})

describe('Creation of a user', () => {
  test('succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'johndoez',
      name: 'John Z. Doe',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username is already taken', async () => {
    const newUser = {
      username: 'johndoe',
      name: 'John Doe',
      password: 'sekred'
    }

    await api
      .post('/api/users')
      .send(newUser)
    
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body.error).toContain('`username` to be unique')
  })

  test('creation fails if password is too short', async () => {
    const newUser = {
      username: 'janedoe',
      name: 'Jane Doe',
      password: 'p',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password must be atleast 3 chars long')
  })
})

afterAll(() => {
  mongoose.connection.close()
})