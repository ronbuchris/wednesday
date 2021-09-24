import { Component } from 'react';
import { connect } from 'react-redux';

import {
  loadWorkspaces,
  loadWorkspace,
} from '../store/actions/workspace.actions';
import { loadBoard, onEditBoard } from '../store/actions/board.actions';

class _MainApp extends Component {
  componentDidMount() {
    const { board, user, workspace, workspaces } = this.props;
    this.props.loadWorkspaces(user);
    console.log(`workspaces`, workspaces);
    const boardId =
      this.props.match.params.boardId || workspaces[0].boards[0]._id;
    this.props.history.push(`/board/${boardId}`);

    // this.props.loadBoard(workspaces[0], boardId);
    // const { board, workspace, workspaces } = this.props;
  }

  render() {
    const { board, user } = this.props;

    // if (!board) return <div className="">loading</div>;

    return <div className="main-app">Loading...</div>;
  }
}

function mapStateToProps(state) {
  return {
    workspaces: state.workspaceModule.workspaces,
    workspace: state.workspaceModule.workspace,
    board: state.boardModule.board,
    user: state.userModule.user,
  };
}
const mapDispatchToProps = {
  loadWorkspaces,
  loadBoard,
};

export const MainApp = connect(mapStateToProps, mapDispatchToProps)(_MainApp);
