/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { Link } from 'react-router';

import {Utils} from "../helpers";

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

export class UserProfile extends React.Component<IUserProfileProps, User>{
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
      <div className="user profile">
        <img className="mugshot" src={this.state.mugshot_url} />
        <span className="name">{this.state.full_name}</span>
        <span className="title">{this.state.job_title}</span>
        <ul className="rep">
          <li className="followers">{this.state.stats.followers}</li>
          <li className="following">{this.state.stats.following}</li>
          <li className="updates">{this.state.stats.updates}</li>
        </ul>
        <p>
          {this.state.summary}
        </p>
        <div className="row">
          <div className="label">Department</div>
          <div className="desc">{this.state.department}</div>
        </div>
        <div className="row">
          <div className="label">Location</div>
          <div className="desc">{this.state.location}</div>
        </div>
        <div className="row">
          <div className="label">Birthday</div>
          <div className="desc">{this.state.birth_date}</div>
        </div>
        <div className="row">
          <div className="label">Email</div>
          <div className="desc">{this.state.email}</div>
        </div>
        <div className="row">
          <div className="label">Phone</div>
          <div className="desc">{this.state.phone_number}</div>
        </div>
        <div className="row">
          <div className="label">Interests</div>
          <div className="desc">{this.state.interests}</div>
        </div>
      </div>
    );
  }
}

export class UserListItem extends React.Component<IUserListItemProps, User>{
  constructor(props: IUserListItemProps) {
    super(props);

    this.state = this.props.user;
  }

  render() {
    return (
      <div className="user list item">

        <img className="" src={this.state.mugshot_url} />
        <span className="">{this.state.full_name}</span>
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

  render() {
    return (
      <div className="user list">
        {this.state.people.map(function (u) {
          return (
            <Link key={u.id} to= {{ pathname: '/profile', state: { userId: u.id } }}>
              <UserListItem user={u} />
            </Link>);
        }) }
      </div>
    );
  }

  _setStateFromStores() {
    this.setState(PeopleStore.getState());
  }
}