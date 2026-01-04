import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
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
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
}

export default User;
