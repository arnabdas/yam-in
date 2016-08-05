/// <reference path="../../../typings/index.d.ts" />

import { Dispatcher } from 'flux';

import { BaseStore } from './baseStore';
import { Server } from '../api/baseDAO';
import { Message } from '../models/yammer';
import { AppEvent } from '../events/appEvent';
import { IFeedState } from '../interfaces/feed';
import { ReceivedMessageActionaTypes } from '../actions/types';

class MessageStore extends BaseStore<IFeedState>{
  callback: () => void;
  constructor(dispatcher: Flux.Dispatcher<AppEvent>) {
    super(dispatcher, (event: AppEvent) => {
      Server.call(ReceivedMessageActionaTypes.GET_MESSAGE, {}).done(function (data: any) {
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

export const MessageDispatcher: Flux.Dispatcher<AppEvent> = new Dispatcher<AppEvent>();

const MessageStoreInstance = new MessageStore(MessageDispatcher);
export default MessageStoreInstance;
