/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IndexLink, Link } from 'react-router';

import { User } from '../models/yammer';
import { IYamAppState } from '../interfaces/app';
import ProfileStore from '../stores/profileStore';
import { ProfileActionTypes } from '../actions/types';
import * as ProfileActions from '../actions/profileActions';

export class YamApp extends React.Component<{}, IYamAppState> {
  constructor() {
    super();
    this.state = {
      currentUser: ProfileStore.getState()
    };
  }

  componentDidMount() {
    ProfileStore.addChangeListener(ProfileActionTypes.GET_CURRENT_USER, this._setStateFromStores.bind(this));
    ProfileActions.getCurrentUserProfile();
  }

  _setStateFromStores() {
    this.setState({
      currentUser: ProfileStore.getState()
    });
  }

  render() {
    return (
      <div className="row">
        <img className="circle profile" src={this.state.currentUser.mugshot_url} />
        <div className="row">
          {this.props.children}
        </div>
        <div id="footer">
          <IndexLink to="/" activeClassName="active">
            <span className="yamcon-home" />
          </IndexLink>
          <Link to="/messages" activeClassName="active">
            <span className="yamcon-markunread">
              <span className="unread-count">15</span>
            </span>
          </Link>
          <Link to="/notifications" activeClassName="active">
            <span className="yamcon-notifications">
              <span className="unread-count">2</span>
            </span>
          </Link>
          <Link to="/people" activeClassName="active">
            <span className="yamcon-wc" />
          </Link>
          <Link to="/groups" activeClassName="active">
            <span className="yamcon-people" />
          </Link>
          <Link to="/activities" activeClassName="active">
            <span className="yamcon-view_headline" />
          </Link>
          <Link to="/about"activeClassName="active">
            <span className="yamcon-info" />
          </Link>
        </div>
      </div>
    );
  }
}