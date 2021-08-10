/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const notifyWith = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notifyWith('Succesfully logged in')
    } catch (expectation) {
      notifyWith('Wrong credentials', 'error')
    }
  }

  const handleLogout = async (event) => {
    setUser(null)
    window.localStorage.clear()
    notifyWith('Succesfully logged out')
  }


  const addBlog = async blogObject => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      blogFormRef.current.toggleVisibility()
      notifyWith(`A new blog ${returnedBlog.title} added`)
    } catch (expectation) {
      notifyWith(expectation.message, 'error')
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)
      blogs.forEach(blog => {
        if (blog.id === updatedBlog.id) {
          blog.likes = updatedBlog.likes
        }
      })
      setBlogs(blogs)
    } catch (expectation){
      notifyWith(expectation.message, 'error')
    }
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      const response = await blogService.remove(blog.id)
      const newList = blogs.filter(b => b.id !== blog.id)
      setBlogs(newList)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="loginbtn" type="submit">Login</button>
    </form>
  )

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="New blog" ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )

  const blogList = () => {
    blogs.sort((a, b) => b.likes - a.likes)
    return (
      <div>
        <div>
          {user.name} is logged in
          <button onClick={handleLogout}>Logout</button>
        </div>

        {blogForm()}

        <div className="Bloglist">
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
              user={user}
            />
          )}
        </div>
      </div>
    )}

  return (
    <div>
      <h2>Blogs</h2>

      <Notification notification={notification} />

      {user === null ?
        loginForm() :
        blogList()
      }
    </div>
  )
}

export default App