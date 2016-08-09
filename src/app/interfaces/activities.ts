import { Activity } from '../models/yammer';

export interface IActivityListItemProps {
  activity: Activity
}

export interface IActivityListProps {
  changeToken: string
}

export interface IActivityListState {
  activities: Array<Activity>
}