import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";


describe('<Blog />', () => {
  let blog
  let user
  let mockLike
  let mockDelete

  beforeEach(() => {
    blog = {
      title: 'a clever title',
      author: 'wise man',
      url: 'website',
      likes: 3,
      user: {
        username: 'test',
        name: 'testname'
      }
    }

    user = {
      username: 'test',
      name: 'testname'
    }

    mockLike = vi.fn()
    mockDelete = vi.fn()
  })

  test('renders title and author', async () => {
    render(<Blog blog={blog} user={user} handleLike={mockLike} handleDelete={mockDelete}/>)
    screen.getByText('a clever title - wise man')
  })

  test('does not render url or likes by default', () => {
    render(<Blog blog={blog} user={user} handleLike={mockLike} handleDelete={mockDelete}/>)
    const url = screen.queryByText('website')
    const likes = screen.queryByText('Likes')
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('renders URL and likes when view button has been clicked', async () => {
    render(<Blog blog={blog} user={user} handleLike={mockLike} handleDelete={mockDelete}/>)
    const u = userEvent.setup()
    const button = screen.getByText('view')
    await u.click(button)
    screen.getByText('website')
    screen.getByText('Likes - 3')
  })

  test('like button event handler responds correctly', async () => {
    render(<Blog blog={blog} user={user} handleLike={mockLike} handleDelete={mockDelete}/>)
    const u = userEvent.setup()
    const viewButton = screen.getByText('view')
    await u.click(viewButton)

    const likeButton = screen.getByText('like')
    await u.click(likeButton)
    await u.click(likeButton)

    expect(mockLike.mock.calls).toHaveLength(2)
  })
})