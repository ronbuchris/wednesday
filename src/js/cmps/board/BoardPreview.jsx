import { Link } from 'react-router-dom';
export function BoardPreview({ board }) {
  return (
    <div>
      <Link to={`/board/${board._id}`}>{board.title}</Link>
    </div>
  );
}
