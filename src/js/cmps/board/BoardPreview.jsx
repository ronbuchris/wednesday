import { Link } from 'react-router-dom';
import Board from 'monday-ui-react-core/dist/icons/Board';
import { connect } from 'react-redux';

export function _BoardPreview({ boardPreview, board }) {
  return (
    <Link to={`/board/${boardPreview._id}`}>
      <div className={`${board._id === boardPreview._id && 'selected'} br4`}>
        <Board />
        {boardPreview.title}
      </div>
    </Link>
  );
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
  };
}

const mapDispatchToProps = {};

export const BoardPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardPreview);
