import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
test('<BlogForm/> ', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)
  const titleInput = await screen.findByPlaceholderText('type title')
  const authorInput = await screen.findByPlaceholderText('type author')
  const urlInput = await screen.findByPlaceholderText('type url')
  const sendButton = screen.getByText('create')
  await user.type(titleInput,'title')
  await user.type(authorInput,'author')
  await user.type(urlInput,'url')
  await user.click(sendButton)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toStrictEqual({title:'title',author:'author',url:'url'})
})
