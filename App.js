import React from 'react';
import AppNavigator from './AppNavigator';
import db from './db';

class App extends React.Component {
  
  async componentDidMount() {
    db.init();
  }

  render(){
    return (
      <AppNavigator/>
    )
  };
}

export default App;