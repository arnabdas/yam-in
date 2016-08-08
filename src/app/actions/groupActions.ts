/// <reference path="../../../typings/index.d.ts" />

import { GroupActionTypes } from './types';
import { AppEvent } from '../events/appEvent';
import { GroupDispatcher } from '../stores/groupStore';

export function getSubscribedGroups() {
  GroupDispatcher.dispatch(new AppEvent(GroupActionTypes.GET_GROUPS));
}