import { BoardPreview } from './BoardPreview';

export function BoardList({
  workspace,
  boardId,
  onRemoveBoard,
  changeView,
  toggleMenus,
  toggleMenu,
}) {
  if (!workspace.boards.length) return <div></div>;
  return (
    <div className="board-list">
      {workspace.boards.map((board, idx) => {
        return (
          <BoardPreview
            onRemoveBoard={onRemoveBoard}
            toggleMenus={toggleMenus}
            changeView={changeView}
            toggleMenu={toggleMenu}
            workspace={workspace}
            boardId={boardId}
            key={board._id}
            boardIdx={idx}
            board={board}
          />
        );
      })}
    </div>
  );
}
