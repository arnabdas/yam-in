/// <reference path="../../../typings/index.d.ts" />

import * as Flux from 'flux';
import * as FBEmitter from 'fbemitter';

import { AppEvent } from '../events/appEvent';

const CHANGE_EVENT = 'change';

export class BaseStore<TState> {
  _changeToken: string;
  _emitter: FBEmitter.EventEmitter;
  dispatchToken: string;
  _dispatcher: Flux.Dispatcher<AppEvent>;
  _state: TState;

  constructor(dispatcher: Flux.Dispatcher<AppEvent>, protected _onDispatch: (event: AppEvent) => void, protected _cleanStateFn: () => TState) {
    this._emitter = new FBEmitter.EventEmitter();
    this._dispatcher = dispatcher;
    this.dispatchToken = dispatcher.register((event: AppEvent) => {
      this._invokeOnDispatch(event);
    });

    this._state = this._cleanStateFn();
  }

  /**
   * Is idempotent per dispatched event
   */
  emitChange() {
    this._emitter.emit(this._changeToken);
  }

  addChangeListener(callback: () => void): FBEmitter.EventSubscription {
    return this._emitter.addListener(CHANGE_EVENT, callback);
  }

  removeChangeListener(evtSubs: FBEmitter.EventSubscription) {
    evtSubs.remove();
  }

  getState() {
    return this._state;
  }

  _cleanState() {
    this._state = this._cleanStateFn();
  }

  _invokeOnDispatch(event: AppEvent) {
    this._onDispatch(event);
  }
}