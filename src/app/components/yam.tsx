/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { User } from '../models/yammer';
import { feedNavs } from '../constants';
import { IYamAppState } from '../interfaces/app';
import ProfileStore from '../stores/profileStore';
import {FeedDispatcher} from '../stores/feedStore';
import * as FeedActions from '../actions/feedActions';
import * as ProfileActions from '../actions/profileActions';

import { Feed } from './feed';
import { NavPills } from './navs';

export class YamApp extends React.Component<{}, IYamAppState> {
  constructor() {
    super();
    this.state = {
      currentUser: ProfileStore.getState()
    };
  }

  componentDidMount() {
    (this.refs['headerPills'] as NavPills).changeNavs(feedNavs);
    ProfileStore.addChangeListener(this._setStateFromStores.bind(this));
    ProfileActions.refreshProfile();
    FeedActions.refreshAllFeed();
  }

  render () {
    return (
      <div>
        <div id="header">
          <img className="circle" src={this.state.currentUser.mugshot_url} />

          <NavPills ref="headerPills" dispatcher={FeedDispatcher} />
        </div>
        <div id="content">
          <Feed />
        </div>
        <div id="footer">
          <a href="javascript:void();" className="active">
            <span className="yamcon-home" />
          </a>
          <a href="javascript:void();">
            <span className="yamcon-markunread" />
          </a>
          <a href="javascript:void();">
            <span className="yamcon-notifications" />
          </a>
          <a href="javascript:void();">
            <span className="yamcon-people" />
          </a>
          <a href="javascript:void();">
            <span className="yamcon-wc" />
          </a>
          <a href="javascript:void();">
            <span className="yamcon-view_headline" />
          </a>
          <a href="javascript:void();">
            <span className="yamcon-info" />
          </a>
        </div>
      </div>
    );
  }

  _setStateFromStores() {
    this.setState({
      currentUser: ProfileStore.getState()
    });
  }
}