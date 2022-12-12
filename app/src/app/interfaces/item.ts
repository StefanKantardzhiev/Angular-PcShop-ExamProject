import { IUser } from './user';

export interface IItem {
  _id: string;
  title: string;
  description: string;
  price: string;
  img: string;
  userId: IUser;
  created_at: string[];
  updatedAt: string[];
  __v: number;
}
