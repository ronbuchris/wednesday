// import React from 'react';
import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Activity from 'monday-ui-react-core/dist/icons/Activity';
import Invite from 'monday-ui-react-core/dist/icons/Invite';
import Menu from 'monday-ui-react-core/dist/icons/Menu';
import Table from 'monday-ui-react-core/dist/icons/Table';
import Favorite from 'monday-ui-react-core/dist/icons/Favorite';
import Dashboard from 'monday-ui-react-core/dist/icons/Dashboard';
import Info from 'monday-ui-react-core/dist/icons/Info';
import { BsKanban } from 'react-icons/bs';

import { BoardActions } from './BoardActions';

import { toggleMenu } from '../../store/actions/board.actions';
import { getDateData } from '../../store/actions/item.actions';

function _BoardHeader({
  onEditGroup,
  toggleMenus,
  changeView,
  onAddItem,
  currView,
  location,
  history,
  onBlur,
  board,
}) {
  return (
    <div className="board-header flex column">
      <div className="board-header-top flex align-center">
        <div className="board-header-left flex">
          <div className="board-name-hd flex">
            <div
              className="board-header-title"
              contentEditable="true"
              suppressContentEditableWarning={true}
              spellCheck={false}
              onBlur={(ev) => {
                onBlur(ev.target.innerText, board.title, board, 'board');
              }}
            >
              <h1>{board.title}</h1>
            </div>
            <div className="header-btn toggle-desc btn">
              <Info />
            </div>

            <div className="header-btn add-favorite btn">
              <Favorite />
            </div>
          </div>
        </div>
        <div className="header right-side flex auto-center ">
          <div className="invite btn header-btn flex auto-center">
            <Invite />
            Invite / 2
          </div>
          <div
            className="board-activity btn auto-center flex header-btn"
            onClick={() => {
              history.push(location.pathname + `/activity_log`);
            }}
          >
            <Activity />
            Activity
          </div>
          <div className="add-to-board btn br4"> + Add to board</div>
          <div className="menu-btn header-btn btn br4 flex auto-center">
            <Menu />
          </div>
        </div>
      </div>
      <div
        className="board-desc"
        contentEditable="true"
        suppressContentEditableWarning={true}
        spellCheck={false}
        onBlur={(ev) => {
          onBlur(ev.target.innerText, board.description, board, 'boardDesc');
        }}
      >
        {board.description}
      </div>
      <div className="view-container flex align-center">
        <div
          className={`flex auto-center table-view btn ${
            currView === 'table' ? 'active' : ''
          }`}
          onClick={(ev) => {
            ev.preventDefault();
            changeView('table');
          }}
        >
          <div className="full flex auto-center">
            <Table />
            Table
          </div>
        </div>
        <div
          className={`flex align-center table-view btn ${
            currView === 'chart' ? 'active' : ''
          }`}
          onClick={(ev) => {
            ev.preventDefault();
            changeView('chart');
          }}
        >
          <div className="full flex auto-center">
            <Dashboard />
            Dashboard
          </div>
        </div>
        <div
          className={`flex align-center table-view btn ${
            currView === 'kanban' ? 'active' : ''
          }`}
          onClick={(ev) => {
            ev.preventDefault();
            changeView('kanban');
          }}
        >
          <div className="full flex auto-center">
            <BsKanban />
            Kanban
          </div>
        </div>
      </div>
      <div className="divider"></div>
      {currView !== 'chart' && (
        <BoardActions
          onEditGroup={onEditGroup}
          toggleMenus={toggleMenus}
          onAddItem={onAddItem}
          board={board}
        />
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currView: state.boardModule.currView,
    toggleMenus: state.workspaceModule.toggleMenus,
  };
}

const mapDispatchToProps = { toggleMenu, getDateData };
export const BoardHeader = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(_BoardHeader)
);
