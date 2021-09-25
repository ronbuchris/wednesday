import { Link } from 'react-router-dom';
export function WorkspaceContent({ workspace, isBoardsOpen, isMembersOpen}) {
  return (
    <div className="workspace-content">
      {isBoardsOpen && <div>
      {workspace.boards.map((board) => {
        return (
          <Link key={board._id} to={`/board/${board._id}`}>
            {board.title}
          </Link>
        );
      })}
      </div>}
      {isMembersOpen && <div>
      {workspace.members.map((member) => {
        console.log(member);
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
