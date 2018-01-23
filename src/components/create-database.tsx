import * as React from 'react';
import { ShowDatabases } from './show-databases';
import { createDB } from '../scripts/dbService';
import { setStateValue } from '../scripts/utility';

interface State {
  dbName: string;
  refreshDBList: boolean;
}

export class CreateDatabase extends React.Component<null, State> {
  private setStateValue = setStateValue.bind(this);

  constructor(props:any = {}, context?:any) {
    super(props);

    this.state = {
      dbName : '',
      refreshDBList: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private get dbName(): string {
    return this.state.dbName;
  }

  private get refreshDBList(): boolean {
    return this.state.refreshDBList;
  }

  private handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    this.setStateValue('refreshDBList', false);;

    createDB(this.dbName)
      .then((response: any) => {
        this.setStateValue('refreshDBList', true);
        this.setStateValue('dbName', '');
      })
      .catch((e: any) => {
        // TODO: Create error state. Could not put database.
      }
    );
  }

  private handleChange(event: React.FormEvent<HTMLInputElement>): void {
    this.setStateValue('dbName', event.currentTarget.value);
  }

  render() {

    return (
      <div>
        <section className="create-database">
          <h1>Create a Database</h1>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.dbName} onChange={this.handleChange} placeholder="enter db name" />
            <input type="submit" value="Submit" />
          </form>
        </section>
        <section className="current-dbs">
          <ShowDatabases refresh={this.refreshDBList} />
        </section>
      </div>
    );
  }
}
