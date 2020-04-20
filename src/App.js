import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TaskList from './components/TaskList';

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/tasks' exact={true} component={TaskList}/>
          </Switch>
        </Router>
    )
  }
}

export default App;
