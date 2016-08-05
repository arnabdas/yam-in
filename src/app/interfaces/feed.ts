/// <reference path="../../../typings/index.d.ts" />

import { Dispatcher } from 'flux';

import { BaseStore } from '../stores/baseStore';
import { Message } from '../models/yammer';

export interface IFeedItemProp {
  message: Message,
  references: Array<any>
}

export interface IFeedProp {
  store: BaseStore<IFeedState>
}

export interface IFeedState {
  references: Array<any>,
  messages: Array<Message>
}