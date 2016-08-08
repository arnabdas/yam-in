/// <reference path="../../../typings/index.d.ts" />

import { Dispatcher } from 'flux';

import { BaseStore } from './baseStore';
import { Server } from '../api/baseDAO';
import { Group } from '../models/yammer';
import { AppEvent } from '../events/appEvent';
import { IGroupListState } from '../interfaces/group';

class GroupStore extends BaseStore<IGroupListState>{
  callback: () => void;
  constructor(dispatcher: Flux.Dispatcher<AppEvent>) {
    super(dispatcher, (event: AppEvent) => {
      Server.call(event.type, {}, {
        limit: '1',
        include_group_memberships: 'extended'
      }).done(function (data: any) {
        this._state = {
          groups: data.group_memberships.map((g: any) => { return Group.Box(g); })
        };
        this._changeToken = event.type;
        this.emitChange();
      }.bind(this));
    }, () => {
      return {
        groups: Array<Group>()
      };
    });
  }
}

export const GroupDispatcher: Dispatcher<AppEvent> = new Dispatcher<AppEvent>();

const GroupStoreInstance = new GroupStore(GroupDispatcher);

export default GroupStoreInstance;
