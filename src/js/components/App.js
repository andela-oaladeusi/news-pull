import React, { Component } from 'react';

import { Nav, Footer } from './shared';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Nav />
        </header>
        <div>
          { this.props.children }
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
