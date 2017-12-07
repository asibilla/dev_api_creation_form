import * as React from 'react';
import { Link } from 'react-router-dom';



export class Menu extends React.Component<{},{}> {
  render() {
    return (
      <menu>
        <Link to="/">Home</Link>
        <Link to="/create-database">Create A Database</Link>
      </menu>
    );
  }
}