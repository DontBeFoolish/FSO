import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import userService from '../services/users';

function User() {
  const { id } = useParams();
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getOne(id),
    retry: 1,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Unable to load User info</div>;

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">Added Blogs</Card.Subtitle>

        {user.blogs.length === 0 ? (
          <p className="text-muted">No blogs added yet.</p>
        ) : (
          <ListGroup variant="flush">
            {user.blogs.map((blog) => (
              <ListGroup.Item key={blog.id}>
                <Link to={`/blogs/${blog.id}`} className="text-decoration-none">
                  {blog.title}
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}

export default User;
