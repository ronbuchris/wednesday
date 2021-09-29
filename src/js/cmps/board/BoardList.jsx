import { BoardPreview } from './BoardPreview';

export function BoardList({ workspace, boardId, onChangeView}) {
  return (
    <div className="board-list">
      {workspace.boards.map((board, idx) => {
        return (
          <BoardPreview
            onChangeView={onChangeView}
            workspace={workspace}
            boardId={boardId}
            board={board}
            key={board._id}
            boardIdx={idx}
          />
        );
      })}
    </div>
  );
}
