import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

import { MainHeader } from './js/cmps/MainHeader';
import { SidebarHeader } from './js/cmps/SidebarHeader';
import { UserMsg } from './js/cmps/user-msg';
import { socketService } from './js/services/socket.service';

import routesHomePage from './routesHomePage';
import routesMainApp from './routesMainApp';

class _RootCmp extends React.Component {

  componentDidMount(){
    socketService.setup()
  }

  componentWillUnmount(){
    socketService.terminate()
  }

  render() {
    const { user } = this.props;
    const routes = user ? routesMainApp : routesHomePage;
    const header = user ? <SidebarHeader /> : <MainHeader />;
    return (
      <div className={`app-container ${user && 'flex'}`}>
        {header}
        <main>
          <Switch>
            {routes.map((route) => (
              <Route
                key={route.path}
                component={route.component}
                path={route.path}
                title={route.title}
              />
            ))}
          </Switch>
        </main>
        <UserMsg />
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
