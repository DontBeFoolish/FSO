import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
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
      <BlogForm />

      <Table striped>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} - {blog.author}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Blogs;
