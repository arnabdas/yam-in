/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import MessageStore from '../stores/messageStore';
import * as MessageActions from '../actions/messageActions';

import { Feed } from '../components/feed';

export class Messages extends React.Component<{}, {}> {
  componentDidMount() {
    MessageActions.refreshProfile();
  }

  render () {
    return (
      <div className="row">
        <div id="content">
          <Feed store={MessageStore}/>
        </div>
      </div>
    );
  }
}