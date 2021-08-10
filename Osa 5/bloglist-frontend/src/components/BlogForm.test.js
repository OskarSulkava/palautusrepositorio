import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> uses callback with the right values', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'Testi Title' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'Testaaaaja' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'www.urli.fi' }
  })
  fireEvent.submit(form)


  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('Testaaaaja' )
  expect(createBlog.mock.calls[0][0].title).toBe('Testi Title')
  expect(createBlog.mock.calls[0][0].url).toBe('www.urli.fi')
})