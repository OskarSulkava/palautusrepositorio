const { expect, describe } = require('@jest/globals')
const listHelper = require('../utils/list_helper')

test('Dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('Total likes', () => {
  const epmtyList = []

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithMultipleBlogs = [ 
    { 
      _id: "5a422a851b54a676234d17f7", 
      title: "React patterns", 
      author: "Michael Chan", 
      url: "https://reactpatterns.com/", 
      likes: 7, 
      __v: 0 
    }, 
    { 
      _id: "5a422aa71b54a676234d17f8", 
      title: "Go To Statement Considered Harmful", 
      author: "Edsger W. Dijkstra", 
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
      likes: 5, 
      __v: 0 
    }, 
    { 
      _id: "5a422b3a1b54a676234d17f9", 
      title: "Canonical string reduction", 
      author: "Edsger W. Dijkstra", 
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
      likes: 12, 
      __v: 0 
    }, 
    { 
      _id: "5a422b891b54a676234d17fa", 
      title: "First class tests", 
      author: "Robert C. Martin", 
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
      likes: 10, 
      __v: 0 
    }, 
    { _id: "5a422ba71b54a676234d17fb", 
    title: "TDD harms architecture", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
    likes: 0, 
    __v: 0 
  }, 
  { 
    _id: "5a422bc61b54a676234d17fc", 
    title: "Type wars", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
    likes: 2, 
    __v: 0 
  }
]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(epmtyList)
    expect(result).toBe(0)
  })

  test('When list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(36)
  })
})

describe('Favorite blog', () => {
  const epmtyList = []

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithMultipleBlogs = [ 
    { 
      _id: "5a422a851b54a676234d17f7", 
      title: "React patterns", 
      author: "Michael Chan", 
      url: "https://reactpatterns.com/", 
      likes: 7, 
      __v: 0 
    }, 
    { 
      _id: "5a422aa71b54a676234d17f8", 
      title: "Go To Statement Considered Harmful", 
      author: "Edsger W. Dijkstra", 
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
      likes: 5, 
      __v: 0 
    }, 
    { 
      _id: "5a422b3a1b54a676234d17f9", 
      title: "Canonical string reduction", 
      author: "Edsger W. Dijkstra", 
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
      likes: 12, 
      __v: 0 
    }, 
    { 
      _id: "5a422b891b54a676234d17fa", 
      title: "First class tests", 
      author: "Robert C. Martin", 
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
      likes: 10, 
      __v: 0 
    }, 
    { _id: "5a422ba71b54a676234d17fb", 
    title: "TDD harms architecture", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
    likes: 0, 
    __v: 0 
  }, 
  { 
    _id: "5a422bc61b54a676234d17fc", 
    title: "Type wars", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
    likes: 2, 
    __v: 0 
  }
]

test('when list has multiple blogs', () => {
  const result = listHelper.favoriteBlog(listWithMultipleBlogs)
  expect(JSON.stringify(result)).toBe(JSON.stringify({
    "title": 'Canonical string reduction', 
    "author": 'Edsger W. Dijkstra', 
    "likes": 12
  }))
})

test('when list has a single blog', () => {
  const result = listHelper.favoriteBlog(listWithOneBlog)
  expect(JSON.stringify(result)).toBe(JSON.stringify({
    "title": 'Go To Statement Considered Harmful',
    "author": 'Edsger W. Dijkstra',
    "likes": 5
  }))
})

test('when list is empty', () => {
  const result = listHelper.favoriteBlog(epmtyList)
  expect(result).toBe("List is empty")
})
  
})

describe('Most blogs', () => {
  const epmtyList = []

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithMultipleBlogs = [ 
    { 
      _id: "5a422a851b54a676234d17f7", 
      title: "React patterns", 
      author: "Michael Chan", 
      url: "https://reactpatterns.com/", 
      likes: 7, 
      __v: 0 
    }, 
    { 
      _id: "5a422aa71b54a676234d17f8", 
      title: "Go To Statement Considered Harmful", 
      author: "Edsger W. Dijkstra", 
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
      likes: 5, 
      __v: 0 
    }, 
    { 
      _id: "5a422b3a1b54a676234d17f9", 
      title: "Canonical string reduction", 
      author: "Edsger W. Dijkstra", 
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
      likes: 12, 
      __v: 0 
    }, 
    { 
      _id: "5a422b891b54a676234d17fa", 
      title: "First class tests", 
      author: "Robert C. Martin", 
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
      likes: 10, 
      __v: 0 
    }, 
    { _id: "5a422ba71b54a676234d17fb", 
    title: "TDD harms architecture", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
    likes: 0, 
    __v: 0 
  }, 
  { 
    _id: "5a422bc61b54a676234d17fc", 
    title: "Type wars", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
    likes: 2, 
    __v: 0 
  }
]

test('when list has multiple blogs', () => {
  const result = listHelper.mostBlogs(listWithMultipleBlogs)
  expect(JSON.stringify(result)).toBe(JSON.stringify({
    "author": "Robert C. Martin",
    "blogs": 3
  }))
})

test('when list has a single blog', () => {
  const result = listHelper.mostBlogs(listWithOneBlog)
  expect(JSON.stringify(result)).toBe(JSON.stringify({
    "author": "Edsger W. Dijkstra",
    "blogs": 1
  }))
})
test('when list is empty', () => {
  const result = listHelper.mostBlogs(epmtyList)
  expect(result).toBe("List is empty")
})

})

describe('Most likes', () => {
  const epmtyList = []

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithMultipleBlogs = [ 
    { 
      _id: "5a422a851b54a676234d17f7", 
      title: "React patterns", 
      author: "Michael Chan", 
      url: "https://reactpatterns.com/", 
      likes: 7, 
      __v: 0 
    }, 
    { 
      _id: "5a422aa71b54a676234d17f8", 
      title: "Go To Statement Considered Harmful", 
      author: "Edsger W. Dijkstra", 
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
      likes: 5, 
      __v: 0 
    }, 
    { 
      _id: "5a422b3a1b54a676234d17f9", 
      title: "Canonical string reduction", 
      author: "Edsger W. Dijkstra", 
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
      likes: 12, 
      __v: 0 
    }, 
    { 
      _id: "5a422b891b54a676234d17fa", 
      title: "First class tests", 
      author: "Robert C. Martin", 
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
      likes: 10, 
      __v: 0 
    }, 
    { _id: "5a422ba71b54a676234d17fb", 
    title: "TDD harms architecture", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
    likes: 0, 
    __v: 0 
  }, 
  { 
    _id: "5a422bc61b54a676234d17fc", 
    title: "Type wars", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
    likes: 2, 
    __v: 0 
  }
]
  
  test('when list has multiple blogs', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs)
    expect(result).toBe(JSON.stringify({
      "author": "Edsger W. Dijkstra",
      "likes": 17
    }))
  })
})