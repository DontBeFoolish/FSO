import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import NotificationContext from '../contexts/NotificationContext';
import blogService from '../services/blogs';

const useBlogMutations = () => {
  const queryClient = useQueryClient();
  const { setNotification } = useContext(NotificationContext);

  const createMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (createdBlog) => {
      queryClient.setQueryData(['blogs'], (prev) => prev.concat(createdBlog));
      queryClient.invalidateQueries(['blogs']);
      setNotification({
        message: `Created blog ${createdBlog.title}`,
        type: 'success',
      });
    },
    onError: (error) => {
      const message = error.response?.data?.error || 'failed to create blog';
      setNotification({ message, type: 'danger' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (_, id) => {
      queryClient.setQueryData(['blogs'], (prev) =>
        prev.filter((b) => b.id !== id),
      );
      queryClient.invalidateQueries(['blogs']);
      setNotification({ message: 'deleted blog', type: 'success' });
    },
    onError: () =>
      setNotification({ message: 'failed to delete blog', type: 'danger' }),
  });

  const updateMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blogs'], (prev) =>
        prev.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)),
      );
      queryClient.invalidateQueries(['blogs']);
      setNotification({
        message: `Voted for ${updatedBlog.title}`,
        type: 'success',
      });
    },
    onError: () => setNotification({ message: 'Vote failed', type: 'danger' }),
  });

  const commentMutation = useMutation({
    mutationFn: blogService.createComment,
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blogs'], (prev) =>
        prev.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)),
      );
      queryClient.invalidateQueries(['blogs']);
    },
  });

  return {
    createBlog: (blog) => createMutation.mutate(blog),
    deleteBlog: (id) => deleteMutation.mutate(id),
    updateBlog: (id) => updateMutation.mutate(id),
    createComment: ({ id, content }) => commentMutation.mutate({ id, content }),
  };
};

export default useBlogMutations;
