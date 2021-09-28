import React from 'react';
import { NavLink } from 'react-router-dom';

export class MainHeader extends React.Component{
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
