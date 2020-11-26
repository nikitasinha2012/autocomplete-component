import React, { Component } from 'react';
import LmsBuilder from './containers/LmsBuilder/LmsBuilder';
import Layout from './hoc/Layout/Layout';


class App extends Component {
  render() {
    return (
      
      <div>
        <Layout>
          <LmsBuilder />
        </Layout>
      </div>
      
    );
  }
}

export default App;
