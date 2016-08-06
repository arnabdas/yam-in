/// <reference path="../../../typings/index.d.ts" />

import { ProfileActionTypes } from './types';
import { AppEvent } from '../events/appEvent';
import {ProfileDispatcher} from '../stores/profileStore';

export function refreshProfile() {
  ProfileDispatcher.dispatch(new AppEvent(ProfileActionTypes.REFRESH));
}