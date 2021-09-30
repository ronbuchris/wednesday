import React from 'react';
import { Link } from 'react-router-dom';
import Board from 'monday-ui-react-core/dist/icons/Board';
import Menu from 'monday-ui-react-core/dist/icons/Menu';
import Delete from 'monday-ui-react-core/dist/icons/Delete';
import { BoardMenu } from '../menus/BoardMenu';
import { Screen } from '../../pages/Screen';

export function BoardPreview({
  boardIdx,
  workspace,
  boardId,
  onRemoveBoard,
  changeView,
  toggleMenus,
  toggleMenu,
}) {
  const board = workspace.boards[boardIdx];
  if (!board) return <div></div>;
  return (
    <div
      className={`${
        board._id === boardId && 'selected'
      } board-preview br4 menu-button-wrapper flex align-center space-between`}
      onClick={() => {
        changeView(false);
      }}
    >
      <Link to={`/board/${board._id}`} className="full">
        <div className="board-title flex align-center">
          <Board />
          <span>{board.title}</span>
        </div>
      </Link>
      <div
        className="hover-display flex align-center btn"
        onClick={(ev) => {
          ev.stopPropagation();
          toggleMenu(toggleMenus, 'boardMenu', board._id);
        }}
      >
        <Menu />
      </div>
      {toggleMenus.boardMenu === board._id && (
        <BoardMenu
          board={board}
          onRemoveBoard={onRemoveBoard}
          toggleMenus={toggleMenus}
          toggleMenu={toggleMenu}
        />
      )}
      {/* {toggleMenus.boardMenu && <Screen toggleMenus={toggleMenus} />} */}
    </div>
  );
}
