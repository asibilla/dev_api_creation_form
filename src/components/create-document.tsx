import * as React from 'react';
import { setStateValue } from '../scripts/utility';
import { getDB } from '../scripts/dbService';

interface State extends React.ComponentState {
  dbs: string[];
  selectedDb: string;
}

export class CreateDocument extends React.Component<{},State> {

  private data: any;
  private setStateValue = setStateValue.bind(this);

  constructor(props:any = {}, context?:any) {
    super(props);

    this.state = {
      dbs: [],
      selectedDb: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.getDbs();
  }

  private getDbs(): void {
    getDB('_all_dbs')
      .then((response: any) => {
        let dbArray = response.data.filter((v: string) => !/^_/.test(v));
        this.setStateValue('dbs', dbArray);
      })
      .catch((e: any) => {
        //TODO: add fail state.
      }
    );
  }

  private getSelectedDB(dbName: string): void {
    getDB(dbName, '_all_docs')
      .then((response:any) => {
        console.log('response from server', response);
      })
      .catch((e: any) => {
        //TODO: add fail state.
      }
    );
  }

  private handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    this.setStateValue('refreshDBList', false);;

    // createDB(this.dbName)
    //   .then((response: any) => {
    //     this.setStateValue('refreshDBList', true);
    //     this.setStateValue('dbName', '');
    //   })
    //   .catch((e: any) => {
    //     // TODO: Create error state. Could not put database.
    //   }
    // );
  }

  private handleChange(event: React.FormEvent<HTMLSelectElement>): void {
    this.setStateValue('selectedDb', event.currentTarget.value);
    this.getSelectedDB(event.currentTarget.value);
  }

  render() {

    return (
      <div className="create-document">
        <h1>Create a Document</h1>
        <form onSubmit={this.handleSubmit}>
        <label>Select a database</label>
        <select value={this.state.selectedDb} onChange={this.handleChange}>
        <option value=''>Select</option>
          {
            this.state.dbs.map(db => <option key={db} value={db}>{db}</option>)
          }

        </select>
        </form>
      </div>
    );
  }
}
