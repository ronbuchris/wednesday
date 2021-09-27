import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import Workspace from 'monday-ui-react-core/dist/icons/Workspace';
import Notifications from 'monday-ui-react-core/dist/icons/Notifications';
import Inbox from 'monday-ui-react-core/dist/icons/Inbox';
import MyWeek from 'monday-ui-react-core/dist/icons/MyWeek';
import Invite from 'monday-ui-react-core/dist/icons/Invite';
import Help from 'monday-ui-react-core/dist/icons/Help';
import LogOut from 'monday-ui-react-core/dist/icons/LogOut';

import { onLogout } from '../store/actions/user.actions';

class _SidebarHeader extends Component {
  logout = async () => {
    await this.props.onLogout();
    this.props.history.push('/');
  };
  render() {
    const { user, board, workspace} = this.props;
    const workspaceId = this.props.location.pathname.includes('/workspace');
    return (
      <div className="sidebar-container flex">
        <nav className="sidebar-icons flex space-between column align-center">
          <div className="flex column">
            <p>logo</p>
            <Link
              to={board ? `/board/${board._id}` : `/`}
              className={workspaceId ? 'disabled-link' : ''}
            >
              <Workspace className="nav-icon workspace" />
            </Link>
            <Notifications className="nav-icon Notifications" />
            <Inbox className="nav-icon Inbox" />
            <MyWeek className="nav-icon MyWeek" />
          </div>
          <div className="flex column align-center">
            <Invite className="nav-icon Invite" />
            <Help className="nav-icon Help" />
            <button onClick={this.logout}>
              <LogOut className="nav-icon logout" />
            </button>
            <Link to={`/user/${user._id}`}>
              <img className="user-profile" src={user.img} alt="" />
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workspace: state.workspaceModule.workspace,
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
