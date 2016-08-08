/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import FeedStore from '../stores/feedStore';
import * as FeedActions from '../actions/feedActions';

import { Feed } from '../components/feed';

export class GroupFeeds extends React.Component<{}, {}> {
  constructor() {
    super();
    FeedStore.cleanState();
  }

  componentDidMount() {
    var groupId = this.props['location'].state.groupId;

    FeedActions.refreshGroupFeedById({
      groupId: groupId
    });
  }

  render () {
    return (
      <div className="row">
        <div id="header">
        </div>
        <div id="content">
          <Feed store={FeedStore}/>
        </div>
      </div>
    );
  }
}