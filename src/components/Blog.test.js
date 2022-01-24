import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'test blog',
    author: 'test author',
    url: 'test url'
  }

  const component = render(<Blog blog={blog}></Blog>)
  component.debug()

  expect(component.container).toHaveTextContent('test blog')

  //   const element = component.getByText('test blog')
  //   expect(element).toBeDefined()

  //   const div = component.container.querySelector('.blog')
  //   expect(div).toHaveTextContent('test blog')

})

test('clicking the button calls event handler once', () => {
  const blog = {
    title: 'test blog',
    author: 'test author',
    url: 'test url'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleLikeButtonClicked={mockHandler}/>
  )


  const showInfoButton = component.getByText('show info')
  fireEvent.click(showInfoButton)
  component.debug()

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
})

test('renders title and author but not url or likes', () => {
  const blog = {
    title: 'test blog',
    author: 'test author',
    url: 'test url',
    likes: 14
  }

  const component = render(<Blog blog={blog}></Blog>)

  expect(component.container).toHaveTextContent('test blog')
  expect(component.container).toHaveTextContent('test author')
  expect(component.container).not.toHaveTextContent('url')
  expect(component.container).not.toHaveTextContent(`${blog.likes}`)

  // same tests using CSS selectors:
  const div = component.container.querySelector('.reducedBlog')
  expect(div).toHaveTextContent('test blog')
  expect(div).toHaveTextContent('test author')
  expect(div).not.toHaveTextContent('url')
  expect(div).not.toHaveTextContent(`${blog.likes}`)

})

test('clicking show info button shows url and number of likes', () => {
  const blog = {
    title: 'test blog',
    author: 'test author',
    url: 'test url',
    likes: 15
  }

  const component = render(
    <Blog blog={blog}/>
  )

  const showInfoButton = component.getByText('show info')
  fireEvent.click(showInfoButton)
  component.debug()

  const div = component.container.querySelector('.fullBlog')
  expect(div).toHaveTextContent('test url')
  expect(div).toHaveTextContent('15')
})