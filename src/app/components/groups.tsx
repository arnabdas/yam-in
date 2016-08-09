/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { Link } from 'react-router';

import { IGroupListItemProps, IGroupListState } from '../interfaces/group';
import { Group } from '../models/yammer';

import { GroupActionTypes } from '../actions/types';

import GroupStore from '../stores/groupStore';

import * as GroupActions from '../actions/groupActions';

export class GroupListItem extends React.Component<IGroupListItemProps, Group>{
  constructor(props: IGroupListItemProps) {
    super(props);

    this.state = this.props.group;
  }

  render() {
    return (
      <div className="item">
        <img className="cell" src={this.state.mugshot_url} />
        <span className="cell single">{this.state.full_name}</span>
      </div>
    );
  }
}

export class GroupList extends React.Component<{}, IGroupListState>{
  _listenerToken: FBEmitter.EventSubscription;
  constructor(props: any) {
    super(props);

    GroupActions.getSubscribedGroups();

    this.state = GroupStore.getState();
  }

  componentDidMount() {
    this._listenerToken = GroupStore.addChangeListener(GroupActionTypes.GET_GROUPS, this._setStateFromStores.bind(this));
  }

  componentWillUnmount() {
    GroupStore.removeChangeListener(this._listenerToken);
  }

  _setStateFromStores() {
    this.setState(GroupStore.getState());
  }

  render() {
    return (
      <div className="card-list">
        {this.state.groups.map(function (g) {
          return (
            <Link key={g.id} to= {{ pathname: '/groups/feed', state: { groupId: g.id } }}>
              <GroupListItem group={g} />
            </Link>);
        }) }
      </div>
    );
  }
}