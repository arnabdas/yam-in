/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hashHistory, IndexLink, Link } from 'react-router';

import { User } from '../models/yammer';
import Emitter from '../events/appEvent';
import { IYamAppState } from '../interfaces/app';
import ProfileStore from '../stores/profileStore';
import { LoadingActionTypes, ProfileActionTypes } from '../actions/types';
import * as ProfileActions from '../actions/profileActions';

export class YamApp extends React.Component<{}, IYamAppState> {
  _listenerToken: FBEmitter.EventSubscription;
  _alreadyRouted = 0;
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

    hashHistory.listen(loc => {
      if (this._alreadyRouted == 2) {
        return;
      }
      else if (this._alreadyRouted == 1) {
        $('#previousRoute').html(`
          <svg class="icon icon-back-arrow">
            <use xlink:href="#icon-back-arrow"></use>
          </svg>

          <svg width="0" height="0" display="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
              <symbol id="icon-back-arrow" viewBox="0 0 24 24">
                <title>Back</title>
                <path className="path1" d="M21 11.016v1.969h-14.156l3.563 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.563 3.609h14.156z"></path>
              </symbol>
            </defs>
          </svg>
        `);
      }
      this._alreadyRouted += 1;
    });
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

  _navigateBack() {
    hashHistory.goBack();
  }

  render() {
    return (
      <div className="row">
        <div id="header">
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
        <span id="previousRoute"
          onClick={this._navigateBack}
          className="previous-route">
        </span>
        <img className="circle profile" src={this.state.currentUser.mugshot_url} />
        <div className="row">
          {this.props.children}
        </div>
        <div id="loading-icon">
          <div className="modal"></div>
          <div className="la-square-spin la-dark la-2x">
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}