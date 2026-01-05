import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';

function Comments({ comments }) {
  if (!comments || comments.length === 0) {
    return <p className="text-muted">No comments yet</p>;
  }

  return (
    <Stack gap={2} className="mb-3" style={{ marginTop: '10px' }}>
      {comments.map((comment) => (
        <Card key={comment.id} className="p-2">
          <Card.Text>{comment.content}</Card.Text>
        </Card>
      ))}
    </Stack>
  );
}

export default Comments;
