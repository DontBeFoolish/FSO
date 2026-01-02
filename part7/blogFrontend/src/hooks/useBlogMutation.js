import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import NotificationContext from '../contexts/NotificationContext';
import blogService from '../services/blogs';

export const useLikeBlog = () => {
  const queryClient = useQueryClient();
  const { setNotification } = useContext(NotificationContext);

  return useMutation({
    mutationFn: (blog) => blogService.vote(blog),
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blogs'], (prev) =>
        prev.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)),
      );
      setNotification({
        message: `Voted for ${updatedBlog.title}`,
        type: 'success',
      });
    },
    onError: () => setNotification({ message: 'Vote Failed', type: 'error' }),
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  const { setNotification } = useContext(NotificationContext);

  return useMutation({
    mutationFn: (id) => blogService.remove(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(['blogs'], (prev) =>
        prev.filter((b) => b.id !== id),
      );
      setNotification({ message: 'Deleted blog', type: 'success' });
    },
    onError: () =>
      setNotification({ message: 'Failed to delete blog', type: 'error' }),
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  const { setNotification } = useContext(NotificationContext);

  return useMutation({
    mutationFn: (blog) => blogService.create(blog),
    onSuccess: (createdBlog) => {
      queryClient.setQueryData(['blogs'], (prev) => prev.concat(createdBlog));
      setNotification({
        message: `Created blog ${createdBlog.title}`,
        type: 'success',
      });
    },
    onError: () =>
      setNotification({ message: 'unable to create blog', type: 'error' }),
  });
};
