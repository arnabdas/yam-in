/// <reference path="../../../typings/index.d.ts" />

import {ProfileDispatcher} from '../stores/profileStore';
import { ProfileActionTypes } from './types';

export function refreshProfile() {
  ProfileDispatcher.dispatch({
    type: ProfileActionTypes.REFRESH
  });
}