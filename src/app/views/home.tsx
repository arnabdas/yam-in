/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { feedNavs } from '../constants';
import FeedStore from '../stores/feedStore';
import {FeedDispatcher} from '../stores/feedStore';
import * as FeedActions from '../actions/feedActions';

import { Feed } from '../components/feed';
import { NavPills } from '../components/navs';

export class Home extends React.Component<{}, { isFeedSubmenuVisible: boolean }> {
  constructor() {
    super();
    FeedStore.cleanState();
    this.state = { 
      isFeedSubmenuVisible: false 
    };
  }

  // <div id="header">
  //   <NavPills ref="headerPills" dispatcher={FeedDispatcher} />
  // </div>

  // http://stackoverflow.com/questions/36654475/react-router-how-to-get-the-previous-route-in-onenter-handler

  componentDidMount() {
    (this.refs['headerPills'] as NavPills).changeNavs(feedNavs);
    FeedActions.refreshAllFeed();
  }

  componentWillUnmount() {
    this.setState({
      isFeedSubmenuVisible: false
    });
  }

  _toggleFeedSubmenu() {
    this.setState({
      isFeedSubmenuVisible: !this.state.isFeedSubmenuVisible
    });
    console.log(this.state.isFeedSubmenuVisible);
  }

  render() {
    return (
      <div className="row">
        <div id="content">
          <div className="in-page-navs">
            <div className="vertical-dots" onClick={this._toggleFeedSubmenu.bind(this) } />
            <div className={this.state.isFeedSubmenuVisible ? '' : 'hidden'} >
              <NavPills ref="headerPills" dispatcher={FeedDispatcher} clickCallback={this._toggleFeedSubmenu.bind(this)} />
            </div>
          </div>
          <Feed store={FeedStore}/>
        </div>
      </div>
    );
  }
}