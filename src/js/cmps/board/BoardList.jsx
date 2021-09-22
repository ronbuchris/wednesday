import { BoardPreview } from './BoardPreview';

export function BoardList({ workspace }) {
  return (
    <div className="board-list">
      {workspace.boards.map((board) => {
        return <BoardPreview key={board._id} board={board} />;
      })}
    </div>
  );
}
