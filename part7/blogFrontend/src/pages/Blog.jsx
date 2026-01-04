import { useQuery } from '@tanstack/react-query';
import { useParams, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import blogService from '../services/blogs';
import AuthContext from '../contexts/AuthContext';
import useBlogMutations from '../hooks/useBlogMutation';
import Comments from '../components/Comments';
import CommentForm from '../components/CommentForm';

function Blog() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { updateBlog, deleteBlog } = useBlogMutations();

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogService.getOne(id),
    retry: 1,
  });

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Failed to load blog</div>;
  if (!blog) return <Navigate to="/" replace />;

  const url = blog.url.startsWith('http') ? blog.url : `https://${blog.url}`;
  const isOwner = user && blog.user?.username === user.username;

  return (
    <div>
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <p>
        {' '}
        <a href={url}>{url}</a>
      </p>
      <p>
        {' '}
        {blog.likes} likes -{' '}
        <button type="button" onClick={() => updateBlog(id)}>
          Like
        </button>
      </p>
      <p>added by {blog.user.name}</p>
      {isOwner && (
        <p>
          <button type="button" onClick={() => deleteBlog(id)}>
            Delete
          </button>
        </p>
      )}
      <h3>Comments</h3>
      <CommentForm />
      <Comments comments={blog.comments} />
    </div>
  );
}

export default Blog;
