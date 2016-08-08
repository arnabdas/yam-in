/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { GroupList } from '../components/groups';

export class Groups extends React.Component<{}, {}> {
  render() {
    return (
      <div className="row">
        <div id="header">
        </div>
        <div id="content">
          <GroupList />
        </div>
      </div>
    );
  }
}