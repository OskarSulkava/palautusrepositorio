import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
    background: 'antiquewhite'
  }

  const [visibility, setVisibility] = useState(true)
  const [buttonLabel, setButtonLabel] = useState('View')
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visibility ? 'none' : '' }


  const label = () => visibility ? setButtonLabel('Hide') : setButtonLabel('View')

  const toggleVisibility = () => {
    label()
    setVisibility(!visibility)
  }

  const likeBlog = () => {
    updateBlog(blog.id, {
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
    setLikes(likes + 1)
  }

  const deleteBlog = () => {
    removeBlog(blog)
  }

  const removeButton = () => {
    if (user.username === blog.user.username) {
      return (
        <button onClick={deleteBlog}>Remove</button>
      )
    }
  }

  return (
    <div id='blog' className='blog' style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button>
      <div id='extraInfo' className='extraInfo' style={hideWhenVisible}>
        <div>
          { blog.url }
        </div>
        <div id='likes'>
          { likes }
          <button onClick={likeBlog}>Like</button>
        </div>
        <div>
          { blog.user.name }
        </div>
        {removeButton()}
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
