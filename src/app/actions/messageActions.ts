/// <reference path="../../../typings/index.d.ts" />

import { AppEvent } from '../events/appEvent';
import { ReceivedMessageActionaTypes } from './types';
import {MessageDispatcher} from '../stores/messageStore';

export function refreshProfile() {
  MessageDispatcher.dispatch(new AppEvent(ReceivedMessageActionaTypes.GET_MESSAGE));
}