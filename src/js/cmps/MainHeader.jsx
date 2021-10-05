import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoIosArrowDown } from 'react-icons/io';
import { onLogin } from '../store/actions/user.actions.js';
import mainlogo from '../../assets/img/logo/mainlogo.png';
class _MainHeader extends React.Component {
  state = {
    isActive: false,
  };

  onActive = () => {
    const { isActive } = this.state;
    this.setState({ isActive: !isActive });
  };

  render() {
    const { isActive } = this.state;
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
            {/* <NavLink exact to="/templates">
            Templates
          </NavLink> */}
          </div>
          <div className="right flex align-center">
            <NavLink exact to="/login">
              Log in
            </NavLink>
            <div className="started btn">Get Started</div>
          </div>
        </div>
        <div
          className={`hamburger ${isActive ? 'is-active' : ''}`}
          onClick={this.onActive}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
    );
  }
}

const mapDispatchToProps = {
  onLogin,
};

export const MainHeader = connect(null, mapDispatchToProps)(_MainHeader);
