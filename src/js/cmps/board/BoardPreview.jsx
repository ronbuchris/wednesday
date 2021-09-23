import { Link } from 'react-router-dom';
import Board from 'monday-ui-react-core/dist/icons/Board';

export function BoardPreview({ board }) {
  return (
    <div>
      <Link to={`/board/${board._id}`}><Board />{board.title}</Link>
    </div>
  );
}
