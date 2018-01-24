import * as React from 'react';
import { setStateValue } from '../scripts/utility';
import { getDB, ResponseItem } from '../scripts/dbService';

interface State extends React.ComponentState {
  dbs: ResponseItem[];
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

    //this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.getDbs();
  }

  private getDbs(): void {
    getDB('_all_dbs')
      .then((response: any) => {
        this.setStateValue('dbs', response);
      })
      .catch((e: any) => {
        //TODO: add fail state.
      }
    );
  }

  private getSelectedDB(dbName: string): void {
    //getDB(dbName, 'c44a55a873430c3557fc161d04000328')
    getDB(dbName, '_all_docs', {'attachments': true,'include_docs': true})
      .then((response:any) => {

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

  private handleChange(event: React.FormEvent<HTMLSelectElement|HTMLTextAreaElement>): void {

    if (event.currentTarget instanceof HTMLSelectElement) {
      this.setStateValue('selectedDb', event.currentTarget.value);
      this.getSelectedDB(event.currentTarget.value);
    }
  }

  render() {

    return (
      <div className="create-document">
        <section>
        <h1>Create a Document</h1>
          <form onSubmit={this.handleSubmit}>
            <select value={this.state.selectedDb} onChange={this.handleChange.bind(this)}>
            <option value=''>select a database</option>
              {
                this.state.dbs.map((db: ResponseItem) => <option key={db.id} value={db.value}>{db.value}</option>)
              }
            </select>
            <textarea value="" placeholder="enter data to store to db"></textarea>
            <input type="submit" value="save to database" />
          </form>
        </section>
      </div>
    );
  }
}
