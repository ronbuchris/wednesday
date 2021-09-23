import React from 'react';
import { Switch, Route } from 'react-router';
import { AppHeader } from './js/cmps/AppHeader';
import routes from './routes';

class RootCmp extends React.Component {
  render() {
    return (
      <div className="app-container flex">
        <AppHeader />
        <main>
          <Switch>
            {routes.map((route) => (
              <Route
                key={route.path}
                exact
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

export default RootCmp;
