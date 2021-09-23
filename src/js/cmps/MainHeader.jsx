import React from 'react';
import { NavLink} from 'react-router-dom';

export function MainHeader() {
  return (
    <header className="main-layout">
      <div className="clean-list flex space-between">
          <NavLink exact to="/">Logo</NavLink>
          <NavLink exact to="/board">Board</NavLink>
          <NavLink to="/templates">Templates</NavLink>
          <NavLink to="/login">Log in</NavLink>
  
      </div>
    </header>
  );
}