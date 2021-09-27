import { BoardActions } from './BoardActions';

export function BoardHeader({ board, onBlur, onAddItem, onEditGroup }) {
  return (
    <div className="board-header">
      <div
        contentEditable="true"
        suppressContentEditableWarning={true}
        onBlur={(ev) => {
          onBlur(ev.target.innerText, board.title, board, 'board');
        }}
      >
        <h1>{board.title}</h1>
      </div>
      <div
        contentEditable="true"
        suppressContentEditableWarning={true}
        onBlur={(ev) => {
          onBlur(ev.target.innerText, board.description, board, 'boardDesc');
        }}
      >
        {board.description}
      </div>
      <div className="divider"></div>
      <BoardActions
        onEditGroup={onEditGroup}
        onAddItem={onAddItem}
        board={board}
      />
    </div>
  );
}
