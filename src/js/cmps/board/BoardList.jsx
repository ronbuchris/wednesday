import { BoardPreview } from './BoardPreview';

export function BoardList({ workspace, boardId, onRemoveBoard }) {
  return (
    <div className="board-list">
      {workspace.boards.map((board, idx) => {
        return (
          <BoardPreview
            workspace={workspace}
            boardId={boardId}
            board={board}
            key={board._id}
            boardIdx={idx}
            onRemoveBoard={onRemoveBoard}
          />
        );
      })}
    </div>
  );
}
