import { Component } from 'react';
import { connect } from 'react-redux';

import { WorkspaceContent } from '../cmps/workspace/WorkspaceContent';
import { WorkspaceHeader } from '../cmps/workspace/WorkspaceHeader';
import { WorkspaceNav } from '../cmps/WorkspaceNav';

import { loadWorkspace } from '../store/actions/workspace.actions';
import { loadBoard, changeView } from '../store/actions/board.actions';

export class _WorkspaceDetails extends Component {
  state = {
    isBoardsOpen: true,
    isMembersOpen: false 
  }
  async componentDidMount() {
    const { workspaceId } = this.props.match.params;
    await this.props.loadWorkspace(workspaceId);
    const { workspace} = this.props
    this.props.loadBoard(workspace, workspace[0])
  }
  
  async componentDidUpdate(prevProps, prevState) {
    const { workspaceId } = this.props.match.params;
    if (prevProps.match.params.workspaceId !== workspaceId) {
       await this.props.loadWorkspace(workspaceId);
      }
  }

  handleChange = () => {
    const { isBoardsOpen, isMembersOpen} = this.state
    this.setState({ isBoardsOpen: !isBoardsOpen, isMembersOpen: !isMembersOpen})
  }

  render() {
    const { workspace, board, changeView} = this.props;
    if (!workspace) return <div className="">loading</div>;
    return (
      <div className="workspace-app flex">
        <WorkspaceNav board={board} workspace={workspace} changeView={changeView}/>
        <div className="workspace-details">
          <WorkspaceHeader workspace={workspace} onBlur={this.onBlur} handleChange={this.handleChange}/>
          <WorkspaceContent workspace={workspace} onBlur={this.onBlur} isBoardsOpen={this.state.isBoardsOpen} isMembersOpen={this.state.isMembersOpen} changeView={changeView}/>
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
  loadBoard,
  changeView
};

export const WorkspaceDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_WorkspaceDetails);
