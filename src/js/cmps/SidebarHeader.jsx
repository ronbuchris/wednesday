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

import logo from '../../assets/img/logo/logo.png';
import { onLogout } from '../store/actions/user.actions';
import { toggleMenu } from '../store/actions/board.actions';

class _SidebarHeader extends Component {
  state = {
    isActive: false,
  };

  onActive = () => {
    const { isActive } = this.state;
    this.setState({ isActive: !isActive });
  };

  logout = () => {
    this.props.onLogout();
    this.props.history.push('/');
  };
  render() {
    const { isActive } = this.state;
    const { user, workspace, toggleMenus, toggleMenu, board } = this.props;
    if (!workspace || !board) return <div></div>;
    console.log(`board from sidebar`, board);
    const id = workspace.boards.length
      ? workspace.boards[0]._id
      : workspace._id;
    const route = workspace.boards ? 'board' : 'workspace';
    return (
      <div className="sidebar-container flex justify-center">
        <nav className="sidebar-icons flex space-between column align-center">
          <div className="left-side flex column align-center">
            <img className="logo" src={logo} alt="logo" />
            <div className="logos-wrapper flex column align-center">
              <Link to={id ? `/${route}/${id}` : `/`}>
                <Workspace className="nav-icon workspace" />
              </Link>
              <Notifications className="nav-icon Notifications" />
              <Inbox className="nav-icon Inbox" />
              <MyWeek className="nav-icon MyWeek" />
            </div>
          </div>
          <div className="board-title-header">{board.title}</div>
          <div className="right-side flex column align-center">
            <div
              className={`hamburger ${isActive ? 'is-active' : ''}`}
              onClick={this.onActive}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="logos-wrapper flex column align-center">
              <button
                onClick={() => {
                  toggleMenu(toggleMenus, 'isMemberModal', true);
                }}
              >
                <Invite className="nav-icon Invite" />
              </button>
              <Help className="nav-icon Help" />
              <button onClick={this.logout}>
                <LogOut className="nav-icon logout" />
              </button>
              <Link to={`/user/${user._id}`}>
                <img className="user-profile" src={user.img} alt="" />
              </Link>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    toggleMenus: state.workspaceModule.toggleMenus,
    workspace: state.workspaceModule.workspace,
    board: state.boardModule.board,
    user: state.userModule.user,
  };
}

const mapDispatchToProps = {
  onLogout,
  toggleMenu,
};

const __SidebarHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SidebarHeader);

export const SidebarHeader = withRouter(__SidebarHeader);
