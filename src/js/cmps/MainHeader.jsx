import { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {} from 'react-router-dom';

import { IoIosArrowDown } from 'react-icons/io';

import { loadWorkspaces } from '../store/actions/workspace.actions';
import { onLogin, loadUsers } from '../store/actions/user.actions';
import mainlogo from '../../assets/img/logo/mainlogo.png';
import { userService } from '../services/user.service';

function _MainHeader({ onLogin, loadWorkspaces, loadUsers, history }) {
  const [active, setActive] = useState(false);

  const onLoginGuest = async () => {
    await onLogin({ username: 'ron', password: '123' }, null);
    const user = userService.getLoggedinUser();
    const workspaces = await loadWorkspaces(user);
    loadUsers();

    //Open first board of first workspace
    const boardId = workspaces[0].boards[0]._id;
    // loadWorkspace(workspaces[0])
    history.push(`/board/${boardId}`);
  };

  return (
    <header className="main-header main-container">
      <div className="header-content flex space-between align-center">
        <div className="left flex">
          <NavLink exact to="/">
            <img src={mainlogo} alt="logo" className="logo-home" />
          </NavLink>
          <div className="nav-btn flex align-center">
            <span>Product</span>
            <IoIosArrowDown />
          </div>
          <div className="nav-btn flex align-center">
            <span>Solutions</span>
            <IoIosArrowDown />
          </div>
          <div className="nav-btn">Templates</div>
          <div className="nav-btn">Pricing</div>
        </div>
        <div
          className={`hamburger ${active ? 'is-active' : ''}`}
          onClick={() => setActive(!active)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="right flex auto-center">
          <NavLink exact to="/login">
            Log in
          </NavLink>
          <div className="started btn" onClick={onLoginGuest}>
            Get Started
          </div>
        </div>
      </div>
    </header>
  );
}

const mapDispatchToProps = {
  onLogin,
  loadWorkspaces,
  loadUsers,
};

export const MainHeader = withRouter(
  connect(null, mapDispatchToProps)(_MainHeader)
);
