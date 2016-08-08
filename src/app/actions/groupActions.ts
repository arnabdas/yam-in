/// <reference path="../../../typings/index.d.ts" />

import { GroupActionTypes } from './types';
import { AppEvent } from '../events/appEvent';
import { IUserProfileProps } from '../interfaces/people';
import AppDispatcher from '../dispatchers/appDispatcher';

export function getSubscribedGroups() {
  AppDispatcher.dispatch(new AppEvent(GroupActionTypes.GET_GROUPS));
}