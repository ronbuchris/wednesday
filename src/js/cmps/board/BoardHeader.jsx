// import React from 'react';
import React from 'react';

import { connect } from 'react-redux';

import { BoardActions } from './BoardActions';
import Menu from 'monday-ui-react-core/dist/icons/Menu';
import Table from 'monday-ui-react-core/dist/icons/Table';
import Dashboard from 'monday-ui-react-core/dist/icons/Dashboard';
import Favorite from 'monday-ui-react-core/dist/icons/Favorite';
import Info from 'monday-ui-react-core/dist/icons/Info';
import { BsKanban } from 'react-icons/bs';

function _BoardHeader({ board, onBlur, onAddItem, onEditGroup, changeView, isViewChange }) {
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
          <h1>{board.title}<Info /><Favorite /></h1>
        </div>
        <div className="menu-btn header-btn flex align-center justify-center btn br4">
          <Menu />
        </div>
      </div>
      <div className="delete-board">
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
      <div className="view-container flex align-center">
        <div className={`flex align-center table-view btn ${!isViewChange ?'active':'' }`} onClick={(ev) => {
          ev.preventDefault();
          changeView(false)
        }}><Table />Main Table</div>
        <div className={`flex align-center table-view btn ${isViewChange ? 'active':''}`} onClick={(ev) => {
          ev.preventDefault();
          changeView(true)
        }}><Dashboard />Dashboard</div>
        <div className='flex align-center table-view btn'><BsKanban />Kanban</div>
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

function mapStateToProps(state) {
  return {
    isViewChange: state.boardModule.isViewChange,
  };
}

const mapDispatchToProps = {

};
export const BoardHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardHeader);
