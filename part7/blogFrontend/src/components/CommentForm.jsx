import { useParams } from 'react-router-dom';
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
    <form onSubmit={handleSubmit}>
      <input {...content} />
      <br />
      <button type="submit">Create Comment</button>
    </form>
  );
}

export default CommentForm;
