import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

import { MainHeader } from './js/cmps/MainHeader';
import { SidebarHeader } from './js/cmps/SidebarHeader';

import routesHomePage from './routesHomePage';
import routesMainApp from './routesMainApp';

class _RootCmp extends React.Component {
  render() {
    const routes = this.props.user ? routesMainApp : routesHomePage;
    const header = this.props.user ? <SidebarHeader /> : <MainHeader />;
    return (
      <div className={`app-container ${this.props.user && 'flex'}`}>
        {header}
        <main>
          <Switch>
            {routes.map((route) => (
              <Route
                key={route.path}
                component={route.component}
                path={route.path}
              />
            ))}
          </Switch>
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userModule.user,
  };
}

export const RootCmp = connect(mapStateToProps, null)(_RootCmp);
