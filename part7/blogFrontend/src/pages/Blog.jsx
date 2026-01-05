import { useQuery } from '@tanstack/react-query';
import { useParams, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load blog</div>;
  if (!blog) return <Navigate to="/" replace />;

  const url = blog.url.startsWith('http') ? blog.url : `https://${blog.url}`;
  const isOwner = user && blog.user?.username === user.username;

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>
          {blog.title} - {blog.author}
        </Card.Title>
        <Card.Text>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </Card.Text>
        <Card.Text>
          <strong>{blog.likes}</strong> likes{' '}
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => updateBlog(id)}
          >
            Like
          </Button>
        </Card.Text>
        <Card.Text>Added by: {blog.user.name}</Card.Text>
        {isOwner && (
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => deleteBlog(id)}
          >
            Delete
          </Button>
        )}

        <hr />

        <h5>Comments</h5>
        <CommentForm />
        <Comments comments={blog.comments} />
      </Card.Body>
    </Card>
  );
}

export default Blog;
