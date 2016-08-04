import { Message } from '../models/yammer';

export interface IFeedItemProp {
  message: Message,
  references: Array<any>
}

export interface IFeedProp {

}

export interface IFeedState {
  references: Array<any>,
  messages: Array<Message>
}