/// <reference path="../../../typings/index.d.ts" />

import { ProfileActionTypes } from './types';
import { AppEvent } from '../events/appEvent';
import { IUserProfileProps } from '../interfaces/people';
import {ProfileDispatcher} from '../stores/profileStore';

export function getCurrentUserProfile() {
  ProfileDispatcher.dispatch(new AppEvent(ProfileActionTypes.GET_CURRENT_USER));
}

export function getUserProfile(payload?: IUserProfileProps) {
  ProfileDispatcher.dispatch(new AppEvent(ProfileActionTypes.GET_USER, payload));
}