import { Form, Button } from 'react-bootstrap';
import { useField } from '../hooks';
import useBlogMutations from '../hooks/useBlogMutation';

function BlogForm() {
  const { reset: resetTitle, ...title } = useField('text');
  const { reset: resetAuthor, ...author } = useField('text');
  const { reset: resetUrl, ...url } = useField('text');
  const { createBlog } = useBlogMutations();

  const handleSubmit = (e) => {
    e.preventDefault();

    createBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    });

    resetTitle();
    resetAuthor();
    resetUrl();
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="mb-4"
      style={{ maxWidth: '400px' }}
    >
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title.value}
          onChange={title.onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="author">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          value={author.value}
          onChange={author.onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="url">
        <Form.Label>URL</Form.Label>
        <Form.Control type="text" value={url.value} onChange={url.onChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
}

export default BlogForm;
