import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {onLogin} from '../store/actions/user.actions.js';
class _MainHeader extends React.Component{
  state = {
    isActive: false,
};


  onActive = () => {
    const{isActive}=this.state;
    this.setState({ isActive: !isActive })
}

  render(){
    const {isActive} = this.state
    return (
      <header className="main-header main-container">
      <div className="header-content flex space-between">
        <NavLink exact to="/">Logo</NavLink>
        <NavLink exact to="/templates">Templates</NavLink>
        {/* <div className="btn" onClick={async () => {
            await this.props.onLogin({},'guest')
        }}>Sing in as a Guest </div> */}
        <NavLink exact to="/login">Log in</NavLink>
      </div>
      <div className={`hamburger ${isActive ? 'is-active' :''}`} onClick={this.onActive}>
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

export const MainHeader = connect(
  null,
  mapDispatchToProps
)(_MainHeader);

