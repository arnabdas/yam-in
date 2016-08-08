/// <reference path="../../../typings/index.d.ts" />

import { PeopleActionTypes } from './types';
import { AppEvent } from '../events/appEvent';
import { PeopleDispatcher } from '../stores/peopleStore';
import { IPeopleActionPayload } from '../interfaces/people';

export function getPeople(payload: IPeopleActionPayload) {
  PeopleDispatcher.dispatch(new AppEvent(PeopleActionTypes.GET_PEOPLE, payload));
}