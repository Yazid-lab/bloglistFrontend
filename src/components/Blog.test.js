import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
let container
const handleLike = jest.fn()
beforeEach(() => {
  const blog = {
    title: 'testing this component',
    author: 'testing',
    url: 'url testing',
    likes: 123,
  }
  container = render(<Blog blog={blog} handleLike={handleLike} />).container
})
// NOTE: 5.13
test('renders only title and author', () => {
  const element = screen.getByText('testing this component')
  screen.debug(element)
  expect(element).toBeDefined()
})
// NOTE: 5.14
test('after clicking the button more info is shown', async () => {
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const div = container.querySelector('.hiddenDetails')
  expect(div).not.toHaveStyle('display:')
})
// NOTE: 5.15
test('clicking the like button calls the event handler', async () => {
  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(handleLike.mock.calls).toHaveLength(2)
})
