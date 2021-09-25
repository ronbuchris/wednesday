import React from 'react';
import { NavLink } from 'react-router-dom';

export function MainHeader() {
  return (
    <header className="main-header main-layout">
      <div className="clean-list flex space-between">
        <NavLink exact to="/">Logo</NavLink>
        <NavLink exact to="/templates">Templates</NavLink>
        <NavLink exact to="/login">Log in</NavLink>
      </div>
    </header>
  );
}
