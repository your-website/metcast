import React, { Component } from 'react';

import Header from '../header';
import Footer from '../footer';
import Main from '../main';

export default class App extends Component {

  state = {
    showRandomPlanet: true,
    hasError: false
  };

  render() {
    return (
      <div className="app">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}
