import { Component } from 'react';
import { connect } from 'react-redux';
import { BoardDetails } from '../cmps/board/BoardDetails';
import { BoardHeader } from '../cmps/board/BoardHeader';
import { loadBoard } from '../../js/store/actions/board.actions';

class _MainApp extends Component {
  componentDidMount() {
    const { boardId } = this.props.match.params;
    this.props.loadBoard(this.props.workspace, boardId);
  }
  componentDidUpdate() {
    const { boardId } = this.props.match.params;
    this.props.loadBoard(this.props.workspace, boardId);
  }
  render() {
    const { board, user } = this.props;
    console.log('board222', board);
    if (!board) return <div>loading</div>;
    return (
      <div className="main-app">
        {user && <BoardHeader board={board} />}
        {user && <BoardDetails board={board} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workspace: state.workspaceModule.workspace,
    board: state.boardModule.board,
    user: state.userModule.user,
  };
}
const mapDispatchToProps = {
  loadBoard,
};

export const MainApp = connect(mapStateToProps, mapDispatchToProps)(_MainApp);
