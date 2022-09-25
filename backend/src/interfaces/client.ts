export interface IClientRequest {
  username: string;
  email: string;
  phone: string;
  user?:any;
}

export interface IUserListClient {
  id: string;
  email: string;
  username: string;
}
export interface IClientList {
  id: string;
  username: string;
  phone:string;
  email: string;
  created_at: Date;
  user: IUserListClient;
}

export interface IClientUpdateResponse {
  username?: string;
  phone?: string;
  email?: string;
  user?: any;
}

export interface IClientUpdate extends IClientUpdateResponse {
  id?: any;
}
