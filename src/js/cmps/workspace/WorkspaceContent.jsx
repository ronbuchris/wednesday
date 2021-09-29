import { Link } from 'react-router-dom';
export function WorkspaceContent({ workspace, isBoardsOpen, isMembersOpen, changeView}) {
  return (
    <div className="workspace-content">
      {isBoardsOpen && <div>
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
