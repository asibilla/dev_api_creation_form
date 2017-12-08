import * as React from 'react';
import axios from 'axios';
import { ShowDatabases } from './show-databases';

interface state {
  dbName: string;
}

export class CreateDatabase extends React.Component<null, state> {

  constructor(props:any = {}, context?:any) {
    super(props);

    this.state = {
      dbName : ''
    }
  }

  private handleSubmit() {

  }

  private handleChange() {

  }

  render() {

    return (
      <div className="create-database">
        <h1>Create a Database</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.dbName} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div className="current-dbs">
          <ShowDatabases />
        </div>
      </div>
    );
  }
}