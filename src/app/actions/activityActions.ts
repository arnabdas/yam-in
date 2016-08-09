/// <reference path="../../../typings/index.d.ts" />

import { ActivityActionTypes } from './types';
import { AppEvent } from '../events/appEvent';
import { ActivityDispatcher } from '../stores/activityStore';

export function getRecentActivities(payload?: {[key: string]: string}) {
  ActivityDispatcher.dispatch(new AppEvent(ActivityActionTypes.GET_ACTIVITIES, payload));
}

export function getRecentNotifications(payload?: {[key: string]: string}) {
  ActivityDispatcher.dispatch(new AppEvent(ActivityActionTypes.GET_NOTIFICATIONS, payload));
}