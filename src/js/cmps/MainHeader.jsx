import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoIosArrowDown } from 'react-icons/io';
import { onLogin } from '../store/actions/user.actions.js';
import mainlogo from '../../assets/img/logo/mainlogo.png';

function _MainHeader() {
  const [active, setActive] = useState(false);

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
          <div className="started btn">Get Started</div>
        </div>
      </div>
    </header>
  );
}

const mapDispatchToProps = {
  onLogin,
};

export const MainHeader = connect(null, mapDispatchToProps)(_MainHeader);
