const dummy = (blogs) => {
  if (blogs) return 1;
  return 0;
};

const totalLikes = (blogs) => blogs.reduce((total, current) => total + current.likes, 0);

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max));
  return favorite;
};

const mostBlogs = (blogs) => {
  const counts = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1;
    return acc;
  }, {});

  const [author, blogCount] = Object.entries(counts)
    .reduce((max, curr) => (curr[1] > max[1] ? curr : max));

  return { author, blogs: blogCount };
};

const mostLikes = (blogs) => {
  const count = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
    return acc;
  }, {});

  const [author, likes] = Object.entries(count)
    .reduce((max, curr) => (curr[1] > max[1] ? curr : max));

  return { author, likes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
