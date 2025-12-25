import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext } from "react"
import NotificationContext from "../contexts/NotificationContext"
import blogService from '../services/blogs'
import Blog from "./Blog"

const Blogs = ({ user, blogs }) => {
  const queryClient = useQueryClient()
  const { setNotification } = useContext(NotificationContext)

  const likeMutation = useMutation({
    mutationFn: blogService.tempVote,
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blogs'], prev => 
        prev.map((b) => b.id === updatedBlog.id ? updatedBlog : b)
      )
      setNotification(`Voted for ${updatedBlog.title}`)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (_, id) => {
      queryClient.setQueryData(['blogs'], prev => prev.filter(b => b.id !== id))
      setNotification('Deleted Blog')
    },
    onError: (error) => {
      setNotification('Failed to delete blog', 'error')
    }
  })

  const handleLike = (blog) => {
    likeMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const handleDelete = (id) => {
    deleteMutation.mutate(id)
  }

  return (
    <ul>
      {blogs.map((blog) => (
        <Blog 
          key={blog.id}
          blog={blog}
          user={user}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  )
}

export default Blogs