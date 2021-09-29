import { BoardPreview } from './BoardPreview';

export function BoardList({ workspace, boardId, changeView}) {
  return (
    <div className="board-list">
      {workspace.boards.map((board, idx) => {
        return (
          <BoardPreview
            changeView={changeView}
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
