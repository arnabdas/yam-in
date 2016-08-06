/// <reference path="../../../typings/index.d.ts" />

import { AppEvent } from '../events/appEvent';
import { PeopleActionTypes } from './types';
import {PeopleDispatcher} from '../stores/peopleStore';

export function getPeople() {
  PeopleDispatcher.dispatch(new AppEvent(PeopleActionTypes.GET_PEOPLE));
}