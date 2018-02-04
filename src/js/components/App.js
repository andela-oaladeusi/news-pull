import React, { Component } from 'react';

import Nav from './shared/Nav';
import Footer from './shared/Footer';

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
