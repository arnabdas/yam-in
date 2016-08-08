import { Group } from '../models/yammer';

export interface IGroupListItemProps {
  group: Group
}

export interface IGroupListState {
  groups: Array<Group>
}