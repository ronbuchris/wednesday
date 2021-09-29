import React from 'react';
import { Link } from 'react-router-dom';
import Board from 'monday-ui-react-core/dist/icons/Board';
import Menu from 'monday-ui-react-core/dist/icons/Menu';

export function BoardPreview ({boardIdx,workspace,boardId,onChangeView}) {
    const board =workspace.boards[boardIdx]
    return (
      <Link to={`/board/${board._id}`}>
        <div className={`${board._id === boardId && 'selected'} br4 menu-button-wrapper flex align-center space-between`}
        onClick={() => onChangeView(false)}
        >
          <div className="board-title flex align-center">
            <Board />
            <span>{board.title}</span>
          </div>
          <div className="hover-display flex align-center">
            <Menu />
          </div>
        </div>
      </Link>
    );
}
