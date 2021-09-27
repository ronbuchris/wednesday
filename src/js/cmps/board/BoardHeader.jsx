import { BoardActions } from './BoardActions';
import Menu from 'monday-ui-react-core/dist/icons/Menu';

export function BoardHeader({ board, onBlur, onAddItem, onEditGroup }) {
  return (
    <div className="board-header flex column">
      <div className="board-header-top flex align-center">
        <div
          className="full"
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={(ev) => {
            onBlur(ev.target.innerText, board.title, board, 'board');
          }}
        >
          <h1>{board.title}</h1>
        </div>
        <div className="menu-btn header-btn flex align-center justify-center btn br4">
          <Menu />
        </div>
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
