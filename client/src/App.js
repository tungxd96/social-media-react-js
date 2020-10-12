import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import './assets/custom.css';

import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

import Authentication from './views/Authentication/Authentication';
import Home from './views/Home/Home';
import DefaultLayout from './components/Layout/DefaultLayout';
import Profile from './views/Profile/Profile';

JavascriptTimeAgo.addLocale(en)

export default class App extends Component {
  layout() {
    if (localStorage.usertoken === 'undefined') {
      return (
        <Router>
          <Route path='/' exact component={Authentication} />
        </Router>
      );
    }

    return (
      <Router>
        <DefaultLayout>
          <Route path='/' exact component={Home} />
          <Route path='/profile/:id' exact component={Profile} />
        </DefaultLayout>
      </Router>
    );
  }

  render() {
    return this.layout();
  }
}
