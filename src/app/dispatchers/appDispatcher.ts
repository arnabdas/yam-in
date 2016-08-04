/// <reference path="../../../typings/index.d.ts" />

import { Dispatcher } from 'flux';

export class AppEvent {
  constructor(public type: string) {}
}

const dispatcherInstance: Flux.Dispatcher<AppEvent> = new Dispatcher<AppEvent>();

export const AppDispatcher = dispatcherInstance;