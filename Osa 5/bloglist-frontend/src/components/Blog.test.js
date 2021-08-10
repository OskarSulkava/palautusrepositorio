import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog />', () => {
  let component

  const likeBlog = jest.fn()
  const removeBlog = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'Testattava blogi',
      author: 'Testien tekijä',
      url: 'www.iltalehti.fi',
      likes: 2,
      user: {
        id: '12345',
        name: 'Oskari',
        username: 'Testaaja'
      }
    }

    const user = {
      name: 'Oskari',
      token: 'tokeeni',
      username: 'Testaaja'
    }


    component = render(
      <Blog
        blog={blog}
        updateBlog={likeBlog}
        removeBlog={removeBlog}
        user={user}
      />
    )
  })
  test('Only renders title and author', () => {
    const div = component.container.querySelector('.extraInfo')

    expect(component.container).toHaveTextContent(
      'Testattava blogi'
    )
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, url and likes are displayed', () => {
    const button = component.getByText('View')
    fireEvent.click(button)

    const div = component.container.querySelector('.extraInfo')
    expect(div).not.toHaveStyle('display: none')
  })

  test('Liking twice activates the same prop each time', () => {
    const button = component.getByText('Like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})
