// import React from 'react';
import React, { useState } from 'react';
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

function _BoardHeader({
  board,
  onBlur,
  onAddItem,
  changeView,
  toggleMenus,
  onEditGroup,
  isViewChange,
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
        <div className="header right-side flex align-center justify-center">
          <div
            className="board-activity btn header-btn"
            onClick={() => {
              history.push(location.pathname + `/activity_log`);
            }}
          >
            activity
          </div>
          <div className="menu-btn header-btn btn br4 flex align-center justify-center">
            <Menu />
          </div>
        </div>
      </div>
      <div
        className="board-desc"
        contentEditable="true"
        suppressContentEditableWarning={true}
        onBlur={(ev) => {
          onBlur(ev.target.innerText, board.description, board, 'boardDesc');
        }}
      >
        {board.description}
      </div>
      <div className="view-container flex align-center">
        <div
          className={`flex align-center table-view btn ${
            !isViewChange ? 'active' : ''
          }`}
          onClick={(ev) => {
            ev.preventDefault();
            changeView(false);
          }}
        >
          <Table />
          Main Table
        </div>
        <div
          className={`flex align-center table-view btn ${
            isViewChange ? 'active' : ''
          }`}
          onClick={(ev) => {
            ev.preventDefault();
            changeView(true);
          }}
        >
          <Chart />
          Chart
        </div>
        <div className="flex align-center table-view btn">
          <Dashboard />
          Dashboard
        </div>
        <div className="flex align-center table-view btn">
          <BsKanban />
          Kanban
        </div>
      </div>
      <div className="divider"></div>
      <BoardActions
        onEditGroup={onEditGroup}
        toggleMenus={toggleMenus}
        onAddItem={onAddItem}
        board={board}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isViewChange: state.boardModule.isViewChange,
    toggleMenus: state.workspaceModule.toggleMenus,
  };
}

const mapDispatchToProps = { toggleMenu };
export const BoardHeader = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(_BoardHeader)
);
