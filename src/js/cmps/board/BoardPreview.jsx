import React from 'react';
import { Link } from 'react-router-dom';
import Board from 'monday-ui-react-core/dist/icons/Board';
import Menu from 'monday-ui-react-core/dist/icons/Menu';
import { BoardMenu } from '../menus/BoardMenu';

export function BoardPreview({
  onRemoveBoard,
  toggleMenus,
  changeView,
  toggleMenu,
  workspace,
  boardIdx,
  boardId,
}) {
  const board = workspace.boards[boardIdx];
  if (!board) return <div></div>;
  return (
    <div>
      <div
        className={`${
          board._id === boardId && 'selected'
        } board-preview br4 menu-button-wrapper text-wrap flex align-center space-between`}
        onClick={() => {
          changeView('table');
        }}
      >
        <Link to={`/board/${board._id}`} className="full">
          <div className="board-title text-wrap flex align-center">
            <Board />
            <span className="text-cmp">{board.title}</span>
          </div>
        </Link>
        <div
          className="hover-display flex align-center btn"
          onClick={() => {
            toggleMenu(toggleMenus, 'boardMenu', board._id);
          }}
        >
          <Menu />
        </div>
      </div>
      {toggleMenus.boardMenu === board._id && (
        <BoardMenu
          board={board}
          onRemoveBoard={onRemoveBoard}
          toggleMenus={toggleMenus}
          toggleMenu={toggleMenu}
        />
      )}
    </div>
  );
}
