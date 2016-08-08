/// <reference path="../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';

import { Home } from './views/home';
import { YamApp } from './components/yam';
import { Messages } from './views/messages';
import { Notifications } from './views/notifications';
import { People } from './views/people';
import { Groups } from './views/groups';
import { Activities } from './views/activities';
import { About } from './views/about';

import { UserProfile } from './components/users';

ReactDOM.render(
  (
    <Router history={hashHistory}>
      <Route path="/" component={YamApp}>
        <IndexRoute component={Home}/>
        <Route path="/messages" component={Messages}/>
        <Route path="/notifications" component={Notifications}/>
        <Route path="/people" component={People}/>
        <Route path="/groups" component={Groups}/>
        <Route path="/activities" component={Activities}/>
        <Route path="/about" component={About}/>
        <Route path="/profile" component={UserProfile}/>
      </Route>
    </Router>
  ),
  document.getElementById("yam-in")
);