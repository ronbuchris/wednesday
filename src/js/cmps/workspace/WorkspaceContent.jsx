import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editBoard} from '../../store/actions/board.actions'
function _WorkspaceContent({ workspace, isBoardsOpen, isMembersOpen, changeView, editBoard, user, users}) {
  return (
    <div className="workspace-content">
      {!workspace.boards.length && <div>
        <h1>You have 0 boards in workspace</h1>
        <button onClick={() =>{
          editBoard(workspace,'My First Board',user,users)
        }}
          >+Add a board</button>
        </div>}
      {isBoardsOpen && workspace.boards && <div>
      {workspace.boards.map((board) => {
        return (
          <Link key={board._id} to={`/board/${board._id}`}>
            <div onClick={() => {
              changeView(false)
            }}>
            {board.title}
            </div>
          </Link>
        );
      })}
      </div>}
      {isMembersOpen && <div>
      {workspace.members.map((member) => {
        return (
          <Link key={member._id} to={`/user/${member._id}`}>
            {member.fullname}
          </Link>
        );
      })}
      </div>}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    toggleMenus: state.workspaceModule.toggleMenus,
    user: state.userModule.user,
    users: state.userModule.users,
  };
}

const mapDispatchToProps = {
  editBoard
};

export const WorkspaceContent = connect(
  mapStateToProps,
  mapDispatchToProps
)(_WorkspaceContent);
