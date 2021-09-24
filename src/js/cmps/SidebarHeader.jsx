import { Component, useState } from 'react';
import { WorkspaceNav } from './WorkspaceNav';
import { connect } from 'react-redux';
import { withRouter, useRouteMatch, Link } from 'react-router-dom';

import Workspace from 'monday-ui-react-core/dist/icons/Workspace';
import Notifications from 'monday-ui-react-core/dist/icons/Notifications';
import Inbox from 'monday-ui-react-core/dist/icons/Inbox';
import MyWeek from 'monday-ui-react-core/dist/icons/MyWeek';
import Invite from 'monday-ui-react-core/dist/icons/Invite';
import Help from 'monday-ui-react-core/dist/icons/Help';

import { onLogout } from '../store/actions/user.actions';

export function _SidebarHeader({ user, onLogout, board }) {
  const logout = () => {
    onLogout();
  };

  return (
    <div className="sidebar-container flex">
      <nav className="sidebar-icons flex space-between column">
        <div className="flex column">
          <p>logo</p>
          <Link to={`/board/b102`}>
            <Workspace className="nav-icon workspace" />
          </Link>
          <Notifications className="nav-icon Notifications" />
          <Inbox className="nav-icon Inbox" />
          <MyWeek className="nav-icon MyWeek" />
        </div>
        <div className="flex column">
          <Invite className="nav-icon Invite" />
          <Help className="nav-icon Help" />
          <Link to={'/'}>
            <button onClick={logout}>Log out</button>
          </Link>
          <Link to={`/user/${user._id}`}>
            <img className="user-profile" src={user.img} alt="" />
          </Link>
        </div>
      </nav>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.userModule.user,
    board: state.boardModule.board,
  };
}

const mapDispatchToProps = {
  onLogout,
};

const __SidebarHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SidebarHeader);

export const SidebarHeader = withRouter(__SidebarHeader);
