// import React from 'react';
import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { BoardActions } from './BoardActions';
import Menu from 'monday-ui-react-core/dist/icons/Menu';
import Table from 'monday-ui-react-core/dist/icons/Table';
import Dashboard from 'monday-ui-react-core/dist/icons/Dashboard';
import Favorite from 'monday-ui-react-core/dist/icons/Favorite';
import Chart from 'monday-ui-react-core/dist/icons/Chart';
import Info from 'monday-ui-react-core/dist/icons/Info';
import { BsKanban } from 'react-icons/bs';

import { toggleMenu } from '../../store/actions/board.actions';
import { getDateData } from '../../store/actions/item.actions';

function _BoardHeader({
  board,
  onBlur,
  onAddItem,
  changeView,
  toggleMenus,
  onEditGroup,
  currView,
  history,
  location,
}) {
  // const []
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
              <div>{board.title}</div>
            </div>
            <div className="header-btn toggle-desc btn">
              <Info />
            </div>

            <div className="header-btn add-favorite btn">
              <Favorite />
            </div>
          </div>
        </div>
        <div className="header right-side flex auto-center">
          <div
            className="board-activity btn header-btn"
            onClick={() => {
              history.push(location.pathname + `/activity_log`);
            }}
          >
            activity
          </div>
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
          className={`flex align-center table-view btn ${
            currView === 'table' ? 'active' : ''
          }`}
          onClick={(ev) => {
            ev.preventDefault();
            changeView('table');
          }}
        >
          <Table />
          <div className="full flex align-center">Table</div>
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
          <Chart />
          <div className="full flex align-center">Chart</div>
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
          <BsKanban />
          <div className="full flex align-center">Kanban</div>
        </div>
      </div>
      <div className="divider"></div>
      {currView !== 'chart' && <BoardActions
        onEditGroup={onEditGroup}
        toggleMenus={toggleMenus}
        onAddItem={onAddItem}
        board={board}
      />}
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
