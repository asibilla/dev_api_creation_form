import * as React from 'react';

export class Home extends React.Component<{},{}> {
  render() {
    return (
      <div className="home">
        <h1>CouchDB Manager</h1>
        <p>Manage db's and docs to quickly setup an endpoint to use for development</p>
      </div>
    );
  }
}
