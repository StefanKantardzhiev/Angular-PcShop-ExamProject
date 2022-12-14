import { IUser } from './user';

export interface IRecent {
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
