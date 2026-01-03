import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import blogService from '../services/blogs';

function Blog() {
  const { id } = useParams();
  const {
    data: blog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogService.getOne(id),
  });

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Failed to load blog</div>;
  if (!blog) return <div>Blog missing</div>;

  return <div>{blog.title}</div>;
}

export default Blog;
