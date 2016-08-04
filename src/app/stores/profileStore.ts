/// <reference path="../../../typings/index.d.ts" />

import { Dispatcher } from 'flux';

import { BaseStore } from './baseStore';
import { Server } from '../api/baseDAO';
import { User } from '../models/yammer';
import { AppEvent } from '../events/appEvent';
import { ProfileActionTypes } from '../actions/types';

class ProfileStore extends BaseStore<User>{
  callback: () => void;
  constructor(dispatcher: Flux.Dispatcher<AppEvent>) {
    super(dispatcher, (event: AppEvent) => {
      Server.call(ProfileActionTypes.REFRESH, {}).done(function (data: any) {
        this._state = User.Box(data);
        this._changeToken = 'change';
        this.emitChange();
      }.bind(this));
    }, () => {
      return new User();
    });
  }
}

export const ProfileDispatcher: Flux.Dispatcher<AppEvent> = new Dispatcher<AppEvent>();

const ProfileStoreInstance = new ProfileStore(ProfileDispatcher);
export default ProfileStoreInstance;
