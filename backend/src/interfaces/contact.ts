
import { IClientList } from "../interfaces/client";

export interface IContact {
  username: string;
  phone: string;
  email: string;
  
}

export interface IContactRequest {
  username: string;
  phone: string;
  email:string;
  clientId: string;
  user: string;
}

export interface IContactUpdate extends IContactRequest {
  id: string;
}

export interface IContactList {
  id: string;
  username: string;
  phone: string;
  email: string;
  created_at: Date;
  client: IClientList;
}
