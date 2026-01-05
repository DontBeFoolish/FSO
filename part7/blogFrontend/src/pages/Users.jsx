import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import userService from '../services/users';

function Users() {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    select: (returnedUsers) =>
      [...returnedUsers].sort((a, b) => b.blogs.length - a.blogs.length),
  });

  if (isLoading) return <div>loading users...</div>;
  if (isError) return <div>user service unavailable</div>;

  return (
    <Table striped>
      <tbody>
        <tr>
          <td>
            <h3>user</h3>
          </td>
          <td>
            <h3>blogs created</h3>
          </td>
        </tr>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Users;
