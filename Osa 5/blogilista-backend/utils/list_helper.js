const blog = require("../models/blog")
const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else {
    return blogs
      .map(blog => blog.likes)
      .reduce((total, value) => total + value, 0)
  }
}

const favoriteBlog = (blogs) => {
  
  if (blogs.length === 0) {
    return "List is empty"
  } else {
    let result = Math.max.apply(Math, blogs.map(blog => blog.likes))
    let blog =  blogs.find(blog => blog.likes === result)

    return {
      "title" : blog.title,
      "author": blog.author, 
      "likes" : blog.likes
    }
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return "List is empty"
  } else {
    let blogCount = _.map(_.countBy(blogs, "author"), (val, key) => ({ author: key, blogs: val}))
    return blogCount.reduce((max, author) => max.total > author.total ? max : author)
  }
}
//Ei valmis
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return "List is empty"
  } else {
    return blogs.map(blog => {
      let authorsBlogs = blogs.filter(b => b.author === blog.author )
      let likes = authorsBlogs.reduce((allLikes, current) => (allLikes.likes + current.likes))
      return {
        "author": blog.author,
        "likes": likes
      }
    })
      
    
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}