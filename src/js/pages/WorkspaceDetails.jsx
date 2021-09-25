import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadWorkspace} from '../store/actions/workspace.actions'
import { WorkspaceNav } from '../cmps/WorkspaceNav';


class _WorkspaceDetails extends Component {

  componentDidMount() {
    const {workspaceId} = this.props.match.params;
    this.props.loadWorkspace(workspaceId);

  }
  render() {
    const {workspace,board} = this.props;
    console.log(board);
    if (!workspace && !board) return <div className="">loading</div>;
    return <div className="workspace-details flex">
      <WorkspaceNav />
      <h1>{workspace.title}</h1>
      <p>Use the main Workspace to manage and collaborate on all company-wide boards. All team members are in this Workspace</p>

      <h1>Boards:</h1>
      {workspace.boards.map(board => {
        return <Link key={board._id} to={`/board/${board._id}`}>{board.title}</Link>
      })}
      <h1>Members:</h1>
      {workspace.members.map(member => {
        console.log(member);
        return <Link key={member._id} to={`/user/${member._id}`}>{member.fullname}</Link>
      })}
    </div>;
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
  loadWorkspace
};

export const WorkspaceDetails = connect(mapStateToProps, mapDispatchToProps)(_WorkspaceDetails);
