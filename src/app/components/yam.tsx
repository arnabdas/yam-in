/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IndexLink, Link } from 'react-router';

import { User } from '../models/yammer';
import Emitter from '../events/appEvent';
import { IYamAppState } from '../interfaces/app';
import ProfileStore from '../stores/profileStore';
import { LoadingActionTypes, ProfileActionTypes } from '../actions/types';
import * as ProfileActions from '../actions/profileActions';

export class YamApp extends React.Component<{}, IYamAppState> {
  _listenerToken: FBEmitter.EventSubscription;
  constructor() {
    super();
    this.state = {
      currentUser: ProfileStore.getState()
    };
  }

  componentDidMount() {
    Emitter.addListener(LoadingActionTypes.SHOW_LOADER, function () {
      $('#loading-icon').html(`
        <div class="modal"></div>
        <div class="la-square-spin la-dark la-2x">
          <div></div>
        </div>
      `);
    });
    Emitter.addListener(LoadingActionTypes.HIDE_LOADER, function () {
      $('.modal, .la-square-spin').remove();
    });
    this._listenerToken = ProfileStore.addChangeListener(ProfileActionTypes.GET_CURRENT_USER, this._setStateFromStores.bind(this));
    ProfileActions.getCurrentUserProfile();
  }

  componentWillUnmount() {
    Emitter.removeAllListeners();
    ProfileStore.removeChangeListener(this._listenerToken);
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
        <div id="loading-icon"></div>
        <div id="footer">
          <IndexLink to="/" activeClassName="active" title="Home">
            <span className="yamcon-home" />
          </IndexLink>
          <Link to="/messages" activeClassName="active" title="Messages">
            <span className="yamcon-markunread">
              <span className="unread-count">15</span>
            </span>
          </Link>
          <Link to="/notifications" activeClassName="active" title="Notifications">
            <span className="yamcon-notifications">
              <span className="unread-count">2</span>
            </span>
          </Link>
          <Link to="/people" activeClassName="active" title="People">
            <span className="yamcon-wc" />
          </Link>
          <Link to="/groups" activeClassName="active" title="Groups">
            <span className="yamcon-people" />
          </Link>
          <Link to="/activities" activeClassName="active" title="Activities">
            <span className="yamcon-view_headline" />
          </Link>
          <Link to="/about"activeClassName="active" title="About">
            <span className="yamcon-info" />
          </Link>
        </div>
      </div>
    );
  }
}