/// <reference path="../../../typings/index.d.ts" />

import { AppDispatcher } from '../dispatchers/appDispatcher';
import { FeedActionTypes } from './types';

export function refreshAllFeed() {
  AppDispatcher.dispatch({
    type: FeedActionTypes.ALL_FEED
  });
}

export function refreshTopFeed() {
  AppDispatcher.dispatch({
    type: FeedActionTypes.TOP_FEED
  });
}

export function refreshFollowingFeed() {
  AppDispatcher.dispatch({
    type: FeedActionTypes.FOLLOWING_FEED
  });
}