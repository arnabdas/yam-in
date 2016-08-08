/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { feedNavs } from '../constants';
import FeedStore from '../stores/feedStore';
import {FeedDispatcher} from '../stores/feedStore';
import * as FeedActions from '../actions/feedActions';

import { Feed } from '../components/feed';
import { NavPills } from '../components/navs';

export class Home extends React.Component<{}, {}> {
  constructor() {
    super();
  }

  // http://stackoverflow.com/questions/36654475/react-router-how-to-get-the-previous-route-in-onenter-handler

  componentDidMount() {
    (this.refs['headerPills'] as NavPills).changeNavs(feedNavs);
    FeedActions.refreshAllFeed();
  }

  render () {
    return (
      <div className="row">
        <div id="header">
          <NavPills ref="headerPills" dispatcher={FeedDispatcher} />
        </div>
        <div id="content">
          <Feed store={FeedStore}/>
        </div>
      </div>
    );
  }
}