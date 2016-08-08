import { Activity } from '../models/yammer';

export interface IActivityListItemProps {
  activity: Activity
}

export interface IActivityListState {
  activities: Array<Activity>
}