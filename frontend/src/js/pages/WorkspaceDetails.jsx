import { Component } from 'react';
import { connect } from 'react-redux';

import { WorkspaceContent } from '../cmps/workspace/WorkspaceContent';
import { WorkspaceHeader } from '../cmps/workspace/WorkspaceHeader';
import { WorkspaceNav } from '../cmps/WorkspaceNav';

import { loadWorkspace } from '../store/actions/workspace.actions';
import {
  loadBoard,
  removeBoard,
  changeView,
} from '../store/actions/board.actions';
import { Loader } from '../cmps/Loader';

export class _WorkspaceDetails extends Component {
  state = {
    isBoardsOpen: true,
    isMembersOpen: false,
  };
  async componentDidMount() {
    const { workspaceId } = this.props.match.params;
    await this.props.loadWorkspace(workspaceId);
    const { workspace } = this.props;
    this.props.loadBoard(workspace, workspace[0]);
    document.title = `Wednesday - Workspaces`;
  }

  async componentDidUpdate(prevProps, prevState) {
    const { workspaceId } = this.props.match.params;
    if (prevProps.match.params.workspaceId !== workspaceId) {
      await this.props.loadWorkspace(workspaceId);
    }
  }

  handleChange = () => {
    const { isBoardsOpen, isMembersOpen } = this.state;
    this.setState({
      isBoardsOpen: !isBoardsOpen,
      isMembersOpen: !isMembersOpen,
    });
  };

  render() {
    const { workspace, board, changeView, removeBoard } = this.props;
    if (!workspace) return <Loader />;
    return (
      <div className="workspace-app flex">
        <WorkspaceNav
          removeBoard={removeBoard}
          changeView={changeView}
          workspace={workspace}
          board={board}
        />
        <div className="workspace-details">
          <WorkspaceHeader
            workspace={workspace}
            onBlur={this.onBlur}
            handleChange={this.handleChange}
          />
          <WorkspaceContent
            workspace={workspace}
            onBlur={this.onBlur}
            isBoardsOpen={this.state.isBoardsOpen}
            isMembersOpen={this.state.isMembersOpen}
            changeView={changeView}
          />
        </div>
      </div>
    );
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
  loadWorkspace,
  removeBoard,
  loadBoard,
  changeView,
};

export const WorkspaceDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_WorkspaceDetails);
