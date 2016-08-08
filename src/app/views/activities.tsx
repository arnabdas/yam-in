/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ActivityList } from '../components/activities';

export class Activities extends React.Component<{}, {}> {
  render() {
    return (
      <div className="row">
        <div id="header">
        </div>
        <div id="content">
          <ActivityList />
        </div>
      </div>
    );
  }
}