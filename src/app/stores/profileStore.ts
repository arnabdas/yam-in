/// <reference path="../../../typings/index.d.ts" />

import { BaseStore } from './baseStore';
import { Server } from '../api/baseDAO';
import { User } from '../models/yammer';
import { IFeedState } from '../interfaces/feed';
import { FeedActionTypes } from '../actions/types';
import { AppDispatcher, AppEvent } from '../dispatchers/appDispatcher';

class ProfileStore extends BaseStore<User>{
  callback: () => void;
  constructor(dispatcher: Flux.Dispatcher<AppEvent>) {
    super(dispatcher, (event: AppEvent) => {
      Server.call('currentUser', {}).done(function (data: any) {
        this._state = User.Box(data);
        this._changeToken = 'change';
        this.emitChange();
      }.bind(this));
    }, () => {
      return new User();
    });
  }
}

const profileStoreInstance = new ProfileStore(AppDispatcher);
export default profileStoreInstance;
