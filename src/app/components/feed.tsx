/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { Link } from 'react-router';

import {Utils} from "../helpers";

import {BaseStore} from '../stores/baseStore';
import {Message, User, Group} from '../models/yammer';
import { IFeedItemProp, IFeedProp, IFeedState } from '../interfaces/feed';

export class FeedItem extends React.Component<IFeedItemProp, Message> {

  constructor(props: IFeedItemProp) {
    super(props);
    this.state = props.message;
  }

  render() {

    var message = this.state;

    let sender = User.Box(Utils.getReferenceById(message.sender_type, message.sender_id, this.props.references));
    let group = Group.Box(Utils.getReferenceById('group', message.group_created_id, this.props.references));

    let innerHtml = {
      __html: message.body
    };

    return (
      <div className="item">

        <div className="item-row">
          <div className="cell desc">
            <Link className="name" to= {{ pathname: '/profile', state: { userId: sender.id } }}>
              <img src={sender.mugshot_url} />
              {sender.full_name}
            </Link>
          </div>
        </div>

        <div className="item-row">
          <div className="feed-content">
            <div dangerouslySetInnerHTML={ innerHtml } />
            {message.attachments.map(function (attch) {
              let attchInnerHtml = {
                __html: attch.content
              };
              return (
                <div key={attch.id} className="row">
                  <h3>{attch.name}</h3>
                  <div dangerouslySetInnerHTML={attchInnerHtml} />
                </div>
              );
            }) }
          </div>
        </div>
      </div>
    );
  }
}

export class Feed extends React.Component<IFeedProp, IFeedState> {
  _store: BaseStore<IFeedState>;
  _listenerToken: FBEmitter.EventSubscription;
  currentStateId: string;
  constructor(props: IFeedProp) {
    super(props);
    this._store = this.props.store;
    this.state = this._store.getState();
  }

  componentDidMount() {
    this._listenerToken = this._store.addChangeListener('change', this._setStateFromStores.bind(this));
  }

  componentWillUnmount() {
    this._store.removeChangeListener(this._listenerToken);
  }

  render() {
    let self = this;
    return (
      <div className="card-list">
        {
          this.state.messages.map(function (msg) {
            return <FeedItem key={msg.id} message={msg} references={self.state.references} />
          })
        }
      </div>
    );
  }

  _setStateFromStores() {
    this.setState(this._store.getState());
  }
}