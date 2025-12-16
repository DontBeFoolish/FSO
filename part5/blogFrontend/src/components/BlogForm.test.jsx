import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls event handler with correct details', async () => {
    const addBlog = vi.fn()
    render(<BlogForm addBlog={addBlog} />)
    
    const titleInput = screen.getByLabelText('Title:')
    const authorInput = screen.getByLabelText('Author:')
    const urlInput = screen.getByLabelText('URL:')
    const submitButton = screen.getByText('Create')
    
    const user = userEvent.setup()
    await user.type(titleInput, 'a clever title')
    await user.type(authorInput, 'wise man')
    await user.type(urlInput, 'website')
    await user.click(submitButton)

    expect(addBlog.mock.calls[0][0].title).toBe('a clever title')
    expect(addBlog.mock.calls[0][0].author).toBe('wise man')
    expect(addBlog.mock.calls[0][0].url).toBe('website')
  })
})