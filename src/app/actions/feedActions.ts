/// <reference path="../../../typings/index.d.ts" />

import {FeedDispatcher} from '../stores/feedStore';
import { FeedActionTypes } from './types';

export function refreshAllFeed() {
  FeedDispatcher.dispatch({
    type: FeedActionTypes.ALL_FEED
  });
}

export function refreshTopFeed() {
  FeedDispatcher.dispatch({
    type: FeedActionTypes.TOP_FEED
  });
}

export function refreshFollowingFeed() {
  FeedDispatcher.dispatch({
    type: FeedActionTypes.FOLLOWING_FEED
  });
}