import React from 'react';
import { Link } from 'react-router-dom';
import Board from 'monday-ui-react-core/dist/icons/Board';
import Menu from 'monday-ui-react-core/dist/icons/Menu';
import Delete from 'monday-ui-react-core/dist/icons/Delete';

export function BoardPreview({
  boardIdx,
  workspace,
  boardId,
  onRemoveBoard,
  changeView,
}) {

  const board = workspace.boards[boardIdx];
  if (!board) return <div></div>
  return (
    <Link to={`/board/${board._id}`}>
      <div
        className={`${
          board._id === boardId && 'selected'
        } br4 menu-button-wrapper flex align-center space-between`}
        onClick={() => {
          changeView(false);
        }}
      >
        <div className="board-title flex align-center">
          <Board />
          <span>{board.title}</span>
          <Delete
            onClick={(ev) => {
              ev.preventDefault();
              onRemoveBoard(board._id);
            }}
          />
        </div>
        <div className="hover-display flex align-center">
          <Menu />
        </div>
      </div>
    </Link>
  );
}
