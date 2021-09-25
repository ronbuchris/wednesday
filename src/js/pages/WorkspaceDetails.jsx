import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { WorkspaceContent } from '../cmps/workspace/WorkspaceContent';
import { WorkspaceHeader } from '../cmps/workspace/WorkspaceHeader';
import { WorkspaceNav } from '../cmps/WorkspaceNav';

import { loadWorkspace } from '../store/actions/workspace.actions';

export class _WorkspaceDetails extends Component {
  componentDidMount() {
    const { workspaceId } = this.props.match.params;
    this.props.loadWorkspace(workspaceId);
  }
  render() {
    const { workspace, board } = this.props;
    if (!workspace && !board) return <div className="">loading</div>;
    return (
      <div className="workspace-app flex">
        <WorkspaceNav />
        <div className="workspace-details">
          <WorkspaceHeader onBlur={this.onBlur} />
          <WorkspaceContent onBlur={this.onBlur} />
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
