import React, { Component } from 'react';

import Decklist from './Decklist';
import Detail from './Detail';
import './Dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <main className="dashboard">
        <Decklist />
        <Detail />
      </main>
    );
  }
}

export default Dashboard;
