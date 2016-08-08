/// <reference path="../../../typings/index.d.ts" />

import { Utils } from '../helpers';

import { Dispatcher } from 'flux';

import { BaseStore } from './baseStore';
import { Server } from '../api/baseDAO';
import { Activity } from '../models/yammer';
import { AppEvent } from '../events/appEvent';
import { IActivityListState } from '../interfaces/activities';

class ActivityStore extends BaseStore<IActivityListState>{
  callback: () => void;
  constructor(dispatcher: Flux.Dispatcher<AppEvent>) {
    super(dispatcher, (event: AppEvent) => {
      Server.call(event.type, {}, {
        limit: '20'
      }).done(function (data: any) {
        var formattedReference = Utils.formatReferences(data.references);
        this._state = {
          activities: data.items.map((a: any) => { return Activity.Box(a, formattedReference); })
        };
        this._changeToken = event.type;
        this.emitChange();
      }.bind(this));
    }, () => {
      return {
        activities: Array<Activity>()
      };
    });
  }
}

export const ActivityDispatcher: Dispatcher<AppEvent> = new Dispatcher<AppEvent>();

const ActivityStoreInstance = new ActivityStore(ActivityDispatcher);

export default ActivityStoreInstance;
