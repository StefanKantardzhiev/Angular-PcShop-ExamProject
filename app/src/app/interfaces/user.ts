import { IItem } from './item';
import { IRecent } from './recent';

export interface IUser {
  _id: string[]
  email: string
  password: string
  items: IItem
  recents: IRecent
}
