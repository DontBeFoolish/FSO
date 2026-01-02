import Blog from './Blog';

function Blogs({ user, blogs }) {
  return (
    <ul>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </ul>
  );
}

export default Blogs;
