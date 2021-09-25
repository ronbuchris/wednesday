import { Component } from 'react';
import { connect } from 'react-redux';
import { WorkspaceContent } from '../cmps/workspace/WorkspaceContent';
import { WorkspaceHeader } from '../cmps/workspace/WorkspaceHeader';
import { WorkspaceNav } from '../cmps/WorkspaceNav';

import { loadWorkspace } from '../store/actions/workspace.actions';

export class _WorkspaceDetails extends Component {
  componentDidMount() {
    const workspaceId =
      this.props.match.params.workspaceId || this.props.workspace._id;
    this.props.loadWorkspace(workspaceId);
  }
  render() {
    return (
      <div className="board-app flex">
        <WorkspaceNav />
        <div className="board-details">
          <WorkspaceHeader onBlur={this.onBlur} />
          <WorkspaceContent onBlur={this.onBlur} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  loadWorkspace,
};

export const WorkspaceDetails = connect(
  null,
  mapDispatchToProps
)(_WorkspaceDetails);
