/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import {Utils} from "../helpers";

import FeedStore from '../stores/feedStore';
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
      <div className="msg">

        <div className="row">
          <div className="header">
            <div className="sender">
              <div className="pic">
                <a href="javascript:void()">
                  <img src={sender.mugshot_url} />
                </a>
              </div>
              <div className="name">
                { sender.full_name }
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div dangerouslySetInnerHTML={ innerHtml } />
          {message.attachments.map(function (attch) {
            console.log(attch.content);
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
    );
  }
}

export class Feed extends React.Component<IFeedProp, IFeedState> {
  _listenerToken: FBEmitter.EventSubscription;
  currentStateId: string;
  constructor(props: IFeedProp) {
    super(props);
    this._setStateFromStores();
  }

  componentDidMount() {
    this._listenerToken = FeedStore.addChangeListener(this._setStateFromStores);
  }

  componentWillUnmount() {
    FeedStore.removeChangeListener(this._listenerToken);
  }

  render() {
    let self = this;
    return (
      <div>
        {
          this.state.messages.map(function (msg) {
            return <FeedItem key={msg.id} message={msg} references={self.state.references} />
          })
        }
      </div>
    );
  }

  _setStateFromStores() {
    this.state = FeedStore.getState();
  }
}