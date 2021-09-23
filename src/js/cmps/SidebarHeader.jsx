import { Component } from 'react';
import { WorkspaceNav } from './WorkspaceNav';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Workspace from 'monday-ui-react-core/dist/icons/Workspace';
import Notifications from 'monday-ui-react-core/dist/icons/Notifications';
import Inbox from 'monday-ui-react-core/dist/icons/Inbox';
import MyWeek from 'monday-ui-react-core/dist/icons/MyWeek';
import Invite from 'monday-ui-react-core/dist/icons/Invite';
import Help from 'monday-ui-react-core/dist/icons/Help';

import { onLogout } from '../store/actions/user.actions';

import { HomePage } from '../pages/HomePage';
export class _SidebarHeader extends Component {
  state = {
    isWorkspaceNav: true,
    isClicked: false,
  };

  toggleWorkspaceNav = () => {
    const { isWorkspaceNav } = this.state;
    this.setState({ isWorkspaceNav: !isWorkspaceNav });
  };

  onLogout = () => {
    this.props.onLogout();
    console.log(`this.props.history`, this.props.history);
    this.props.history.push('/');
  };

  render() {
    const { isWorkspaceNav } = this.state;
    const { user } = this.props;
    return (
      <div className="sidebar-container">
        <nav className="sidebar-icons flex space-between column">
          <div className="flex column">
            <p>logo</p>
            <Workspace
              className="nav-icon workspace"
              onClick={this.toggleWorkspaceNav}
            />
            <Notifications className="nav-icon Notifications" />
            <Inbox className="nav-icon Inbox" />
            <MyWeek className="nav-icon MyWeek" />
          </div>
          <div className="flex column">
            <Invite className="nav-icon Invite" />
            <Help className="nav-icon Help" />
            <button onClick={this.onLogout}>Log out</button>
            <img className="user-profile" src={user.img} alt="" />
          </div>
        </nav>
        {isWorkspaceNav && <WorkspaceNav />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userModule.user,
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
