import { Link } from 'react-router-dom';
export function WorkspaceContent({ workspace }) {
  return (
    <div className="workspace-content">
      <h1>Boards:</h1>
      {workspace.boards.map((board) => {
        return (
          <Link key={board._id} to={`/board/${board._id}`}>
            {board.title}
          </Link>
        );
      })}
      <h1>Members:</h1>
      {workspace.members.map((member) => {
        console.log(member);
        return (
          <Link key={member._id} to={`/user/${member._id}`}>
            {member.fullname}
          </Link>
        );
      })}
    </div>
  );
}
