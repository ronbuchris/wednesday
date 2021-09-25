import { Component } from 'react';
import { connect } from 'react-redux';

import { WorkspaceContent } from '../cmps/workspace/WorkspaceContent';
import { WorkspaceHeader } from '../cmps/workspace/WorkspaceHeader';
import { WorkspaceNav } from '../cmps/WorkspaceNav';

import { loadWorkspace } from '../store/actions/workspace.actions';

export class _WorkspaceDetails extends Component {
  componentDidMount() {
    const { workspaceId } = this.props.match.params;
    this.props.loadWorkspace(workspaceId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.workspace._id !== this.props.workspace._id) {
      this.props.loadWorkspace(this.props.workspace._id);
    }
  }
  render() {
    const { workspace, board } = this.props;
    if (!workspace && !board) return <div className="">loading</div>;
    return (
      <div className="workspace-app flex">
        <WorkspaceNav />
        <div className="workspace-details">
          <WorkspaceHeader workspace={workspace} onBlur={this.onBlur} />
          <WorkspaceContent workspace={workspace} onBlur={this.onBlur} />
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
};

export const WorkspaceDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_WorkspaceDetails);
