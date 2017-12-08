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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    console.log('the value', this.state.dbName);
    event.preventDefault();
  }

  private handleChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({dbName: event.currentTarget.value});
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