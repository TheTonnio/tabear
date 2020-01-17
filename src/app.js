import React from 'react';
import './app.css';
import BMGrid from "./components/bm-grid";
import mockData from "./mock-state";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...this.getAppData() };
  }

  getAppData() {
    return mockData;
  }

  render() {
    const { collections, bookmarks } = this.state;
    console.log(collections, bookmarks);
    return (
      <div className="app">
        <BMGrid
          collections={collections}
          bookmarks={bookmarks}
        />
      </div>
    );
  }

  init() {

  }
}

export default App;
