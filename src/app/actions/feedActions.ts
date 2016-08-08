/// <reference path="../../../typings/index.d.ts" />

import { FeedActionTypes } from './types';
import { AppEvent } from '../events/appEvent';
import {FeedDispatcher} from '../stores/feedStore';

export function refreshAllFeed() {
  FeedDispatcher.dispatch(new AppEvent(FeedActionTypes.ALL_FEED));
}

export function refreshTopFeed() {
  FeedDispatcher.dispatch(new AppEvent(FeedActionTypes.TOP_FEED));
}

export function refreshFollowingFeed() {
  FeedDispatcher.dispatch(new AppEvent(FeedActionTypes.FOLLOWING_FEED));
}

export function refreshGroupFeedById(groupIdObj: any) {
  FeedDispatcher.dispatch(new AppEvent(FeedActionTypes.FOLLOWING_FEED, groupIdObj));
}