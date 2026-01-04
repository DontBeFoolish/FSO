function Comments({ comments }) {
  if (!comments || comments.length === 0) return <p>No comments yet</p>;
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
}

export default Comments;
