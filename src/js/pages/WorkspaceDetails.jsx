import { Component } from 'react';
import { connect } from 'react-redux';

import { WorkspaceContent } from '../cmps/workspace/WorkspaceContent';
import { WorkspaceHeader } from '../cmps/workspace/WorkspaceHeader';
import { WorkspaceNav } from '../cmps/WorkspaceNav';

import { loadWorkspace } from '../store/actions/workspace.actions';

export class _WorkspaceDetails extends Component {
  state = {
    isBoardsOpen: true,
    isMembersOpen: false 
  }
  componentDidMount() {
    const { workspaceId } = this.props.match.params;
    this.props.loadWorkspace(workspaceId);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(`prevProps.workspace._id`, prevProps.workspace._id)
    console.log(`this.props.workspace._id`, this.props.workspace._id)
    if (prevProps.workspace._id !== this.props.workspace._id) {
      this.props.loadWorkspace(this.props.workspace._id);
    }
  }
  handleChange = () => {
    const { isBoardsOpen, isMembersOpen} = this.state
    this.setState({ isBoardsOpen: !isBoardsOpen, isMembersOpen: !isMembersOpen})
  }

  render() {
    const { workspace, board } = this.props;
    if (!workspace && !board) return <div className="">loading</div>;
    return (
      <div className="workspace-app flex">
        <WorkspaceNav />
        <div className="workspace-details">
          <WorkspaceHeader workspace={workspace} onBlur={this.onBlur} handleChange={this.handleChange}/>
          <WorkspaceContent workspace={workspace} onBlur={this.onBlur} isBoardsOpen={this.state.isBoardsOpen} isMembersOpen={this.state.isMembersOpen}/>
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
