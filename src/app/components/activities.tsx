/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { Link } from 'react-router';

import { IActivityListItemProps, IActivityListProps, IActivityListState } from '../interfaces/activities';
import { Activity } from '../models/yammer';

import { ActivityActionTypes } from '../actions/types';

import ActivityStore from '../stores/activityStore';

export class ActivityListItem extends React.Component<IActivityListItemProps, Activity>{
  constructor(props: IActivityListItemProps) {
    super(props);

    this.state = this.props.activity;
  }

  render() {
    return (
      <div className="item">
        <img className="cell" src={this.state.user.mugshot_url} />
        <div className="cell desc">
          <Link className="name" key={this.state.user.id} to= {{ pathname: '/profile', state: { userId: this.state.user.id } }}>
            {this.state.user.full_name}
          </Link>
          <div className="list-msg">{this.state.message}</div>
        </div>
      </div>
    );
  }
}

export class ActivityList extends React.Component<IActivityListProps, IActivityListState>{
  _listenerToken: FBEmitter.EventSubscription;
  constructor(props: any) {
    super(props);

    this.state = ActivityStore.getState();
  }

  componentDidMount() {
    this._listenerToken = ActivityStore.addChangeListener(this.props.changeToken, this._setStateFromStores.bind(this));
  }

  componentWillUnmount() {
    ActivityStore.removeChangeListener(this._listenerToken);
  }

  _setStateFromStores() {
    this.setState(ActivityStore.getState());
  }

  render() {
    return (
      <div className="card-list">
        {this.state.activities.map(function (a) {
          return (
            <ActivityListItem key={Math.random() } activity={a}>
            </ActivityListItem>);
        }) }
      </div>
    );
  }
}