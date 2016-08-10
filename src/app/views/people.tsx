/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { UserList } from '../components/users';

export class People extends React.Component<{}, {}> {

  render () {
    return (
      <div className="row">
        <div id="header">
          <span className="uppercase page-name">People</span>
        </div>
        <div id="content">
          <UserList />
        </div>
      </div>
    );
  }
}