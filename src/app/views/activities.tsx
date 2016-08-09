/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ActivityList } from '../components/activities';

import ActivityStore from '../stores/activityStore';
import { ActivityActionTypes } from '../actions/types';
import * as ActivityActions from '../actions/activityActions';

export class Activities extends React.Component<{}, {}> {
  constructor() {
    super();

    ActivityStore._changeToken = ActivityActionTypes.GET_ACTIVITIES;
    ActivityStore.cleanState();
  }
  
  componentDidMount() {
    ActivityActions.getRecentActivities();
  }

  render() {
    return (
      <div className="row">
        <div id="header">
        </div>
        <div id="content">
          <ActivityList changeToken={ActivityActionTypes.GET_ACTIVITIES} />
        </div>
      </div>
    );
  }
}