/// <reference path="../../../typings/index.d.ts" />

import {MessageDispatcher} from '../stores/messageStore';
import { ReceivedMessageActionaTypes } from './types';

export function refreshProfile() {
  MessageDispatcher.dispatch({
    type: ReceivedMessageActionaTypes.GET_MESSAGE
  });
}