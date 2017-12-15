import * as React from 'react';
import { getDB } from '../scripts/dbService';
import { setStateValue } from '../scripts/utility';

interface State extends React.ComponentState {
  dbs: string[];
  refresh: boolean
}

interface Props {
  refresh: boolean
}

export class ShowDatabases extends React.Component<Props, State> {
  private setStateValue = setStateValue.bind(this);

  constructor(props: Props) {
    super(props as Props);

    this.state = {
      dbs: [],
      refresh: false
    }
  }

  private get refresh(): boolean {
    return this.state.refresh;
  }

  private get dbs(): string[] {
    return this.state.dbs;
  }

  componentWillReceiveProps() {
    if (this.refresh !== this.props.refresh) {
      this.setStateValue('refresh', this.props.refresh);
      if (this.props.refresh) {
        this.getDbs();
      }
    }
  }

  componentWillMount() {
    this.getDbs();
  }

  private getDbs(): void {
    getDB('_all_dbs').then((response: any) => {
      let dbArray = response.data.filter((v: string) => !/^_/.test(v));
      this.setStateValue('dbs', dbArray);
    })
    .catch((e: any) => {
      //TODO: add fail state.
    });
  }

  render() {
    return (
      <div className="create-database">
        <h1>Current Databases</h1>
        <ul>
          {
            this.dbs.map(db => <li key={db}>{db}</li>)
          }
        </ul>
      </div>
    );
  }
}