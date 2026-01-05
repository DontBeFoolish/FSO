import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useField } from '../hooks';
import useBlogMutations from '../hooks/useBlogMutation';

function CommentForm() {
  const { id } = useParams();
  const { reset: resetContent, ...content } = useField('text');
  const { createComment } = useBlogMutations();

  const handleSubmit = (e) => {
    e.preventDefault();
    createComment({ id, content: content.value });
    resetContent();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="content">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          type="text"
          value={content.value}
          onChange={content.onChange}
        />
      </Form.Group>
      <Button variant="secondary" type="submit">
        Create Comment
      </Button>
    </Form>
  );
}

export default CommentForm;
