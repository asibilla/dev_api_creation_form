import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Main } from './main';

export class Viewport extends React.Component<{},{}> {
  render() {
    return (
      <div className="viewport">
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </div>
    );
  }
}
