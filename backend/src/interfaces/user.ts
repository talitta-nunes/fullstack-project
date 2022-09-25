export interface IUserRequest {
  username: string;
  email: string;
  password: string;
}
export interface IUser {
  id: string;
  username: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  user?: string;
}
export interface IUserLogin {
  email: string;
  password: string;
}
