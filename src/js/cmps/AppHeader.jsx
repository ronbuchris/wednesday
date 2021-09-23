import React from 'react';
import { connect } from 'react-redux';
// import { NavLink, Link } from 'react-router-dom';
import { MainHeader } from './MainHeader.jsx';
import { SidebarHeader } from './SidebarHeader.jsx';

class _AppHeader extends React.Component {
  render() {
    const { user } = this.props;
    console.log(`user`, user);
    // const user= 'adiron';
    const header = user ? <SidebarHeader /> : <MainHeader />;
    return header;
  }
}

function mapStateToProps(state) {
  return {
    user: state.userModule.user,
  };
}
const mapDispatchToProps = {};

export const AppHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AppHeader);
