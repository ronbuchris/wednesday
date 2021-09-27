import { BoardPreview } from './BoardPreview';

export function BoardList({ workspace, boardId }) {
  return (
    <div className="board-list">
      {workspace.boards.map((board, idx) => {
        return (
          <BoardPreview
            workspace={workspace}
            key={board._id}
            boardId={boardId}
            boardIdx={idx}
          />
        );
      })}
    </div>
  );
}
