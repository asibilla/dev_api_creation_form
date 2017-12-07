import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Menu } from './menu';
import { Home } from './home';
import { CreateDatabase } from './create-database';

export class Main extends React.Component<{},{}> {
  render() {
    return (
      <div>
        <Menu />
        <main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/create-database' component={CreateDatabase} />
          </Switch>
        </main>
      </div>
    );
  }
}
