/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { Link } from 'react-router';

import {
  IUserListItemProps,
  IPeopleState,
  IUserProfileProps } from '../interfaces/people';
import { User } from '../models/yammer';

import { ProfileActionTypes, PeopleActionTypes } from '../actions/types';

import PeopleStore from '../stores/peopleStore';
import ProfileStore from '../stores/profileStore';

import * as PeopleActions from '../actions/peopleActions';
import * as ProfileActions from '../actions/profileActions';

export class UserListItem extends React.Component<IUserListItemProps, User>{
  constructor(props: IUserListItemProps) {
    super(props);

    this.state = this.props.user;
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

export class UserList extends React.Component<{}, IPeopleState>{
  _listenerToken: FBEmitter.EventSubscription;
  constructor(props: any) {
    super(props);

    PeopleActions.getPeople({ letter: 'A', page: 1 });

    this.state = PeopleStore.getState();
  }

  componentDidMount() {
    this._listenerToken = PeopleStore.addChangeListener(PeopleActionTypes.GET_PEOPLE, this._setStateFromStores.bind(this));
  }

  componentWillUnmount() {
    PeopleStore.removeChangeListener(this._listenerToken);
  }

  _setStateFromStores() {
    this.setState(PeopleStore.getState());
  }

  render() {
    return (
      <div className="card-list">
        {this.state.people.map(function (u) {
          return (
            <Link key={u.id} to= {{ pathname: '/profile', state: { userId: u.id } }}>
              <UserListItem user={u} />
            </Link>);
        }) }
      </div>
    );
  }
}

export class UserProfile extends React.Component<IUserProfileProps, User>{
  _mugshotSizeRegexp = /\{[a-z]+\}/g;
  _listenerToken: FBEmitter.EventSubscription;
  constructor(props: any) {
    super(props);

    this.state = new User();
  }

  componentDidMount() {
    var userId = this.props['location'].state.userId;
    ProfileActions.getUserProfile( {
      userId: userId
    });

    this._listenerToken = ProfileStore.addChangeListener(ProfileActionTypes.GET_USER, this._setStateFromStores.bind(this));
  }

  componentWillUnmount() {
    ProfileStore.removeChangeListener(this._listenerToken);
  }

  _setStateFromStores() {
    this.setState(ProfileStore.getState());
  }

  render() {
    return (
      <div className="row">
        <div id="header">
        </div>
        <div id="content">
          <div className="user profile">
            <img className="mugshot" src={this.state.mugshot_url_template.replace(this._mugshotSizeRegexp, '100')} />
            <span className="name">{this.state.full_name}</span>
            <span className="title">{this.state.job_title}</span>
            <ul className="rep">
              <li className="followers" title="Followers">
                <img src="./img/followers.png" />
                <span>{this.state.stats.followers}</span>
              </li>
              <li className="following" title="Following">
                <img src="./img/following.png" />
                <span>{this.state.stats.following}</span>
              </li>
              <li className="updates" title="Updates">
                <img src="./img/updates.png" />
                <span>{this.state.stats.updates}</span>
              </li>
            </ul>
            <p>
              {this.state.summary}
            </p>
            <div className="table">
              <div className="table-row">
                <div className="table-cell">Department</div>
                <div className="table-cell right">{this.state.department}</div>
              </div>
              <div className="table-row">
                <div className="table-cell">Location</div>
                <div className="table-cell right">{this.state.location}</div>
              </div>
              <div className="table-row">
                <div className="table-cell">Birthday</div>
                <div className="table-cell right">{this.state.birth_date}</div>
              </div>
              <div className="table-row">
                <div className="table-cell">Email</div>
                <div className="table-cell right">{this.state.email}</div>
              </div>
              <div className="table-row">
                <div className="table-cell">Phone</div>
                <div className="table-cell right">{this.state.phone_number}</div>
              </div>
              <div className="table-row">
                <div className="table-cell">Interests</div>
                <div className="table-cell right">{this.state.interests}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}