/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { User } from '../models/yammer';
import { IYamAppState } from '../interfaces/app';
import * as FeedActions from '../actions/feedActions';

import { Feed } from './feed';
import { NavPills } from './navs';

export class YamApp extends React.Component<{}, IYamAppState> {

  componentDidMount() {
    FeedActions.refreshAllFeed();
  }

  render () {
    return (
      <div>
        <div id="header">
          <img className="circle" src={this.state.currentUser.mugshot_url} />

          <NavPills />
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
}