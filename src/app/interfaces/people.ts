import { User } from '../models/yammer';

export interface IPeopleActionPayload {
  page: number,
  letter: string
}

export interface IUserProfileProps {
  userId: number
}

export interface IPeopleState {
  people: Array<User>
}

export interface IUserListItemProps {
  user: User
}