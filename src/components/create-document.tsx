import * as React from 'react';

export class CreateDocument extends React.Component<{},{}> {

  private data: any;

  constructor(props:any = {}, context?:any) {
    super(props);


  }

  render() {

    return (
      <div className="create-document">
        <h1>Create a Document</h1>
      </div>
    );
  }
}
