import * as React from 'react';
import { DBService } from '../scripts/dbService';
import { serverHost } from '../scripts/config';
import axios from 'axios';

interface state extends React.ComponentState {
  dbs: string[];
}

export class ShowDatabases extends React.Component<null, state> {
  private dbService: DBService = new DBService();

  constructor(props:any = {}, context?:any) {
    super(props);

    this.state = {
      dbs: []
    }
  }

  componentWillMount() {
    this.getDbs();
  }

  getDbs(): void {
    axios.get(serverHost + 'api?db=_all_dbs').then(response => {
      let dbArray = response.data.filter((v: string) => !/^_/.test(v));
      this.setState(prevState => {
        return { dbs: dbArray }
      });
    });
  }

  render() {

    return (
      <div className="create-database">
        <h1>Current Databases</h1>
        <ul>
          {
            this.state.dbs.map(db => <li key={db}>{db}</li>)
          }
        </ul>
      </div>
    );
  }
}