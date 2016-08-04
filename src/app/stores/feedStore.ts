/// <reference path="../../../typings/index.d.ts" />

import { Dispatcher } from 'flux';

import { BaseStore } from './baseStore';
import { Server } from '../api/baseDAO';
import { Message } from '../models/yammer';
import { IFeedState } from '../interfaces/feed';
import { FeedActionTypes } from '../actions/types';
import { AppEvent } from '../events/appEvent';

class FeedStore extends BaseStore<IFeedState>{
  callback: () => void;
  constructor(dispatcher: Flux.Dispatcher<AppEvent>) {
    super(dispatcher, (event: AppEvent) => {
      Server.call(event.type, {}, {
        threaded: 'extended',
        limit: '20'
      }).done(function (data: any) {
        this._state = {
          references: data.references,
          messages: data.messages.map((msg: any) => { return Message.Box(msg); })
        };
        this._changeToken = 'change';
        this.emitChange();
      }.bind(this));
    }, () => {
      return {
        references: [],
        messages: new Array<Message>()
      };
    });
  }
}

export const FeedDispatcher: Dispatcher<AppEvent> = new Dispatcher<AppEvent>();

const FeedStoreInstance = new FeedStore(FeedDispatcher)

export default FeedStoreInstance;
