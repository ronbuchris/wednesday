import React from 'react';
import { Link } from 'react-router-dom';

import Board from 'monday-ui-react-core/dist/icons/Board';
import Menu from 'monday-ui-react-core/dist/icons/Menu';

import { connect } from 'react-redux';
import { loadBoard } from '../../store/actions/board.actions';

export class _BoardPreview extends React.Component {
  // componentDidUpdate(prevProps, prevState){
  //     if(prevProps.board._id!==this.props.board._id) {
  //       this.props.loadBoard(this.props.workspace,this.props.board._id);
  //    }
  // }
  render() {
    const { boardPreview, board } = this.props;
    return (
      <Link to={`/board/${boardPreview._id}`}>
        <div
          className={`${
            board._id === boardPreview._id && 'selected'
          } br4 menu-button-wrapper flex align-center space-between`}
        >
          <div className="board-title flex align-center">
            <Board />
            <span>{boardPreview.title}</span>
          </div>
          <div className="hover-display flex align-center">
            <Menu />
          </div>
        </div>
      </Link>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
    workspace: state.workspaceModule.workspace,
  };
}

const mapDispatchToProps = {
  loadBoard,
};

export const BoardPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardPreview);
