import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import blogService from '../services/blogs';
import BlogForm from '../components/BlogForm';

function Blogs() {
  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    select: (returnedBlogs) =>
      [...returnedBlogs].sort((a, b) => b.likes - a.likes),
    retry: 1,
  });

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>blog service unavailable</div>;

  return (
    <>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} - {blog.author}
            </Link>
          </li>
        ))}
      </ul>

      <BlogForm />
    </>
  );
}

export default Blogs;
