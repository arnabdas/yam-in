/// <reference path="../../../typings/index.d.ts" />

import { Dispatcher } from 'flux';

import { BaseStore } from './baseStore';
import { Server } from '../api/baseDAO';
import { User } from '../models/yammer';
import { AppEvent } from '../events/appEvent';
import { IPeopleState } from '../interfaces/people';
import { PeopleActionTypes } from '../actions/types';

class PeopleStore extends BaseStore<IPeopleState>{
  callback: () => void;
  constructor(dispatcher: Flux.Dispatcher<AppEvent>) {
    super(dispatcher, (event: AppEvent) => {
      Server.call(PeopleActionTypes.GET_PEOPLE, {}, event.payLoad).done(function (data: any) {
        this._state = {
          people: data.map((user: any) => { return User.Box(user); })
        };
        this._changeToken = 'change';
        this.emitChange();
      }.bind(this));
    }, () => {
      return {
        people: new Array<User>()
      };
    });
  }
}

export const PeopleDispatcher: Flux.Dispatcher<AppEvent> = new Dispatcher<AppEvent>();

const PeopleStoreInstance = new PeopleStore(PeopleDispatcher);
export default PeopleStoreInstance;
